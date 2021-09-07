export default `
set -e

npm run build
mv $APP_DIR/build/ $BUILD_DIR/build/
`
