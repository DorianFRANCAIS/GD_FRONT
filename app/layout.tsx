"use client";
import Navbar from '@/app/Navbar'
import './globals.css'
import { ReactNode, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
  session: any;
}

function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <div className="w-full">{children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout;
