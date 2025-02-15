'use client'

import LatestResults from "../components/LatestResults/LatestResults";
import Program from "../components/ProgramAllTeams/ProgramAllTeams";
import LatestNews from "../components/LatestNews/LatestNews";
import Alert from "../components/Alert/Alerts";
import { useEffect, useState } from "react";
import Airtable from "airtable";

// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2
// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/program
// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/results
// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/teams
// https://www.dezwaluwen.nl/?rest_route=/wp/v2/posts/

interface AirtableRecord {
  id: string;
  fields: {
    show: boolean;
    label: string;
    message: string;
  };
}

export default function GeneralPage() {
  // const [airtableData, setAirtableData] = useState<AirtableRecord[]>([]);

  useEffect(() => {
    if (!process.env.AIRTABLE_API || !process.env.AIRTABLE_BASE) {
      console.error("AIRTABLE_API is not set");
      return;
    }

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(`${process.env.AIRTABLE_BASE}`);

    base('messages').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 1,
    }).eachPage((records, fetchNextPage) => {
      // This function (`page`) will get called for each page of records.
      const mappedRecords = records.map(record => ({
        id: record.id,
        fields: record.fields as {
          show: boolean;
          label: string;
          message: string;
        }
      }));
      setAirtableData(mappedRecords);

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, (err) => {
      if (err) { console.error(err); return; }
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 max-w-7xl lg:w-full px-4 lg:mx-auto">
      <div className="col-span-2 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2">
        <Alert label="Let op" content="Dit is een belangrijke melding" />
        {/* {airtableData.map((data, index) => (
          data.fields.show && <Alert key={index} label={data.fields.label} content={data.fields.message} />
        ))} */}
      </div>
      <div className="col-span-2 lg:col-span-1 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2">
        <Program />
      </div>
      <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:w-full lg:max-w-7xl lg:grid-cols-2 h-full">
        <LatestNews />
      </div>
      <div className="col-span-2 lg:col-span-2 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2">
        <LatestResults />
      </div>
    </div>
  );
}
