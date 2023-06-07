'use client';
import { signOut, useSession } from "next-auth/react";
import React, { ReactElement, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";

interface NavItem {
    name: string;
    icon: ReactElement;
}
interface NavbarProps {
    menuItem: NavItem[];
}


export default function Navbar({ menuItem }: NavbarProps) {
    const [window, setWindow] = useState(false);
    const { data: session } = useSession();

    let openClose = () => {
        if (window === false) {
            setWindow(true);
        } else {
            setWindow(false);
        }
    };

    return (
        session?.user ?
            <nav className="navbar-menu bg-main text-white" style={{ width: window === false ? 250 : 60 }}>
                <div className="burger-wrapper" onClick={() => openClose()}>
                    <GiHamburgerMenu className="cursor-pointer w-24 h-auto" />
                </div>
                <ul className="navbar__list h-full justify-between">
                    {menuItem.map((item: any, i: number) => (
                        <div className="navbar__li-box flex items-center p-4" key={i}>
                            {item.icon}
                            <li
                                className="navbar__li"
                                style={{ display: window === false ? "inline-block" : "none" }}
                            >
                                {item.name}
                            </li>
                        </div>
                    ))}
                    <div className="navbar__li-box flex items-center p-4">
                        <BiLogOut />
                        <li
                            className="navbar__li"
                            style={{ display: window === false ? "inline-block" : "none" }}
                        >
                            Se déconnecter
                        </li>
                    </div>
                </ul>
            </nav > :
            <></>
    )
};