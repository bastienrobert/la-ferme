const path = require('path')
const components = path.relative(
  __dirname,
  path.dirname(require.resolve('@la-ferme/components/package.json'))
)

module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: [components + '/assets/fonts/native/']
}
