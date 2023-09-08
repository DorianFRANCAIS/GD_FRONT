"use client";
import './globals.css'
import {  useEffect } from 'react';
import Header from '@/components/Header';
import { initFlowbite } from 'flowbite';
import AuthProvider from './context/AuthProvider';

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    initFlowbite();
  }, [])
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="w-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
