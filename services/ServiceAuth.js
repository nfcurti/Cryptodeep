import axios from "axios";
import http from "./URLManager";
var qs = require("qs");

const finalUrl = 'http://localhost:3002/api-cryptodeep/';
// const finalUrl = "https://juancurti.com/api-cryptodeep/";

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
  baseURL: finalUrl,
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
  baseURL: finalUrl,
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
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
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
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
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
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
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
if(data.minbtcwithdraw != null) { _mapToSend.minbtcwithdraw = data.minbtcwithdraw; }
if(data.minethwithdraw != null) { _mapToSend.minethwithdraw = data.minethwithdraw; }
if(data.minltcwithdraw != null) { _mapToSend.minltcwithdraw = data.minltcwithdraw; }
if(data.mintrxwithdraw != null) { _mapToSend.mintrxwithdraw = data.mintrxwithdraw; }
if(data.roll_a != null) { _mapToSend.roll_a = data.roll_a; }
if(data.roll_b != null) { _mapToSend.roll_b = data.roll_b; }
if(data.roll_c != null) { _mapToSend.roll_c = data.roll_c; }
if(data.roll_d != null) { _mapToSend.roll_d = data.roll_d; }
if(data.roll_e != null) { _mapToSend.roll_e = data.roll_e; }
if(data.jackpot != null) { _mapToSend.jackpot = data.jackpot; }

return _http.post(`updategeneralsettings`, qs.stringify(_mapToSend));
}

const getprofile = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
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

const getwithdrawals = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.get(`withdrawals`, qs.stringify({
  
}));
}

const dowithdraw = data => {
  if(!data.token || !data.currency || !data.cryptoaddress || !data.points) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "currency": data.currency,
  "cryptoaddress": data.cryptoaddress,
  "points": data.points
};

return _http.post(`withdraw`, qs.stringify(_mapToSend));
}

const getglobalwithdraws = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.get(`getglobalwithdraws`, qs.stringify({
  
}));
}

const validatewithdraw = data => {
  if(!data.token || !data.withdrawId) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "withdrawId": data.withdrawId
};

return _http.post(`validatewithdraw`, qs.stringify(_mapToSend));
}

const rejectwithdraw = data => {
  if(!data.token || !data.withdrawId) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "withdrawId": data.withdrawId
};

return _http.post(`rejectwithdraw`, qs.stringify(_mapToSend));
}


const doexecutefaucet = data => {
  if(!data.token || !data.rollednumber) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "rollednumber": data.rollednumber,
};

return _http.post(`executefaucet`, qs.stringify(_mapToSend));
}

//
const getfaucets = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL:finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.get(`getfaucets`, qs.stringify({
  
}));
}

const getaffiliates = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.get(`getaffiliates`, qs.stringify({
  
}));
}


//
const edituserasadmin = data => {
  if(!data.token || !data.userid || !data.username || !data.email || !data.points || !data.firstgen || !data.secondgen) {

   alert("Missing field");
   return;
}

if(data.privilegeLevel == null) {
  alert("Missing field...");
   return;
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "userid": data.userid,
  "username": data.username,
  "email": data.email,
  "points": data.points,
  "firstgen": data.firstgen,
  "secondgen": data.secondgen,
  "privilegeLevel": data.privilegeLevel
};

return _http.post(`edituserasadmin`, qs.stringify(_mapToSend));
}

const getreviewitems = data => {
  if(!data.token) {
    return alert("");
}
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

return _http.get(`getreviewitems`, qs.stringify({
  
}));
}

const addreviewitem = data => {
  if(!data.token || 
      !data.iconurl ||
      !data.title ||
      !data.description ||
      !data.reward ||
      !data.siteurl ||
      !data.hashtags) {

   alert("Missing field");
   return;
}

const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "iconurl": data.iconurl,
  "title": data.title,
  "description": data.description,
  "reward": data.reward,
  "siteurl": data.siteurl,
  "hashtags": data.hashtags
};

return _http.post(`addreviewitem`, qs.stringify(_mapToSend));
}

const deletereviewitem = data => {
  if(!data.token || 
      !data.reviewid) {

   alert("Missing field");
   return;
}

const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "reviewid": data.reviewid
};

return _http.post(`deletereviewitem`, qs.stringify(_mapToSend));
}

//
const updatereviewitem = data => {
  if(!data.token || 
      !data.reviewid ||
      !data.enabled ||
      !data.iconurl ||
      !data.title ||
      !data.description ||
      !data.reward ||
      !data.siteurl ||
      !data.hashtags) {

   alert("Missing field");
   return;
}

const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    'x-access-token': data.token
  }
});

var _mapToSend = {
  "reviewid": data.reviewid,
  "enabled": data.enabled,
  "iconurl": data.iconurl,
  "title": data.title,
  "description": data.description,
  "reward": data.reward,
  "siteurl": data.siteurl,
  "hashtags": data.hashtags
};

return _http.post(`updatereviewitem`, qs.stringify(_mapToSend));
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
    getprofile,
    dowithdraw,
    getwithdrawals,
    getglobalwithdraws,
    validatewithdraw,
    rejectwithdraw,
    doexecutefaucet,
    getfaucets,
    getaffiliates,
    edituserasadmin,
    getreviewitems,
    addreviewitem,
    deletereviewitem,
    updatereviewitem
  }
  