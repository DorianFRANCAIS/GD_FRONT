import Image from 'next/image';
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
                <Image src="/dogIcon.png" width={40} height={40} alt="logo-canine" />
                <h2>Canine Project</h2>
            </nav>
        : null}
        {children}
    </div>
  )
}

export default Layout