

module.exports = function babelConfig(api) {
  api.cache.forever()
  const targets = {chrome: "70"}
  const babelrcRoots = ["."]
  const presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {modules: false, targets}]
  ]
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-react-constant-elements"
  ]

  return {
    presets,
    plugins,
    babelrcRoots,
    sourceType: "unambiguous",
  }
}
