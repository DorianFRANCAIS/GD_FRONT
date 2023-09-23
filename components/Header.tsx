'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RiTeamLine } from "react-icons/ri";
import { LiaDogSolid } from "react-icons/lia";
import { BiLogOut } from "react-icons/bi";
import { FaCalendarAlt, FaUmbrellaBeach } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { PiUsersFourFill } from "react-icons/pi";
import { useEffect, useState } from "react";

function Header() {
    const { data: session } = useSession();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString();

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/login"
        });
    };

    return (
        session?.user.tokens.accessToken ?
        <div>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="w-full flex flex-col justify-center items-center">
                        <img
                            src="/logo_gestidogs.png"
                            alt="logo"
                            className="avatar rounded-full"
                        />
                        <h3 className="text-mainColor font-bold">Hello {session.user.user.firstname} !</h3>
                        <p>{formattedTime}</p>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/dashboard" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AiFillDashboard className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/agenda" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaCalendarAlt className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Agenda</span>
                            </Link>
                        </li>
                        {session.user.user.role !== 'Client' &&
                        <li>
                            <Link href="/clients" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <PiUsersFourFill className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mes clients</span>
                            </Link>
                        </li>
                        }
                        <li>
                            <Link href="/activities" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdWorkOutline className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Activités</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dogs" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LiaDogSolid className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mes chiens</span>
                            </Link>
                        </li>
                        {session.user.user.role !== 'Client' &&
                        <li>
                            <Link href="/team" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <RiTeamLine className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mon équipe</span>
                            </Link>
                        </li>
                        }
                        {session.user.user.role !== 'Client' &&
                        <li>
                            <Link href="/holidays" className="flex items-center p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaUmbrellaBeach className="flex-shrink-0 w-5 h-5 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Congés</span>
                            </Link>
                        </li>
                        }
                    </ul>
                    <div className="flex items-center">
                        <Link href="/account">
                            <img
                                src={session?.user.user.avatarUrl ? session?.user.user.avatarUrl : "/img/avatar.svg"}
                                alt="Profile"
                                className="avatar rounded-full"
                            />
                        </Link>
                        <div onClick={handleLogout} className="flex items-center cursor-pointer p-2 text-mainColor rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BiLogOut className="flex-shrink-0 w-5 h-5 ml-2 text-mainColor transition duration-75 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Se déconnecter</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
        :
        <></>
    )
};

export default Header;