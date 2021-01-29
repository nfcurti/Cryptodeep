import axios from "axios";
import http from "./URLManager";
var qs = require("qs");

// const finalUrl = 'http://localhost:3002/api-cryptodeep/';
const finalUrl = "https://juancurti.com/api-cryptodeep/";

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
//   if(!data.token) {
//     return alert("");
// }
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
  if(!data.token || !data.currency || !data.cryptoaddress || !data.originalquant || !data.points) {
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
  "originalquant": data.originalquant,
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
  
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL:finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    // 'x-access-token': data.token
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
  "faucetbalance": data.faucetbalance,
  "firstgen": data.firstgen,
  "secondgen": data.secondgen,
  "privilegeLevel": data.privilegeLevel
};

return _http.post(`edituserasadmin`, qs.stringify(_mapToSend));
}

const getreviewitems = data => {

const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    // 'x-access-token': data.token
  }
});

return _http.get(`getreviewitems`, qs.stringify({
  
}));
}

const addreviewitem = data => {
  if(!data.token || 
      !data.iconurl) {

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
  "iconurl": data.iconurl
};

if(data.uniqueid != null) { _mapToSend['uniqueid'] = data.uniqueid; }
if(data.title != null) { _mapToSend['title'] = data.title; }
if(data.description != null) { _mapToSend['description'] = data.description; }
if(data.siteurl != null) { _mapToSend['siteurl'] = data.siteurl; }
if(data.importance != null) { _mapToSend['importance'] = data.importance; }
if(data.subcategoryid != null) { _mapToSend['subcategoryid'] = data.subcategoryid; }
if(data.score != null) { _mapToSend['score'] = data.score; }
if(data.pros != null) { _mapToSend['pros'] = data.pros; }
if(data.cons != null) { _mapToSend['cons'] = data.cons; }
if(data.shortdescription != null) { _mapToSend['shortdescription'] = data.shortdescription; }

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
      !data.featured ||
      !data.iconurl ||
      !data.title ||
      !data.description ||
      !data.siteurl ||
      !data.importance ||
      !data.score ||
      !data.pros ||
      !data.uniqueid ||
      !data.shortdescription ||
      !data.cons ||
      !data.subcategoryid) {

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
  "uniqueid": data.uniqueid,
  "reviewid": data.reviewid,
  "enabled": data.enabled,
  "featured": data.featured,
  "iconurl": data.iconurl,
  "title": data.title,
  "description": data.description,
  "siteurl": data.siteurl,
  "subcategoryid": data.subcategoryid,
  "score": data.score,
  "pros": data.pros,
  "cons": data.cons,
  "shortdescription": data.shortdescription,
  "importance": data.importance
};

return _http.post(`updatereviewitem`, qs.stringify(_mapToSend));
}

const doreview = data => {
  if(!data.token || 
      !data.reviewid ||
      !data.scoregiven ||
      !data.userid) {

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
  "message": data.message ?? "",
  "userid": data.userid,
  "reviewid": data.reviewid,
  "scoregiven": data.scoregiven
};

return _http.post(`doreview`, qs.stringify(_mapToSend));
}

const getreviews = data => {
//   if(!data.token) {
//     return alert("");
// }
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    // 'x-access-token': data.token
  }
});

var url = data.reviewid ? `getreviews?reviewid=${data.reviewid}` : 'getreviews';

return _http.get(url, qs.stringify({
  
}));
}

//
const addrevcategory = data => {
  if(!data.token || 
      !data.iconurlx ||
      !data.importance ||
      !data.title) {

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
  "iconurlx": data.iconurlx,
  "importance": data.importance,
  "title": data.title
};

return _http.post(`addrevcategory`, qs.stringify(_mapToSend));
}

const getrevcategory = data => {
//   if(!data.token) {
//     return alert("");
// }
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    // 'x-access-token': data.token
  }
});

return _http.get(`getrevcategory`, qs.stringify({
  
}));
}

const removerevcategory = data => {
  if(!data.token || 
      !data.categoryid) {

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
  "categoryid": data.categoryid
};

return _http.post(`removerevcategory`, qs.stringify(_mapToSend));
}

const editrevcategory = data => {
  if(!data.token || 
      !data.categoryid ||
      !data.iconurlx ||
      !data.importance ||
      !data.title) {

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
  "categoryid": data.categoryid,
  "iconurlx": data.iconurlx,
  "importance": data.importance,
  "title": data.title
};

return _http.post(`editrevcategory`, qs.stringify(_mapToSend));
}

const addrevsubcategory = data => {
  if(!data.token || 
      !data.iconurlx ||
      !data.parentcategoryid ||
      !data.importance ||
      !data.title) {

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
  "iconurlx": data.iconurlx,
  "title": data.title,
  "importance": data.importance,
  'parentcategoryid': data.parentcategoryid
};

return _http.post(`addrevsubcategory`, qs.stringify(_mapToSend));
}

const getrevsubcategory = data => {
//   if(!data.token) {
//     return alert("");
// }
const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    // 'x-access-token': data.token
  }
});

