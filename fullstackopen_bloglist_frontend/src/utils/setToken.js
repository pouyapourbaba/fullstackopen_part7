import axios from "axios";

const setToken = token => {
  if (token) {
    const newToken = `bearer ${token}`;
 console.log("newToken ", newToken);
    axios.defaults.headers.common["authorization"] = newToken;
 console.log("axios.defaults.headers ", axios.defaults.headers);
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setToken;
