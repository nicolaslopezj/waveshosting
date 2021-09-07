#!/bin/bash

set -e

# echo $BUILD_DIR

sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

meteor build $BUILD_DIR/compilation --directory --server-only --architecture os.linux.x86_64

sedi 's/Object\.create/Object\.assign/g' $BUILD_DIR/compilation/bundle/programs/server/npm-rebuild.js
sedi 's/PATH: { value: PATH }/PATH: PATH/g' $BUILD_DIR/compilation/bundle/programs/server/npm-rebuild.js

cd $BUILD_DIR/compilation/bundle/programs/server
# meteor npm install --production

cd $BUILD_DIR/compilation/bundle

SETTINGS_FIX="process.env.METEOR_SETTINGS = decodeURIComponent(process.env.METEOR_SETTINGS || '');"
echo $SETTINGS_FIX | cat - main.js > temp && mv -f temp main.js

# rm -rf ./programs/server/npm/node_modules/bcrypt

NODE_VERSION=$(node -pe 'JSON.parse(process.argv[1]).nodeVersion' "$(cat star.json)")
NPM_VERSION=$(node -pe 'JSON.parse(process.argv[1]).npmVersion' "$(cat star.json)")

if [ "$NODE_VERSION" = "undefined" ]; then
  N_V=$(cat .node_version.txt)
  NODE_VERSION=$(echo $N_V | cut -c 2-)
  NPM_VERSION="4.6.1"
fi

echo "Node version: $NODE_VERSION"
echo "NPM version: $NPM_VERSION"

echo '{
  "name": "waves-meteor-app",
  "version": "0.0.1",
  "scripts": {
    "preinstall": "echo \"preinstalling\" && cd programs/server && npm install",
    "start": "bash ./start.sh"
  },
  "dependencies": {
    "fibers": "*",
    "semver": "*",
    "source-map-support": "*",
    "underscore": "*"
  }
}' > package.json

echo 'unsafe-perm=true' > .npmrc

echo '#!/bin/bash
# When nvm is installed, $HOME isnt set
# resulting in nvm installed /.nvm
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null 2>&1
nvm use default --delete-prefix --silent
echo "Node version"
echo $(node --version)
echo "Npm version"
echo $(npm --version)
echo "=> Starting Waves Meteor App"
node main.js' > start.sh

mkdir .ebextensions

echo 'files:
  "/opt/elasticbeanstalk/hooks/appdeploy/pre/45node.sh" :
    mode: "000775"
    owner: root
    group: users
    content: |
      #!/bin/bash
      echo "installing nvm"
      NODE_VERSION="'$NODE_VERSION'"
      NPM_VERSION="'$NPM_VERSION'"
      # Install nvm
      curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
      nvm install $NODE_VERSION
      nvm use $NODE_VERSION
      nvm alias default $NODE_VERSION
      npm i -g npm@$NPM_VERSION
  "/opt/elasticbeanstalk/hooks/appdeploy/pre/50npm.sh" :
    mode: "000775"
    owner: root
    group: users
    content: |
      #!/bin/bash
      echo "Will npm install packages"
      /opt/elasticbeanstalk/containerfiles/ebnode.py --action npm-install
' > .ebextensions/node.config

mv $BUILD_DIR/compilation/bundle/ $BUILD_DIR/build/
