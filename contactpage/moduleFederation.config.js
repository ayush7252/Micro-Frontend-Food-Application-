const { dependencies } = require("./package.json");
module.exports = {
  name: "contactpage",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./contactpage": "./src/App",
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
