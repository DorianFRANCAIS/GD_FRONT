"use client";
import Header from '@/components/Header';
import './globals.css'
import { ReactNode, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
  session: any;
}

function RootLayout({ children, session }: IProps) {

  useEffect(() => {
    const initPreline = async () => {
      // @ts-ignore
      await import('preline')
    }
    initPreline()
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
