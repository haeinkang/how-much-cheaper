const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      // pathRewrite: { "^/api": "" },
    })
  );

  app.use(
    "/exchange",
    createProxyMiddleware({
      target: "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
      changeOrigin: true,
      // secure: false, // SSL 인증서 문제 해결
    })
  );
};
