const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_MOCK_SERVER_URL,
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error("/api Proxy error:", err);
        res.status(500).send("Proxy Error");
      },
    })
  );

  app.use(
    "/openapi", // 클라이언트에서 요청하는 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_OPENAPI_URL, // 대상 서버 URL
      changeOrigin: true, // CORS 문제 해결
      secure: false,
      onError: (err, req, res) => {
        console.error("/openapi Proxy error:", err);
        res.status(500).send("Proxy Error");
      },
    })
  );
};
