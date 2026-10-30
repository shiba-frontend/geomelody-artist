"use client";

import { useState } from "react";

const TABS = ["Music", "Event"];

const ACTIVITIES = [
  {
    title: "O Maahi- From Dunki",
    duration: { mins: "05", secs: "10" },
    releaseDate: "10 Aug 2026",
    art: "linear-gradient(160deg, #f2a65a 0%, #d6456c 50%, #6b2a5a 100%)",
  },
];

export default function UpcomingActivityCard() {
  const [activeTab, setActiveTab] = useState("Music");

  return (
    <div
      className="rounded-3xl p-6 bg-card-gradient h-80"
     
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-2xl font-bold">Up Coming Activity</h2>

        <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Activity rows */}
      <div className="space-y-5">
        {ACTIVITIES.map((activity, i) => (
          <div key={i} className="flex items-center gap-6">
            <div
              className="w-18 h-18 rounded-2xl flex-shrink-0"
              style={{ background: activity.art }}
            />

            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold mb-2">
                {activity.title}
              </h3>
              <p className="text-white/50 text-lg">
                <span className="text-white font-semibold">
                  {activity.duration.mins}
                </span>{" "}
                Mins{" "}
                <span className="text-white font-semibold">
                  {activity.duration.secs}
                </span>{" "}
                Secs
              </p>
            </div>

            <div className="text-right">
              <p className="text-white/60 text-lg">Release On</p>
              <p className="text-white text-lg">{activity.releaseDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


