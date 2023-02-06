module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ["./src/"],
        extensions: [".js", ".ts", ".tsx", ".svg"],
        alias: {
          "assets": "../assets",
          "components": "./src/components",
          "constants": "./src/constants",
          "features": "./src/features",
          "middlewares": "./src/middlewares",
          "models": "./src/models",
          "navigation": "./src/navigation",
          "repositories": "./src/repositories",
          "state": "./src/state",
          "utils": "./src/utils",
        }
      }
    ],
  ]
}
