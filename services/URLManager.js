import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: "https://juancurti.com/api-cryptodeep/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
  }
});
