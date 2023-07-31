'use client';
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from 'next/link'
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTeam, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

function Header() {
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/login"
        });
    };

    return (
        session?.user.tokens.accessToken &&
        <div id="hs-overlay-basic" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center px-6">
                <a className="flex-none text-xl font-semibold dark:text-white" href="/dashboard" aria-label="Brand">Gestidogs</a>
                <button type="button" className="w-8 h-8 inline-flex justify-center items-center gap-2 rounded-md border border-gray-200 text-gray-600 hover:text-gray-400 transition dark:border-gray-700" data-hs-overlay="#hs-overlay-basic" aria-controls="hs-overlay-basic" aria-label="Toggle navigation">
                    <span className="sr-only">Close Sidebar</span>
                    <svg className="w-3 h-3" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </button>
            </div>

            <nav className="p-6 w-full flex flex-col flex-wrap">
                <ul className="space-y-1.5">
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300" href="/dashboard">
                        <AiOutlineHome />
                        Dashboard
                    </a></li>
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300" href="/account">
                        <AiOutlineUser />
                        Profile
                    </a></li>
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300" href="/account">
                        <FaBookOpen />
                        Agenda
                    </a></li>
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300" href="/activities">
                        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                            <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
                        </svg>
                        Mes activités
                    </a></li>
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300" href="/dogs">
                        <FaDog />
                        Mes chiens
                    </a></li>
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300" href="/team">
                        <AiOutlineTeam />
                        Mon équipe
                    </a></li>
                    <li><a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-white/[.05] dark:text-slate-400 dark:hover:text-slate-300 cursor-pointer" onClick={() => handleLogout()}>
                        <BiLogOut />
                        Se déconnecter
                    </a></li>
                </ul>
            </nav>
        </div>
    )
};

export default Header;