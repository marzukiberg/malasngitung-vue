module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'MalasNgitung',
    manifestOptions: {
      name: "MalasNgitung",
      short_name: "MalasNgitung",
      start_url: "./",
      display: "standalone",
      theme_color: "#22252D",
      icons: [
        {
          src: "img/icons/msapplication-icon-144x144.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    themeColor: '#22252D',
    msTileColor: '#22252D',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
  },
};