return _http.get(`getrevsubcategory`, qs.stringify({
  
}));
}

const removerevsubcategory = data => {
  if(!data.token || 
      !data.subcategoryid) {

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
  "subcategoryid": data.subcategoryid
};

return _http.post(`removerevsubcategory`, qs.stringify(_mapToSend));
}

const editrevsubcategory = data => {
  if(!data.token || 
      !data.subcategoryid ||
      !data.iconurlx ||
      !data.importance ||
      !data.title) {

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
  "subcategoryid": data.subcategoryid,
  "iconurlx": data.iconurlx,
  "importance": data.importance,
  "title": data.title
};

return _http.post(`editrevsubcategory`, qs.stringify(_mapToSend));
}

const getlanguagedataset = data => {

const _http = axios.create({
  // baseURL: 'http://localhost:3002/api-cryptodeep/',
  baseURL: finalUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'crossDomain': true,
    'Content-Type': ' application/x-www-form-urlencoded',
    // 'x-access-token': data.token
  }
});

return _http.get(`getlanguagedataset`, qs.stringify({
  
}));
}

const editlanguagedataset = data => {
  if(!data.token || 
      !data.codemsg ||
      !data.en) {

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
  "codemsg": data.codemsg,
  "en": data.en
};

[
  'descriptionhelper',
  'es',
  'it',
  'ru',
  'hi',
  'pt',
  'fr'
].forEach((v) => {
  if(data[v] != null) {
    _mapToSend[v] = data[v];
  }
})

return _http.post(`editlanguagedataset`, qs.stringify(_mapToSend));
}
//
const addbulklanguagedataset = data => {
  if(!data.token || 
      !data.items) {

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
  "items": data.items,
};

return _http.post(`addbulklanguagedataset`, qs.stringify(_mapToSend));
}

const addbulkreviews = data => {
  if(!data.token || 
      !data.items) {

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
  "items": data.items,
};

return _http.post(`addbulkreviews`, qs.stringify(_mapToSend));
}

const playprediction = data => {
  if(!data.token || !data.targetprice) {
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
  "targetprice": data.targetprice,
};

return _http.post(`playprediction`, qs.stringify(_mapToSend));
}

//
const getpredictions = data => {
  
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

return _http.get(`getpredictions`, qs.stringify({
  
}));
}

