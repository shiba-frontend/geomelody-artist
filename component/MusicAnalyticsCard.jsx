"use client";
// npm install recharts lucide-react

import { useState, useRef, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const DATA = [
  { name: "Listeners", value: 50, color: "#4ADE80" },
  { name: "Share", value: 20, color: "#FFCD27" },
  { name: "Download", value: 30, color: "#900DA4" },
];


const PERIODS = ["Weekly", "Monthly", "Yearly"];

export default function MusicAnalyticsCard() {
  const [period, setPeriod] = useState("Weekly");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIntroOfPage = (label) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};


const CustomTooltip = ({ active, payload, label }) => {
  const firstPayload = payload?.[0];
  const isVisible = active && firstPayload != null;
  return (
    <div
      className="custom-tooltip"
     
    >
      {isVisible && (
        <>
          <p className="label">{`${label} : ${firstPayload.value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </>
      )}
    </div>
  );
};

  return (
    <div
      className="rounded-3xl p-6 bg-card-gradient h-full"
      
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-white/70 text-sm mb-3">Music Analytics</p>
          <div className="flex items-center gap-3">
            <span className="text-white text-3xl font-bold">50.8K</span>
            <span className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
              28.4% <ArrowUpRight size={12} />
            </span>
          </div>
        </div>

        {/* Period dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 bg-[#3f2a2a]/70 hover:bg-[#3f2a2a] text-white text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            {period}
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-[#2a1440] border border-white/10 rounded-xl overflow-hidden z-10 shadow-lg">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    p === period
                      ? "text-amber-400 bg-white/5"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pie + legend */}
      <div className="flex items-center gap-5">
        <div className="w-35 h-35 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                dataKey="value"
                nameKey="name"
                startAngle={90}
                endAngle={450}
                innerRadius={0}
                outerRadius="100%"
                stroke="none"
              >
                {DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {DATA.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-white/90 text-[15px] w-28">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
              <span className="text-white font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
