import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    })
  );
}
