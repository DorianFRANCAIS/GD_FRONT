"use client";
import Navbar from '@/app/Navbar'
import './globals.css'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHomeWork } from "react-icons/md";
import { ReactNode } from 'react';
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
          <Navbar menuItem={[{ name: "Dashboard", icon: <RxDashboard />, url: "/dashboard" }, { name: "Etablissements", icon: <MdOutlineHomeWork />, url: "establishments" }]} />
          <div className="w-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
