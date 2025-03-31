'use client'

import { useEffect, useState } from "react"
import styles from './StandingsTable.module.css'
import { ClipLoader } from "react-spinners"

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
  };
  stats: TeamStats;
}

interface Standings {
  standings: Team[];
}

interface StandingsTableProps {
  teamName: string;
  poolId: string;
  name: string;
}

export default function StandingsTable({ teamName, poolId }: StandingsTableProps) {
  const [standingsData, setStandingsData] = useState<Standings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api-mijn.korfbal.nl/api/v2/matches/pools/${poolId}/standing`)
      .then(response => response.json())
      .then(data => {
        setStandingsData(data)
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching standings:', error)
      });
  }, [poolId]);
  console.log(standingsData);
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      {teamName ? <h2 className="font-bold text-xl mb-4">{teamName}</h2> : null}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
          <div>
          { standingsData[0] ? (
            <p>{standingsData[0].pool.name }</p>
          )
         : undefined }
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCellSmall}></th>
              <th className="">Naam</th>
              <th className={styles.tableCellSmall}>G</th>
              <th className={styles.tableCellSmall}>W</th>
              <th className={styles.tableCellSmall}>G</th>
              <th className={styles.tableCellSmall}>V</th>
              <th className={styles.tableCellSmall}>P</th>
              <th className={styles.tableCellSmall}>Ds</th>
              <th className={styles.tableCellSmall}>+</th>
              <th className={styles.tableCellSmall}>-</th>
            </tr>
          </thead>
          <tbody>
            {standingsData[0]?.standings.map((team: Team, index: number) => (
              <tr key={index} className={team.team.name.includes('Zwaluwen') ? styles.homeclub : ''}>
                <td className={styles.tableCell}>{index + 1}</td>
                <td className={styles.tableCell}>{team.team.name}</td>
                <td className={styles.tableCell}>{team.stats.played}</td>
                <td className={styles.tableCell}>{team.stats.won}</td>
                <td className={styles.tableCell}>{team.stats.draw}</td>
                <td className={styles.tableCell}>{team.stats.lost}</td>
                <td className={styles.tableCell}>{team.stats.points}</td>
                <td className={styles.tableCell}>{team.stats.goals.difference}</td>
                <td className={styles.tableCell}>{team.stats.goals.for}</td>
                <td className={styles.tableCell}>{team.stats.goals.against}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
      )}
    </div>
  )
}