///////
const gamesettings = data => {
  //   if(!data.token) {
  //     return alert("");
  // }
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
  
  return _http.get(`gamesettings`, qs.stringify({
    
  }));
  }
  
  const updategamesettings = data => {
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
  
  if(data.predictionaward != null) { _mapToSend.predictionaward = data.predictionaward; }
  if(data.questionshoura != null) { _mapToSend.questionshoura = data.questionshoura;  }
  if(data.questionshourb != null) { _mapToSend.questionshourb = data.questionshourb; }
  if(data.questionsaward != null) { _mapToSend.questionsaward = data.questionsaward; }
  if(data.findtherobotaward != null) { _mapToSend.findtherobotaward = data.findtherobotaward; }
  if(data.affiliateaward != null) { _mapToSend.affiliateaward = data.affiliateaward; }
  if(data.affiliatewinners != null) { _mapToSend.affiliatewinners = data.affiliatewinners; }
  
  return _http.post(`updategamesettings`, qs.stringify(_mapToSend));
  }

  //Game Questions
  const addgamequestion = data => {
    if(!data.token || 
        !data.title ||
        !data.correctoption ||
        !data.optiona ||
        !data.optionb ||
        !data.optionc ||
        !data.optiond) {
  
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
    "title": data.title,
    "correctoption": data.correctoption,
    "optiona": data.optiona,
    "optionb": data.optionb,
    "optionc": data.optionc,
    "optiond": data.optiond
  };
  
  return _http.post(`addgamequestion`, qs.stringify(_mapToSend));
  }
  
  const getgamequestions = data => {
  //   if(!data.token) {
  //     return alert("");
  // }
  const _http = axios.create({
    // baseURL: 'http://localhost:3002/api-cryptodeep/',
    baseURL: finalUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      'crossDomain': true,
      'Content-Type': ' application/x-www-form-urlencoded',
      // 'x-access-token': data.token
    }
  });
  
  return _http.get(`getgamequestions`, qs.stringify({
    
  }));
  }
  
  const removegamequestion = data => {
    if(!data.token || 
        !data.gamequestionid) {
  
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
    "gamequestionid": data.gamequestionid
  };
  
  return _http.post(`removegamequestion`, qs.stringify(_mapToSend));
  }
  
  const editgamequestion = data => {
    if(!data.token || 
        !data.gamequestionid) {
  
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
    "gamequestionid": data.gamequestionid,
  };

  if(data.enabled != null) { _mapToSend.enabled = data.enabled; }
  if(data.title != null) { _mapToSend.title = data.title; }
  if(data.correctoption != null) { _mapToSend.correctoption = data.correctoption; }
  if(data.optiona != null) { _mapToSend.optiona = data.optiona; }
  if(data.optionb != null) { _mapToSend.optionb = data.optionb; }
  if(data.optionc != null) { _mapToSend.optionc = data.optionc; }
  if(data.optiond != null) { _mapToSend.optiond = data.optiond; }
  
  return _http.post(`editgamequestion`, qs.stringify(_mapToSend));
  }

  const getgamequestion = data => {
    //   if(!data.token) {
    //     return alert("");
    // }
    const _http = axios.create({
      // baseURL: 'http://localhost:3002/api-cryptodeep/',
      baseURL: finalUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        'crossDomain': true,
        'Content-Type': ' application/x-www-form-urlencoded',
        // 'x-access-token': data.token
      }
    });
    
    return _http.get(`getgamequestion`, qs.stringify({
      
    }));
    }


    const playgamequestion = data => {
      if(!data.token || 
          !data.gamequestionid ||
          !data.option) {
    
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
      "gamequestionid": data.gamequestionid,
      "option": data.option
    };
  
    return _http.post(`playgamequestion`, qs.stringify(_mapToSend));
    }

    const playfindtherobot = data => {
      if(!data.token) {
    
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
      
    };
  
    return _http.post(`playfindtherobot`, qs.stringify(_mapToSend));
    }
    //

    const playgamblefaucet = data => {
      if(!data.token || !data.userid) {
    
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
      'userid': data.userid,
      'mediumrisk': data.mediumrisk == 'true' ? 'true' : 'false',
      'won': data.won == 'true' ? 'true' : 'false'
      
    };
  
    return _http.post(`playgamblefaucet`, qs.stringify(_mapToSend));
    }

    const historygamblefaucet = data => {
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
      
      return _http.get(`historygamblefaucet`, qs.stringify({
        
      }));
      }

      const getaffcontesthistory = data => {
      //   if(!data.token) {
      //     return alert("");
      // }
      const _http = axios.create({
        // baseURL: 'http://localhost:3002/api-cryptodeep/',
        baseURL: finalUrl,
        headers: {
          "Access-Control-Allow-Origin": "*",
          'crossDomain': true,
          'Content-Type': ' application/x-www-form-urlencoded',
          // 'x-access-token': data.token
        }
      });
      
      return _http.get(`getaffcontesthistory`, qs.stringify({
        
      }));
      }

      const editaffcontesthistory = data => {
        if(!data.token || !data.affcontestid) {
      
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
        'affcontestid': data.affcontestid,
        'totalpoints': data.totalpoints
      };
    
      return _http.post(`editaffcontesthistory`, qs.stringify(_mapToSend));
      }
      //
      const testafconaction = data => {
        if(!data.token) {
      
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
        
      };
    
      return _http.post(`testafconaction`, qs.stringify(_mapToSend));
      }


      const addfaqitem = data => {
        if(!data.token) {
      
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
        
      };
      if(data.question != null) { _mapToSend['question'] = data.question; }
      if(data.answer != null) { _mapToSend['answer'] = data.answer; }
      if(data.importance != null) { _mapToSend['importance'] = data.importance; }
      
      return _http.post(`addfaqitem`, qs.stringify(_mapToSend));
      }
      
      const getfaqitems = data => {
      //   if(!data.token) {
      //     return alert("");
      // }
      const _http = axios.create({
        // baseURL: 'http://localhost:3002/api-cryptodeep/',
        baseURL: finalUrl,
        headers: {
          "Access-Control-Allow-Origin": "*",
          'crossDomain': true,
          'Content-Type': ' application/x-www-form-urlencoded',
          // 'x-access-token': data.token
        }
      });
      
      return _http.get(`getfaqitems`, qs.stringify({
        
      }));
      }
      
      const removefaqitem = data => {
        if(!data.token || 
            !data.faqitemid) {
      
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
        "faqitemid": data.faqitemid
      };
      
      return _http.post(`removefaqitem`, qs.stringify(_mapToSend));
      }
      
      const editfaqitem = data => {
        if(!data.token || 
            !data.faqitemid) {
      
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
        "faqitemid": data.faqitemid,
      };
    
      if(data.question != null) { _mapToSend.question = data.question; }
      if(data.answer != null) { _mapToSend.answer = data.answer; }
      if(data.importance != null) { _mapToSend.importance = data.importance; }
      
      return _http.post(`editfaqitem`, qs.stringify(_mapToSend));
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
    updatereviewitem,
    doreview,
    getreviews,
    addrevcategory,
    getrevcategory,
    removerevcategory,
    editrevcategory,
    addrevsubcategory,
    getrevsubcategory,
    removerevsubcategory,
    editrevsubcategory,
    getlanguagedataset,
    editlanguagedataset,
    addbulklanguagedataset,
    getpredictions,
    playprediction,
    updategamesettings,
    gamesettings,
    addgamequestion,
    editgamequestion,
    removegamequestion,
    getgamequestions,
    getgamequestion,
    playgamequestion,
    playfindtherobot,
    playgamblefaucet,
    historygamblefaucet,
    getaffcontesthistory,
    editaffcontesthistory,
    testafconaction,
    addfaqitem,
    addbulkreviews,
    editfaqitem,
    removefaqitem,
    getfaqitems
  }
  