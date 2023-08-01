'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RiTeamLine } from "react-icons/ri";
import { LiaDogSolid } from "react-icons/lia";
import { BiLogOut } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

function Sidebar() {
    const { data: session } = useSession();
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/login"
        });
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-blueColor">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/dashboard" className="flex ml-2 md:mr-24">
                                <img src="/logo.svg" className="h-8 mr-3" alt="Gestidogs Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Gestidogs</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="w-full flex flex-col justify-center items-center">
                        <img
                            src={session?.user.user.avatarUrl ? session?.user.user.avatarUrl : "/img/avatar.svg"}
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                        <h3 className="text-mainColor font-bold">Hello Mathieu !</h3>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiFillDashboard className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <Link href="/activities" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdWorkOutline className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mes activités</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/agenda" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaCalendarAlt className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Agenda</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dogs" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LiaDogSolid className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mes chiens</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/team" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <RiTeamLine className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mon équipe</span>
                            </Link>
                        </li>
                        <li>
                            <div onClick={handleLogout} className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <BiLogOut className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Se déconnecter</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    )
};

export default Sidebar;