'use client'

import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { changeDateFormat } from "@/utils/DateHelpers";

interface News {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
}

export default function LatestNews() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchUrl = `https://www.dezwaluwen.nl/?rest_route=/`;

  useEffect(() => {
    setLoading(true);
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        setNews(data)
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching program:', error)
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full">
      <h2 className="font-bold text-xl mb-4">Laatste nieuws</h2>
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
