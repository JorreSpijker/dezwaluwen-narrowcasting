'use client'

import { ClipLoader } from "react-spinners"
import { changeDateFormat } from "@/utils/DateHelpers";
import { useResilientFetch } from "@/utils/useResilientFetch"
import Alert from "@/app/components/Alert/Alerts"

interface News {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
}

export default function LatestNews() {
  const fetchUrl = `https://www.dezwaluwen.nl/?rest_route=/wp/v2/posts`;

  const { data, loading, error } = useResilientFetch<News[]>(fetchUrl, 'latest-news');
  const news = data ?? [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full">
      <h2 className="font-bold text-2xl mb-4">Laatste nieuws</h2>
      {error ? <div className="mb-4"><Alert label="Error" content={error} style="error" /></div> : null}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
          <div>
            {Array.isArray(news) && news.map((item, index) => (
              <div key={index} className="">
                <h3 className="font-bold text-lg">{item.title.rendered}</h3>
                <p className="text-sm text-gray-500">{changeDateFormat(item.date)}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
