import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:3002/api-cryptodeep/',
  // baseURL: "https://juancurti.com/api-cryptodeep/",
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
  }
});
