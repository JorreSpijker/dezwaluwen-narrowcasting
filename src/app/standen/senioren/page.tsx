'use client'

import { Teams } from "@/interfaces/Teams";
import { ClipLoader } from "react-spinners";
import StandingsTable from "@/app/components/StandingsTable/StandingsTable";
import { FetchPathSenioren } from "@/constants/paths";
import { useResilientFetch } from "@/utils/useResilientFetch";
import Alert from "@/app/components/Alert/Alerts";

export default function StandingsPage() {
  const { data, loading, error } = useResilientFetch<Teams[]>(FetchPathSenioren, 'teams-senioren');
  const teams = data ?? [];

  return (
    <div className="grid lg:grid-cols-3 gap-8 max-w-[1800px] lg:w-full px-4 lg:mx-auto">
       {error ? <div className="col-span-3"><Alert label="Error" content={error} style="error" /></div> : null}
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
