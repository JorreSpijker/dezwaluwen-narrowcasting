'use client'

import styles from './StandingsTable.module.css'
import { ClipLoader } from "react-spinners"
import { useResilientFetch } from "@/utils/useResilientFetch"
import Alert from "@/app/components/Alert/Alerts"

interface TeamStats {
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goals: {
    difference: number;
    for: number;
    against: number;
  };
}

interface Team {
  team: {
    name: string;
    pool?: string;
  };
  stats: TeamStats;
}

interface Standings {
  standings: Team[];
  pool: {
    name: string;
  }
}

interface StandingsTableProps {
  teamName?: string;
  poolId?: string;
}

export default function StandingsTable({ teamName, poolId }: StandingsTableProps) {
  const { data, loading, error } = useResilientFetch<Standings[]>(
    `https://api-mijn.korfbal.nl/api/v2/matches/pools/${poolId}/standing`,
    `standings-${poolId}`
  );
  const standingsData = data ?? [];
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {teamName ? <h2 className={styles.teamName}>{teamName}</h2> : null}
        {!loading && standingsData[0] ? (
          <span className={styles.poolName}>{standingsData[0].pool.name}</span>
        ) : null}
      </div>
      {error ? <div className="mb-4"><Alert label="Error" content={error} style="error" /></div> : null}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}></th>
              <th className={styles.tableHeader}>Naam</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>G</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>W</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>G</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>V</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>P</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>Ds</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>+</th>
              <th className={`${styles.tableHeader} ${styles.tableHeaderCenter} ${styles.tableCellSmall}`}>-</th>
            </tr>
          </thead>
          <tbody>
            {standingsData[0]?.standings.map((team: Team, index: number) => (
              <tr key={index} className={team.team.name.includes('Zwaluwen') ? styles.homeclub : ''}>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{index + 1}</td>
                <td className={`${styles.tableCell} ${team.team.name.includes('Zwaluwen') ? styles.tableCellStrong : ''}`}>{team.team.name}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.played}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.won}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.draw}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.lost}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter} ${styles.tableCellStrong}`}>{team.stats.points}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.goals.difference}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.goals.for}</td>
                <td className={`${styles.tableCell} ${styles.tableCellCenter}`}>{team.stats.goals.against}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
