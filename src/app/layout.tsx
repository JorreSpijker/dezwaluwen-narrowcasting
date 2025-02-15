'use client'

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar, { links } from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const pauseTransition = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const duration = 10000; // 10 seconds
    const interval = 100; // Update every 100ms

    if (pauseTransition) {
      return;
    }

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % links.length;
      setCurrentIndex(nextIndex);
      router.push(links[nextIndex].href);
      setProgress(0); // Reset progress when navigating to the next page
    }, duration); // 10 seconds

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (interval / (duration)) * 100;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, interval);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentIndex, router]);

  return (
    <html lang="en">
      <Head>
        <title>KV de Zwaluwen dashboard</title>
        <meta name="description" content="Dashboard voor narrowcasting" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="bg-stone-50 flex flex-col gap-8 m-x-8 h-dvh">
          <div className="w-full bg-white-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80 border border-gray-100 sticky top-0 shadow-[0_14px_24px_rgba(0,0,0,0.1)] ">
            <ProgressBar progress={progress} />
            <div className="max-w-7xl lg:w-full px-8 lg:mx-auto py-8 w-full">
              <NavBar />
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
