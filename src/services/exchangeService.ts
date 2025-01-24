import axios from "axios";

export const fetchExchange = () =>
  axios.get("/openapi/exchangeJSON", {
    params: {
      authkey: process.env.REACT_APP_AUTH_KEY,
      data: "AP01",
    },
  });
