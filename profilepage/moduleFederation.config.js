const { dependencies } = require("./package.json");
module.exports = {
  name: "profilepage",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./profilepage": "./src/App",
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
