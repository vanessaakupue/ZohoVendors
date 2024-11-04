const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
  target: 'https://www.zohoapis.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '/crm/v2' },
});