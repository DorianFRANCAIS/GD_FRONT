"use client";
import Navbar from '@/app/Navbar'
import './globals.css'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHomeWork } from "react-icons/md";
import { ReactNode, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: IProps) {

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar menuItem={[{ name: "Dashboard", icon: <RxDashboard />, url: "/dashboard" }, { name: "Etablissements", icon: <MdOutlineHomeWork />, url: "establishments" }, { name: "Agenda", icon: <MdOutlineHomeWork />, url: "agenda" }]} />
          <div className="w-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
