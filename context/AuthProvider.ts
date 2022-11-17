import React, { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export const AuthContext = React.createContext(null);

const addCookie = (key : string, value : string = '') => {
    if (key) Cookies.set(key, value, { expires: 7 })
}

const removeCookie = (key: string) => {
    if (key) Cookies.remove(key)
}

const isValidToken = () => {
    const token = Cookies.get('token');

    if (token) return true;
    return false;
}

const AuthProvider = (props : any) => {

    const router = useRouter();
    const { locale } = router;
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedOut, setLoggedOut] = useState(!isValidToken());
    const [token, setToken] = useState("");
    const [apiErrorMessage, setApiErrorMessage] = useState("");

    const getAuthUser = async () => {
        const response = await fetch(`${process.env.SERVER_API}/api/user`).then((response) => {

        })
    }

    useEffect(() => {
        setLoggedIn(isValidToken())
        getAuthUser()
    }, []);

    const signin = (params : any, redirectionDatas : any) => {
        return fetch(`${process.env.SERVER_API}/api/login`,
            {
                method: "POST",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }
        ).then((response) => {
            if (!response.ok) {
                response.json()
                .then(json => {
                    console.log(json.message, 'return api signin')
                    setApiErrorMessage(json.message);
                })
            }
            return response.json()
        })
        .then(json => {
            if (json.token) {
                let user = json.user;
                let token = json.token;
                setUser(user)
                setToken(token)
                addCookie('token', token)
                addCookie("user", user)
                setLoggedIn(true)
                
                if (redirectionDatas.next !== undefined) {
                    const nextRoute = redirectionDatas.next
                    delete redirectionDatas.next;
                    router.push({ pathname : decodeURIComponent(nextRoute), query: redirectionDatas })
                } else {
                    router.push({ pathname: '/' })
                }

                return json;
            }
        }).catch(error => {
            return error.message;
        })
    };

    const signUp = (params: any, redirectionUrl: string, locale: string) => {
        return fetch(`${process.env.SERVER_API}/api/register`, 
            {
                method: "POST",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            }        
        )
        .then(response => {
            if (response.status === 422) {
                setApiErrorMessage("User already exists");
            }
            return response.json()
        })
        .then(json => {
            if (json.token) {
                let user = json.user
                let token = json.token
                setUser(user)
                setToken(token)
                addCookie('token', token)
                addCookie('user', user)
                setLoggedIn(true)
                router.push({ pathname: redirectionUrl })
            }
        }).catch(error => {
            console.log("error : " + error.message)
        }) 
    };

    const tokenAuth = (token : string, user : any) => {
        setUser(user)
        setToken(token)
        addCookie('token', token)
        addCookie('user', user)
        setLoggedIn(true)
        router.push('/', '/', {locale: locale})
    };

    const logOut = () => {
        fetch(`${process.env.SERVER_API}/api/logout`, 
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Accept': 'applcation/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status == 200) {
                    console.log('logged out');
                    removeCookie('token');
                    removeCookie('user');
                    setLoggedIn(false);
                    setUser({});
                    setToken("");
                    router.push({ pathname: '/' })
                }
            })
    };

    // return (
        
    // )
}

export default AuthContext