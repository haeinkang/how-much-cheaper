const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/site/program/financial",
    createProxyMiddleware({
      target: "https://www.koreaexim.go.kr",
      changeOrigin: true,
    })
  );
};
