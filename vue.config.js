module.exports = {
    pwa: {
      name: 'Alphabet Typer',
      themeColor: '#122933',
      msTileColor: '#122933',
      navigationColor: "#122933",
      navigationColorDark: "#122933",
      navigationDividerColor: "#122933",
      navigationDividerColorDark: "#122933",
      backgroundColor: '#122933',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'default',
    },
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      proxy: {
        '^/api/*': {
          target: 'http://192.168.178.87:8081',
          changeOrigin: true,
          secure:false,
          pathRewrite: {'^/api': '/api'},
          logLevel: 'debug' 
        }
      }
    }
  }
  