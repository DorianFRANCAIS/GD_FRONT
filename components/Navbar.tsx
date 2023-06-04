'use client';
import React, { ReactElement, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {useRouter} from "next/navigation";

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
    const router = useRouter();
    useEffect(() => {
        console.log(menuItem)
    }, [menuItem])

    let openClose = () => {
        if (window === false) {
            setWindow(true);
        } else {
            setWindow(false);
        }
    };

    const handleNavigate = (url: string) => {
         router.push(url);
    }
    return (
        <nav className="navbar-menu bg-main text-white" style={{ width: window === false ? 250 : 60 }}>
            <div className="burger-wrapper" onClick={() => openClose()}>
                <GiHamburgerMenu className="cursor-pointer w-24 h-auto" />
            </div>
            <ul className="navbar__list">
                {menuItem.map((item: any, i: number) => (
                    <div className="navbar__li-box flex items-center p-4" key={i} onClick={() => handleNavigate(item.url)}>
                        {item.icon}
                        <li
                            className="navbar__li"
                            style={{ display: window === false ? "inline-block" : "none" }}
                        >
                            {item.name}
                        </li>
                    </div>
                ))}
            </ul>
        </nav>
    )
};