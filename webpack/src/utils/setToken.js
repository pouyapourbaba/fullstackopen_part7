import axios from "axios";

const setToken = token => {
  if (token) {
    const newToken = `bearer ${token}`;
    axios.defaults.headers.common["authorization"] = newToken;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setToken;
