"use client";
import './globals.css'
import { ReactNode, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";
import Header from '@/components/Header';
import { initFlowbite } from 'flowbite';

interface IProps {
  children: ReactNode;
  session: any;
}

function RootLayout({ children, session }: IProps) {
  useEffect(() => {
    initFlowbite();
  }, [])
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Header />
          <div className="w-full">{children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout;
