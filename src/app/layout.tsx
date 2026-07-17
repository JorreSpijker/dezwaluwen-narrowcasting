'use client'

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import NavBar from "./components/NavBar/NavBar";
import { Suspense } from "react";
import AutoRotate from "./components/AutoRotate/AutoRotate";
import Clock from "./components/Clock/Clock";
import CacheUpdated from "./components/CacheUpdated/CacheUpdated";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>KV de Zwaluwen dashboard</title>
        <meta name="description" content="Dashboard voor narrowcasting" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="bg-stone-50 flex flex-col gap-8 m-x-8 h-dvh ">
          <div className="w-full bg-white-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80 border border-gray-100 sticky top-0 shadow-[0_14px_24px_rgba(0,0,0,0.1)] mb-6">
            <Suspense fallback={null}>
              <AutoRotate />
            </Suspense>
            <div className="max-w-[1800px] lg:w-full px-8 lg:mx-auto py-8 w-full flex justify-between items-center">
              <div className="flex items-center gap-8">
                <Image src="/logo-zwaluwen.svg" alt="KV de Zwaluwen" width={140} height={140} className="header-logo" />
                <NavBar/>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Clock />
                <CacheUpdated />
              </div>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
