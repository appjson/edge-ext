const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "btn-primary-bg": "#C2E7FF",
              "border-radius-base": "8px",
              "btn-primary-color": "#1F4789",
              "btn-font-weight": 700,
              "btn-primary-shadow": "0px 4px 8px rgba(194, 231, 255, 0.5)",
              "popover-min-width": "100px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
