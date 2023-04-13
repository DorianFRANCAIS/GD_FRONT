import Cookies from "js-cookie";
import nextCookie from 'next-cookies';

export const TOKEN_COOKIE = 'token';
export const USER_COOKIE = 'user';

export const getUserByToken = async (token: string | null | undefined) => {
  const response = await fetch(`${process.env.SERVER_API}/user-info`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  });

  return response.json();
};

export async function withData(context : any) {
  const token = getCookie(TOKEN_COOKIE, context);
  const isLoggedIn = token ? true : false;
  let user = {};
  
  if(isLoggedIn) {
    user = await getUserByToken(token);
  }

  return { isLoggedIn, user, token };
}

const getCookieFromBrowser = (key : string) => {
  return Cookies.get(key);
};

const getCookieFromServer = (ctx : any, key = 'id_token') => {
  const cookie = nextCookie(ctx);
  const token = cookie && cookie[key] ? cookie[key] : false;
  if (!token) return null;
  return token;
};

export const getCookie = (key : string, context = {}) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(context, key);
};
