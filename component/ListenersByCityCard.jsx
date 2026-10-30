"use client";

import { ArrowUpRight, ArrowDown } from "lucide-react";

const CITIES = [
  { name: "New York", percent: 30 },
  { name: "California", percent: 53 },
  { name: "Texas", percent: 15 },
  { name: "California", percent: 5 },
  { name: "Georgia", percent: 9 },
];

export default function ListenersByCityCard() {
  return (
    <div
      className="rounded-3xl p-6 bg-card-gradient"
      
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-white/80 text-lg mb-3">Listeners by City</p>
          <div className="flex items-center gap-3">
            <span className="text-white text-3xl font-bold">50.8K</span>
            <span className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
              28.4% <ArrowUpRight size={12} />
            </span>
          </div>
        </div>

        {/* <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#150a20] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors">
          Export
          <ArrowDown size={15} />
        </button> */}
      </div>

      {/* City list */}
      <div className="space-y-2">
        {CITIES.map((city, i) => (
          <div key={i}>
            <p className="text-white/90 text-[15px] mb-1">{city.name}</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${city.percent}%` }}
                />
              </div>
              <span className="text-amber-400 text-sm font-medium w-10 text-right">
                {city.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


