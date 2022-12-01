import Cookies from "js-cookie";

export const getUserByToken = async (token: string | undefined) => {
  const response = await fetch(`${process.env.SERVER_API}/user-info`, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: "Bearer " + token },
  });

  return response.json();
};

export const withData = async () => {
  const token = Cookies.get("token");

  const isLoggedIn = token ? true : false;
  let user = {};

  if (isLoggedIn) {
    user = await getUserByToken(token);
  }

  return { isLoggedIn, user, token };
};
