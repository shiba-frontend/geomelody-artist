"use client";
// npm install recharts lucide-react

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

const DATA = [
  { month: "Jan", revenue: 30000 },
  { month: "Feb", revenue: 58000 },
  { month: "Mar", revenue: 82000 },
  { month: "Apr", revenue: 88000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 100000 },
  { month: "Jul", revenue: 25000 },
  { month: "Aug", revenue: 90000 },
  { month: "Sep", revenue: 40000 },
  { month: "Oct", revenue: 8000 },
  { month: "Nov", revenue: 80000 },
  { month: "Dec", revenue: 58000 },
];

const PERIODS = ["Music", "Events", "Products"];

// Builds an SVG path for a bar with rounded top corners only
// (recharts' own `radius` prop rounds all 4 corners, which looks
// odd sitting flush on the x-axis).
function roundedTopRectPath(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, Math.max(height, 0));
  if (height <= 0) return "";
  return `
    M${x},${y + height}
    L${x},${y + r}
    Q${x},${y} ${x + r},${y}
    L${x + width - r},${y}
    Q${x + width},${y} ${x + width},${y + r}
    L${x + width},${y + height}
    Z
  `;
}

function CustomBar(props) {
  const { x, y, width, height, background } = props;

  return (
    <g>
      {/* dashed guide line from chart top down to the bar */}
      {background && (
        <line
          x1={x + width / 2}
          y1={background.y}
          x2={x + width / 2}
          y2={y}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
      )}
      <path d={roundedTopRectPath(x, y, width, height, 6)} fill="url(#barGradient)" />
    </g>
  );
}

function CustomTick({ x, y, payload }) {
  return (
    <text x={x} y={y + 14} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={12}>
      {payload.value}
    </text>
  );
}

function YAxisTick({ x, y, payload }) {
  return (
    <text x={x} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize={12}>
      {payload.value / 1000}K
    </text>
  );
}

export default function RevenueChart() {
  const [period, setPeriod] = useState("Music");

  return (
    <div
      className="rounded-3xl p-6 bg-card-gradient"
      
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <p className="text-white/70 text-sm mb-1">My Revenue</p>
          <div className="flex items-center gap-3">
            <span className="text-white text-3xl font-bold">$50.8K</span>
            <span className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
              28.4% <ArrowUpRight size={12} />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap">
          <span className="flex items-center gap-2 text-white/80 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            Revenue
          </span>

          <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  period === p
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="month"
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
              tick={<CustomTick />}
            />

            <YAxis
              domain={[0, 100000]}
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              axisLine={false}
              tickLine={false}
              tick={<YAxisTick />}
            />

            <Bar
              dataKey="revenue"
              shape={<CustomBar />}
              background={{ fill: "transparent" }}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


