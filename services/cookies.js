import * as Cookies from "js-cookie";

const cookieStateKeys = {
  USER: 'ckuser'
}

const saveUserCookies = async (data) => {
  if(!data.cktoken || !data.ckuserid) { return false; }
  await Cookies.remove(cookieStateKeys.USER);
  await Cookies.set(cookieStateKeys.USER, {
    ckuserid: data.ckuserid,
    cktoken: data.cktoken
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
}
