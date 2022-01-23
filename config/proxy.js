// DEV 和 FAT公用即可
module.exports = {
  DEV: {
    '/api/cov': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/api/cov': '/' },
    },
    '/report': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/report': '/report' },
    },
  },
  FAT: {
    '/api/cov': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/api/cov': '/' },
    },
    '/report': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '/report': '/report' },
    },
  },
  PROD: {
    '/api/cov': {
      target: 'http://qingkong-api.rico.org.cn',
      changeOrigin: true,
      pathRewrite: { '/api/cov': '/' },
    },
    '/report': {
      target: 'http://qingkong-api.rico.org.cn',
      changeOrigin: true,
      pathRewrite: { '/report': '/report' },
    },
  },
}
