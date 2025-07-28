const { dependencies } = require("./package.json");
module.exports = {
  name: "",
  filename: "remoteEntry.js",
  remotes: {
    "homepage": "homepage@http://localhost:3001/remoteEntry.js",
    "loginpage": "loginpage@http://localhost:3002/remoteEntry.js",
    "navbar": "navbar@http://localhost:3003/remoteEntry.js",
    "signuppage": "signuppage@http://localhost:3004/remoteEntry.js",
    "footer": "footer@http://localhost:3005/remoteEntry.js",
    "contactpage": "contactpage@http://localhost:3006/remoteEntry.js",
    "cart": "cart@http://localhost:3007/remoteEntry.js",
    "landingpage": "landingpage@http://localhost:3008/remoteEntry.js",
    "resturants": "resturants@http://localhost:3009/remoteEntry.js",
    "adminpage": "adminpage@http://localhost:3011/remoteEntry.js",
    "profilepage": "profilepage@http://localhost:3012/remoteEntry.js",
  },
  exposes: {},
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
