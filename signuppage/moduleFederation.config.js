const { dependencies } = require("./package.json");
module.exports = {
  name: "signuppage",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./signuppage": "./src/App",
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
