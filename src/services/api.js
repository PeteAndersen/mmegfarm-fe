import Axios from "axios";

const api_root =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://api.mm-eg.farm";

export default Axios.create({
  baseURL: api_root
});
