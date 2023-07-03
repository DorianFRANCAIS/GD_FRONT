import React, { PropsWithChildren } from "react";
import Navbar from "../app/Navbar";
const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
        </>
    );
};
export default Layout;