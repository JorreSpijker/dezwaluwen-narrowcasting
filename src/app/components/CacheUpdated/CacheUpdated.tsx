'use client'

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { CACHE_TTL } from "@/utils/useResilientFetch";

export default function CacheUpdated() {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const read = () => {
      const raw = localStorage.getItem('cache-last-updated');
      setTimestamp(raw ? Number(raw) : null);
    };
    read();
    const interval = setInterval(read, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timestamp) return null;

  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const nextDate = new Date(timestamp + CACHE_TTL);
  const nextHours = String(nextDate.getHours()).padStart(2, '0');
  const nextMinutes = String(nextDate.getMinutes()).padStart(2, '0');

  return (
    <span className="flex flex-col items-end gap-0.5 text-sm text-gray-500 tabular-nums">
      <span className="flex items-center gap-1">
        <ArrowPathIcon className="w-3.5 h-3.5" />
        Bijgewerkt om {hours}:{minutes}
      </span>
      <span>volgende update om {nextHours}:{nextMinutes}</span>
    </span>
  );
}
