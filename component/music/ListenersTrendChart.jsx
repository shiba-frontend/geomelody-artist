"use client";
// npm install recharts

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DATA = [
  { month: "Jan", listeners: 53 },
  { month: "Feb", listeners: 28 },
  { month: "Mar", listeners: 29 },
  { month: "Apr", listeners: 77 },
  { month: "May", listeners: 74 },
  { month: "Jun", listeners: 88 },
];

const LINE_COLOR = "#8b93f0";

function CustomDot(props) {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#1a0f2e"
      stroke={LINE_COLOR}
      strokeWidth={2}
    />
  );
}

function CustomActiveDot(props) {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill={LINE_COLOR}
      stroke="#1a0f2e"
      strokeWidth={2}
    />
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#2a1440] border border-white/10 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-white/50 text-xs mb-1">{label}</p>
      <p className="text-white text-sm font-semibold">
        {payload[0].value}K listeners
      </p>
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <svg width="20" height="12" viewBox="0 0 20 12">
        <line x1="0" y1="6" x2="20" y2="6" stroke={LINE_COLOR} strokeWidth="2" />
        <circle cx="10" cy="6" r="3" fill="#1a0f2e" stroke={LINE_COLOR} strokeWidth="2" />
      </svg>
      <span className="text-white/70 text-sm">Listeners</span>
    </div>
  );
}

export default function ListenersTrendChart() {
  return (
    <div
      className="rounded-3xl p-6 border border-white/5 bg-card-gradient"
      
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.12)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 13 }}
              padding={{ left: 10, right: 10 }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 13 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />

            <Line
              type="monotone"
              dataKey="listeners"
              stroke={LINE_COLOR}
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={<CustomActiveDot />}
            />

            <Legend content={<CustomLegend />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
