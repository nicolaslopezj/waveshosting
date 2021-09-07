export default `
set -e

npm run build

cd $APP_DIR/build

DIR=$(ls)

mv $APP_DIR/build/$DIR/ $BUILD_DIR/build/
`
