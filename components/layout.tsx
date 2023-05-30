import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
        </>
    );
};
export default Layout;