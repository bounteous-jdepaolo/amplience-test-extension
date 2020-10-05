module.exports = function babelConfig(api) {
  api.cache.forever()
  const targets = {chrome: "70"}
  const babelrcRoots = ["."]
  const presets = [
    ["@babel/preset-env", {modules: false, targets}]
  ]
  const plugins = [
    "@babel/plugin-proposal-class-properties"
  ]

  return {
    presets,
    plugins,
    babelrcRoots,
    sourceType: "unambiguous",
  }
}
