'use client'

import { Teams } from "@/interfaces/Teams";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import StandingsTable from "@/app/components/StandingsTable/StandingsTable";
import { FetchPathSenioren } from "@/constants/paths";

export default function StandingsPage() {

const [teams, setTeams] = useState<Teams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
      setLoading(true);
      fetch(FetchPathSenioren)
        .then(response => response.json())
        .then(data => {
          setTeams(data)
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching standings:', error)
        });
  }, []);
  
  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl lg:w-full px-4 lg:mx-auto">
       {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          teams.map((team, index) => (
            <div key={index} className="">
              <StandingsTable key={index} teamName={team.name} poolId={team.pool} />
            </div>
          ))
        )}
    </div>
  );
}
