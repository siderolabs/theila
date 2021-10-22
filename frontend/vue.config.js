module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://0.0.0.0:8090',
        changeOrigin: true
      },
      '/ws': {
        target: 'ws://0.0.0.0:8090',
        changeOrigin: true,
        logLevel: 'debug',
        ws: true,
        onProxyReqWs: function(request) {
          request.setHeader("origin", "http://localhost:8090");
          request.setHeader("host", "localhost:8090");
        },
      },
    }
  }
}
