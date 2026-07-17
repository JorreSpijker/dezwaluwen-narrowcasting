'use client'

import LatestResults from "../components/LatestResults/LatestResults";
import Program from "../components/ProgramAllTeams/ProgramAllTeams";

export default function GeneralPage() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-[1800px] lg:w-full px-4 lg:mx-auto">
      <div className="col-span-2 lg:col-start-1 lg:w-full lg:max-w-[1800px] lg:grid-cols-2 flex flex-col gap-2">
      </div>
      <div className="col-span-2 lg:col-span-2 lg:col-start-1 lg:w-full lg:max-w-[1800px] lg:grid-cols-2">
        <Program />
      </div>
      <div className="col-span-2 lg:col-span-2 lg:col-start-1 lg:w-full lg:max-w-[1800px] lg:grid-cols-2">
        <LatestResults />
      </div>
    </div>
  );
}
