'use client'

import styles from './ProgramAllTeams.module.css'
import { ClipLoader } from "react-spinners"
import { checkIfInputIsZwaluwen } from "@/utils/DisplayHelpers";
import { clsx } from 'clsx';
import { changeDateFormat, changeDateFormatToTime, getNextweek, getTodayDate } from "@/utils/DateHelpers";
import { useResilientFetch } from "@/utils/useResilientFetch"
import Alert from "@/app/components/Alert/Alerts"

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
  const today = getTodayDate();
  const nextWeek = getNextweek();
  const { data, loading, error } = useResilientFetch<Program[]>(
    `https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/program?=&dateFrom=${today}&dateTo=${nextWeek}`,
    'program-all-teams'
  );
  const program = data ?? [];

  return (
    <div className={clsx(styles.card, 'lg:col-span-2')}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Programma (7 dagen)</h2>
      </div>
      {error ? <div className="mb-4"><Alert label="Let op" content={error} style="error" /></div> : null}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colDate} />
            <col className={styles.colTime} />
            <col className={styles.colTeam} />
            <col className={styles.colTeam} />
            <col className={styles.colWide} />
          </colgroup>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Datum</th>
              <th className={clsx(styles.tableHeader, styles.tableHeaderCenter)}>Tijd</th>
              <th className={styles.tableHeader}>Thuisploeg</th>
              <th className={styles.tableHeader}>Uitploeg</th>
              <th className={styles.tableHeader}>Scheidsrechter</th>
            </tr>
          </thead>
          <tbody>
            {program.flatMap(result => result.matches).map((match, index) => (
              <tr key={index}>
                <td className={styles.tableCell}>{changeDateFormat(match.date)}</td>
                <td className={clsx(styles.tableCell, styles.tableCellCenter)}>{changeDateFormatToTime(match.date)}</td>
                <td className={clsx(styles.tableCell, checkIfInputIsZwaluwen(match.teams.home.name) ? styles.tableCellStrong : '')}>
                  {match.teams.home.name}
                </td>
                <td className={clsx(styles.tableCell, checkIfInputIsZwaluwen(match.teams.away.name) ? styles.tableCellStrong : '')}>{match.teams.away.name}</td>
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
