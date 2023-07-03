'use client';
import { signOut, useSession } from "next-auth/react";
import React, { ReactElement, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import Link from 'next/link'
import { set } from "date-fns";

interface NavItem {
    name: string;
    icon: ReactElement;
    url: string;
}
interface NavbarProps {
    menuItem: NavItem[];
}


export default function Navbar({ menuItem }: NavbarProps) {
    const [window, setWindow] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
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
                        <div className={`navbar__li-box flex items-center p-4 ${activeIndex === i ? 'active-menu' : ''}`} onClick={() => setActiveIndex(i)} key={i}>
                            {item.icon}
                            <Link
                                href={item.url}
                                className="navbar__li"
                                style={{ display: window === false ? "inline-block" : "none" }}
                            >
                                {item.name}
                            </Link>
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