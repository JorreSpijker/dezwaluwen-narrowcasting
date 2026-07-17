'use client'

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only tijd-init, voorkomt SSR/hydration mismatch
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return (
    <span className="font-mono text-2xl font-semibold text-gray-800 tabular-nums tracking-tight">
      {hours}:{minutes}
      <span className="text-gray-400">:{seconds}</span>
    </span>
  );
}
