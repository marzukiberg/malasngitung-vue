module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'MalasNgitung',
    manifestOptions: {
      theme_color: '#22252D',
      background_color: '#22252D',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      name: 'MalasNgitung',
      short_name: 'MalasNgitung',
      description: 'Calculator made with VueJS',
      icons: [
        {
          src: 'img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    themeColor: '#22252D',
    msTileColor: '#22252D',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
};
