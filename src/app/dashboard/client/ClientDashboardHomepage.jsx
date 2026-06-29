"use client";

import { Rocket } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  Open: "#FFBF00",
  "In Progress": "#0369a1",
  Completed: "#15803d",
};

export default function ClientDashboardHomePage({ stats, name }) {
  const { total, open, inProgress, completed, totalSpent } = stats;

  const chartData = [
    { name: "Open", value: open },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Welcome */}
      <div className="rounded-2xl p-5" style={{ background: "#0f172a" }}>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Welcome back
        </p>
        <h2 className="text-xl flex  gap-2 font-bold text-white mt-1">{name} <Rocket/></h2>
        <p className="text-sm text-gray-400 mt-1">
          Here's a summary of your posted tasks
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", value: total, color: "#0f172a" },
          { label: "Open Tasks", value: open, color: "#FFBF00" },
          { label: "In Progress", value: inProgress, color: "#0369a1" },
          { label: "Total Spent", value: `$${totalSpent}`, color: "#15803d" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 flex flex-col gap-1"
            style={{ background: "#f1f5f9" }}
          >
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-2xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl p-6 bg-white border border-neutral-100">
        <h3 className="text-base font-bold mb-6" style={{ color: "#0f172a" }}>
          Task Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} barSize={48}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "#f1f5f9" }}
              contentStyle={{
                background: "#0f172a",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="value"  radius={[8, 8, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}