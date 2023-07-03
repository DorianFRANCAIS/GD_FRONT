"use client";
import Navbar from '@/app/Navbar'
import './globals.css'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHomeWork } from "react-icons/md";
<<<<<<< HEAD
import { AiFillCalendar } from "react-icons/ai";
=======
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
  session: any;
}
>>>>>>> 8c40f1ba6f6b6fd9b7fde83877eb65494ed59def

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
<<<<<<< HEAD
        <Navbar menuItem={[{ name: "Dashboard", icon: <RxDashboard />, url: "dashboard" },{ name: "Etablissements", icon: <MdOutlineHomeWork />, url: "establishments" },{ name: "Agenda", icon: <AiFillCalendar />, url: "agenda" }]} />
          <div className="w-full">{children}</div>
=======
        <SessionProvider session={session}>
          <Navbar menuItem={[{ name: "Dashboard", icon: <RxDashboard />, url: "/dashboard" }, { name: "Etablissements", icon: <MdOutlineHomeWork />, url: "establishments" }]} />
          <div className="w-full">{children}</div>
        </SessionProvider>
>>>>>>> 8c40f1ba6f6b6fd9b7fde83877eb65494ed59def
      </body>
    </html>
  )
}
