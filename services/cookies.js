import * as Cookies from "js-cookie";

const cookieStateKeys = {
  USER: 'ckuser'
}

const saveRefCookies = async (data) => {
  if(!data.ckref) { return false; }
  await Cookies.remove('ckref');
  await Cookies.set('ckref', {
    'ckref': data.ckref
  });
  return true;
}

const getRefCookies = () => {
  const ckref = Cookies.get('ckref');
  return ckref === undefined ? {} : JSON.parse(ckref);
}

const saveUserCookies = async (data) => {
  if(!data.cktoken || !data.ckuserid) { return false; }
  await Cookies.remove(cookieStateKeys.USER);
  await Cookies.set(cookieStateKeys.USER, {
    ckuserid: data.ckuserid,
    cktoken: data.cktoken,
    ckpl: data.ckprivilege
  });
  return true;
}

const getUserCookies = () => {
  const ckuser = Cookies.get(cookieStateKeys.USER);
  return ckuser === undefined ? {} : JSON.parse(ckuser);
}

const removeUserCookies = () => {
  Cookies.remove(cookieStateKeys.USER);
  return;
}

export default {
  saveUserCookies,
  getUserCookies,
  removeUserCookies,
  saveRefCookies,
  getRefCookies
}
