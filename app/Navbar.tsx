'use client';
import { signOut, useSession } from "next-auth/react";
import React, { ReactElement, useEffect, useState } from "react";
import Link from 'next/link'

export default function Navbar() {
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
        session?.user.tokens.accessToken &&
        <nav className="bg-blue-500 p-4">
            <div className="">
                <div className="flex justify-between items-center">
                    <div className="">
                        <Link href="/dashboard">
                            <p className="text-white font-bold text-3xl">GestiDogs</p>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4 text-white font-bold">
                        <Link href="/activities">
                            Mes activités
                        </Link>
                        <Link href="/agenda">
                            Agenda
                        </Link>
                        <Link href="/dogs">
                            Mes chiens
                        </Link>
                        <Link href="/team">
                            Mon équipe
                        </Link>
                        <Link href="/account">
                            <img
                                src={session?.user.user.avatarUrl ? session?.user.user.avatarUrl : "/img/avatar.svg"}
                                alt="Profile"
                                className="avatar rounded-full"
                            />
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    )
};