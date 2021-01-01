import axios from "axios";
import http from "./URLManager";
var qs = require("qs");

const login = data => {
  if(data.username.length == 0 ||
    data.password.length == 0) {
      return alert("");
    }
  return http.post(`login`, qs.stringify({
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
  return http.post(`register`, qs.stringify({
    username: data.username,
    password: data.password,
    email: data.email,
    repeatpassword: data.repeatpassword
  }));
}

const resetpassword = data => {
  if(data.email.length == 0) {
      return alert("");
    }
  return http.post(`resetpassword`, qs.stringify({
    email: data.email
  }));
}

const changepassword = data => {
  if(!data.token || !data.oldPassword || !data.newPassword || !data.repeatPassword) {
    return alert("");
}
const _http = axios.create({
  baseURL: "https://juancurti.com/api-cryptodeep/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.post(`changepassword`, qs.stringify({
  oldPassword: data.oldPassword,
  newPassword: data.newPassword,
  repeatPassword: data.repeatPassword
}));
}


const changeemail = data => {
  if(!data.token || !data.email || !data.newEmail || !data.password) {
    return alert("");
}
const _http = axios.create({
  baseURL: "https://juancurti.com/api-cryptodeep/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.post(`changeemail`, qs.stringify({
  email: data.email,
  newEmail: data.newEmail,
  password: data.password
}));
}

const getusers = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  baseURL: 'http://localhost:3002/api-cryptodeep/',
  // baseURL: "https://juancurti.com/api-cryptodeep/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.get(`admin/users`, qs.stringify({
  email: data.email,
  newEmail: data.newEmail,
  password: data.password
}));
}

export default {
    login,
    signup,
    resetpassword,
    changepassword,
    changeemail,
    getusers
  }
  