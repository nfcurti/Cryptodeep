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

  var _mapToSend = {
    username: data.username,
    password: data.password,
    email: data.email,
    repeatpassword: data.repeatpassword
  };

  if(data.ref.length > 0) {
    _mapToSend['ref'] = data.ref;
  }
  return http.post(`register`, qs.stringify(_mapToSend));
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


const getgeneralsettings = data => {
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

return _http.get(`generalsettings`, qs.stringify({
  
}));
}

const updategeneralsettings = data => {
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

var _mapToSend = {};

if(data.usdperpoint != null) { _mapToSend.usdperpoint = data.usdperpoint; }
if(data.faucetdelay != null) { _mapToSend.faucetdelay = data.faucetdelay; }
if(data.minpointwithdraw != null) { _mapToSend.minpointwithdraw = data.minpointwithdraw; }
if(data.roll_a != null) { _mapToSend.roll_a = data.roll_a; }
if(data.roll_b != null) { _mapToSend.roll_b = data.roll_b; }
if(data.roll_c != null) { _mapToSend.roll_c = data.roll_c; }
if(data.roll_d != null) { _mapToSend.roll_d = data.roll_d; }
if(data.roll_e != null) { _mapToSend.roll_e = data.roll_e; }

return _http.post(`updategeneralsettings`, qs.stringify(_mapToSend));
}

const getprofile = data => {
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

return _http.get(`profile`, qs.stringify({
  
}));
}

export default {
    login,
    signup,
    resetpassword,
    changepassword,
    changeemail,
    getusers,
    getgeneralsettings,
    updategeneralsettings,
    getprofile
  }
  