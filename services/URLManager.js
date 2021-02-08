import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: "http://51.68.154.68/api-cryptodeep/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
  }
});
