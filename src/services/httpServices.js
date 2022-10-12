import axios from "axios";

axios.defaults.baseURL = "https://login-signup-form-yuki.heroku";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
