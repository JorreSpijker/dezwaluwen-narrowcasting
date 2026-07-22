'use client'

import { useEffect, useState } from "react";

const RETRY_DELAYS = [1000, 2000, 4000];
export const CACHE_TTL = 10 * 60 * 1000; // 10 minuten

// Dedupe gelijktijdige fetches naar dezelfde url (bv. meerdere teams in dezelfde pool).
const inFlightRequests = new Map<string, Promise<unknown>>();

function fetchDeduped(url: string): Promise<unknown> {
  let promise = inFlightRequests.get(url);
  if (!promise) {
    promise = fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .finally(() => {
        inFlightRequests.delete(url);
      });
    inFlightRequests.set(url, promise);
  }
  return promise;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface ResilientFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useResilientFetch<T>(url: string, cacheKey: string): ResilientFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let attempt = 0;

    const readCache = (): CacheEntry<T> | null => {
      const raw = localStorage.getItem(cacheKey);
      return raw ? JSON.parse(raw) : null;
    };

    const cached = readCache();
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronous localStorage read, geen React Compiler in dit project
      setData(cached.data);
      setError(null);
      setLoading(false);
      return;
    }

    const load = () => {
      setLoading(true);
      fetchDeduped(url)
        .then(json => {
          if (cancelled) return;
          setData(json as T);
          setError(null);
          setLoading(false);
          const entry: CacheEntry<T> = { data: json as T, timestamp: Date.now() };
          localStorage.setItem(cacheKey, JSON.stringify(entry));
          localStorage.setItem('cache-last-updated', String(entry.timestamp));
        })
        .catch(err => {
          if (cancelled) return;
          if (attempt < RETRY_DELAYS.length) {
            const delay = RETRY_DELAYS[attempt];
            attempt += 1;
            setTimeout(() => {
              if (!cancelled) load();
            }, delay);
            return;
          }
          const detail = `Error fetching ${url}: ${err}`;
          console.error(detail);
          setLoading(false);
          if (cached) {
            setData(cached.data);
            setError(`Kan geen verbinding maken, toont laatst bekende gegevens.\n${detail}`);
          } else {
            setError(`Kan geen verbinding maken.\n${detail}`);
          }
        });
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [url, cacheKey]);

  return { data, loading, error };
}
