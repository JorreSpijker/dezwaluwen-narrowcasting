'use client'

import { useEffect, useState } from "react"
import styles from './ProgramAllTeams.module.css'
import { ClipLoader } from "react-spinners"
import { checkIfInputIsZwaluwen } from "@/utils/DisplayHelpers";
import { clsx } from 'clsx';
import { changeDateFormat, changeDateFormatToTime, getNextweek, getTodayDate } from "@/utils/DateHelpers";

interface Official {
  roleDescription: string;
  firstname: string;
  infix?: string;
  name: string;
}

interface Program {
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

export default function ProgramAllTeams() {
  const [program, setProgram] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const today = getTodayDate();
  const nextWeek = getNextweek();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/program?=&dateFrom=${today}&dateTo=${nextWeek}`)
      .then(response => response.json())
      .then(data => {
        setProgram(data)
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching program:', error)
      });
  }, [today, nextWeek]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:col-span-2">
      <h2 className="font-bold text-xl mb-4">Programma (7 dagen)</h2>
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
              <th className="">Uitploeg</th>
              <th className="">Scheidsrechter</th>
            </tr>
          </thead>
          <tbody>
            {program.flatMap(result => result.matches).map((match, index) => (
              <tr key={index}>
                <td className={styles.tableCell}>{changeDateFormat(match.date)}</td>
                <td className={styles.tableCell}>{changeDateFormatToTime(match.date)}</td>
                <td className={clsx(styles.tableCell, checkIfInputIsZwaluwen(match.teams.home.name) ? 'font-bold' : '')}>
                  {match.teams.home.name}
                </td>
                <td className={clsx(styles.tableCell, checkIfInputIsZwaluwen(match.teams.away.name) ? 'font-bold' : '')}>{match.teams.away.name}</td>
                <td className={styles.tableCell}>
                {match.official.find((official: Official) => official.roleDescription === "Scheidsrechter")?.firstname} {match.official.find((official: Official) => official.roleDescription === "Scheidsrechter")?.infix ? match.official.find((official: Official) => official.roleDescription === "Scheidsrechter")?.infix + ' ' : ''}{match.official.find((official: Official) => official.roleDescription === "Scheidsrechter")?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
