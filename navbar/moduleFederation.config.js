const { dependencies } = require("./package.json");
module.exports = {
  name: "navbar",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./navbar": "./src/App",
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
