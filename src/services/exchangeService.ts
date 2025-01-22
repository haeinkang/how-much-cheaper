import axios from "axios";

export const fetchExchange = () =>
  axios.get("/exchangeJSON", {
    // params: {
    //   authkey: "ym573D4yW5quZUu9QhX1ZUrreg6vIm6V",
    //   data: "AP01",
    // },
    timeout: 10000,
  });
