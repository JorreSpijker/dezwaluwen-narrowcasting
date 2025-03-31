'use client'

import { useEffect, useState } from "react"
import styles from './LatestResults.module.css'
import { ClipLoader } from "react-spinners"
import { getOneWeekAgoDate, getTodayDate, changeDateFormat, changeDateFormatToTime } from "@/utils/DateHelpers";
import { checkIfInputIsZwaluwen, checkIfZwaluwenWins } from "@/utils/DisplayHelpers";
import { clsx } from 'clsx';

interface Official {
  roleDescription: string;
  firstname: string;
  infix?: string;
  name: string;
}

interface Results {
  matches: {
    date: string;
    teams: {
      home: {
        name: string;
      };
      away: {
        name: string;
      };
    };
    stats: {
      home: {
        score: number;
      };
      away: {
        score: number;
      };
    };
    official: Official[];
  }[];
}

export default function LatestResults() {
  const [results, setResults] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const today = getTodayDate();
  const oneWeekAgo = getOneWeekAgoDate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/results?=&dateFrom=${oneWeekAgo}&dateTo=${today}`)
      .then(response => response.json())
      .then(data => {
        setResults(data)
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching standings:', error)
      });
  }, [oneWeekAgo, today]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:col-span-2">
      <h2 className="font-bold text-xl mb-4">Laatste uitslagen (7 dagen)</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className="">Datum</th>
              <th className="">Tijd</th>
              <th className="">Thuisploeg</th>
              <th className="">Eindstand</th>
              <th className="">Uitploeg</th>
            </tr>
          </thead>
          <tbody>
            {results.flatMap(result => result.matches).map((match, index) => (
              <tr key={index} className={clsx(checkIfZwaluwenWins(match) ? 'bg-green-200' : '')}>
                <td className={styles.tableCell}>{changeDateFormat(match.date)}</td>
                <td className={styles.tableCell}>{changeDateFormatToTime(match.date)}</td>
                <td className={clsx(styles.tableCell, checkIfInputIsZwaluwen(match.teams.home.name) ? 'font-bold' : '')}>
                  {match.teams.home.name}
                </td>
                <td className={styles.tableCell}>{match.stats.home.score} - {match.stats.away.score}</td>
                <td className={clsx(styles.tableCell, checkIfInputIsZwaluwen(match.teams.away.name) ? 'font-bold' : '')}>{match.teams.away.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
