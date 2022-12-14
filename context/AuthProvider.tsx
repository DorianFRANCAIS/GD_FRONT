import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { withData } from "../helpers/restrictions";

export const AuthContext = React.createContext({});

const addCookie = (key: string, value: string = "") => {
  if (key) Cookies.set(key, value, { expires: 7 });
};

const removeCookie = (key: string) => {
  if (key) Cookies.remove(key);
};

const isValidToken = () => {
  const token = Cookies.get("token");

  if (token) return true;
  return false;
};

const AuthProvider = ({
  children,
  context,
}: {
  children: React.ReactNode;
  context: any;
}) => {
  const router = useRouter();
  const { locale } = router;
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(!isValidToken());
  const [token, setToken] = useState("");
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const getAuthUser = async () => {
    const { user } = await withData(context);

    setUser(user);

    return user;
  };

  useEffect(() => {
    setLoggedIn(isValidToken());
    getAuthUser();
  }, []);

  const signIn = (params: any, redirectionDatas: any) => {
    return fetch(`${process.env.SERVER_API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((json) => {
            console.log(json.message, "return api signin");
            setApiErrorMessage(json.message);
          });
        }
        return response.json();
      })
      .then((json) => {
        if (json.access_token) {
          let user = json.user;
          let token = json.access_token;
          setUser(user);
          setToken(token);
          addCookie("token", token);
          setLoggedIn(true);

          if (redirectionDatas.next !== undefined) {
            const nextRoute = redirectionDatas.next;
            delete redirectionDatas.next;
            router.push({
              pathname: decodeURIComponent(nextRoute),
              query: redirectionDatas,
            });
          } else {
            router.push({ pathname: "/dashboard" });
          }

          return json;
        }
      })
      .catch((error) => {
        return error.message;
      });
  };

  const signUp = (params: any, redirectionUrl: string, role: string) => {
    return fetch(`${process.env.SERVER_API}/${role}/registration`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (response.status === 422) {
          setApiErrorMessage("User already exists");
        }
        return response.json();
      })
      .then((json) => {
        if (json.access_token) {
          let user = json.user;
          let token = json.access_token;
          setUser(user);
          setToken(token);
          addCookie("token", token);
          setLoggedIn(true);
          router.push({ pathname: redirectionUrl });
        }
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
  };

  const tokenAuth = (token: string, user: any) => {
    setUser(user);
    setToken(token);
    addCookie("token", token);
    addCookie("user", user);
    setLoggedIn(true);
    router.push("/", "/", { locale: locale });
  };

  const logOut = () => {
    removeCookie("token");
    setLoggedIn(false);
    setUser({});
    setToken("");
    router.push({ pathname: "/login" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        signIn,
        signUp,
        tokenAuth,
        logOut,
        token,
        apiErrorMessage,
        setApiErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
