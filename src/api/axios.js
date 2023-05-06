import axios from "axios";

export const instance = axios.create({
  baseURL: `https://${process.env.REACT_APP_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
