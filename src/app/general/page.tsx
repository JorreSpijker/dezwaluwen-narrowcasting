'use client'

import LatestResults from "../components/LatestResults/LatestResults";
import Program from "../components/ProgramAllTeams/ProgramAllTeams";
// import LatestNews from "../components/LatestNews/LatestNews";
import Alert from "../components/Alert/Alerts";
import { getMessages } from "@/utils/GetMessages";
import { useEffect, useState } from "react";

// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2
// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/program
// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/results
// https://api-mijn.korfbal.nl/api/v2/clubs/NCX35M2/teams
// https://www.dezwaluwen.nl/?rest_route=/wp/v2/posts/

export default function GeneralPage() {

    // const [messages, setMessages] = useState(false);
  
    // useEffect(() => {
    //   const fetchOptions = async () => {
    //     const messages = await getMessages();
    //     setMessages(messages);
    //   };
    //   fetchOptions();
    // }, []);
    
  return (
    <div className="grid grid-cols-2 gap-8 max-w-7xl lg:w-full px-4 lg:mx-auto">
      <div className="col-span-2 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2 flex flex-col gap-2">
        {/* {messages.length > 0 ? messages.map((message: any, index: number, style: string) => (
          <Alert key={index} label={message.label} content={message.content} style={message.style} />
        )) : null} */}
      </div>
      <div className="col-span-2 lg:col-span-2 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2">
        <Program />
      </div>
      {/* <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:w-full lg:max-w-7xl lg:grid-cols-2 h-full">
        <LatestNews />
      </div> */}
      <div className="col-span-2 lg:col-span-2 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2">
        <LatestResults />
      </div>
    </div>
  );
}
