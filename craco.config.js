const path = require("path")
const fs = require("fs")
const source = path.resolve(__dirname, "src")
const modules = fs.readdirSync(source)
  .filter(module => fs.statSync(path.resolve(source, module)).isDirectory())
  .reduce((modules, module) => ({ ...modules, [`@${module}`]: path.resolve(source, module) }), {})

module.exports = {
  webpack: {
    alias: {
      "@src": source,
      ...modules
    },
    plugins: [
    ],
    module: {
      rules: [
        {
          test: /\.cur$/,
          use: ["url-loader"]
        }
      ]
    }
  }
}