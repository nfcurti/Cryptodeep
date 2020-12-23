import axios from "axios";
import http from "./URLManager";
var qs = require("qs");

const login = data => {
  if(data.username.length == 0 ||
    data.password.length == 0) {
      return alert("");
    }
  return http.post(`api/login`, qs.stringify({
    username: data.username,
    password: data.password
  }));
}

const signup = data => {
  if(data.username.length == 0 ||
    data.password.length == 0 ||
    data.email.length == 0 ||
    data.repeatpassword.length == 0) {
      return alert("");
    }
  return http.post(`api/register`, qs.stringify({
    username: data.username,
    password: data.password,
    email: data.email,
    repeatpassword: data.repeatpassword
  }));
}

export default {
    login,
    signup
  }
  