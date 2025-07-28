const { dependencies } = require("./package.json");
module.exports = {
  name: "adminpage",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    './adminpage': './src/App.tsx',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: "react",
      shareScope: "default",
      requiredVersion: dependencies.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
