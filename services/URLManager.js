import axios from "axios";

export default axios.create({
  baseURL: "https://juancurti.com/api-cryptodeep/",
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
  }
});
