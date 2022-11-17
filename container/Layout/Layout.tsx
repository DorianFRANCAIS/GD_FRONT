import { useRouter } from 'next/router';
import React from 'react'
import useLayoutStyle from './Layout.style'

const Layout = ({ children } : {
    children: React.ReactNode
}) => {

    const { classes } = useLayoutStyle();
    const router = useRouter();

  return (
    <div className={classes.wrapper}>
        { router.pathname === "/login" ||
        router.pathname === "/registration" ?
            <nav
                style={{
                    display: "flex",
                    minHeight: "3rem",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "1rem"
                }}
            >
                <span style={{
                    background: "gray",
                    padding: "0.5rem",
                    margin: "0.5rem",
                    fontSize: "12px",
                    color: "white",
                    borderRadius: "50%"
                }}>Logo</span>
                <h2>Canine Project</h2>
            </nav>
        : null}
        {children}
    </div>
  )
}

export default Layout