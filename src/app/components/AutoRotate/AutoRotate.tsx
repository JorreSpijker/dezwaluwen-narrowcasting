'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { links } from "@/app/components/NavBar/NavBar";
import ProgressBar from "@/app/components/ProgressBar/ProgressBar";

export default function AutoRotate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPaused = searchParams.has("pause");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const duration = 10000; // 10 seconds
    const interval = 100; // Update every 100ms

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
  }, [currentIndex, router, isPaused]);

  return <ProgressBar progress={progress} />;
}
