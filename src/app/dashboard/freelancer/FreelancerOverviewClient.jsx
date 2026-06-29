"use client";

import { Rocket, WavesIcon } from "lucide-react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const COLORS = {
  Pending: "#FFBF00",
  Accepted: "#15803d",
  Rejected: "#D10000",
  Completed: "#0369a1",
};

export default function FreelancerOverviewClient({ stats, name }) {
  const { total, pending, accepted, rejected, completed, totalEarnings } = stats;

  const pieData = [
    { name: "Pending", value: pending },
    { name: "Accepted", value: accepted },
    { name: "Rejected", value: rejected },
    { name: "Completed", value: completed },
  ].filter((d) => d.value > 0);

  return (
    <div className="flex flex-col gap-6">

      {/* Welcome */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#0f172a" }}
      >
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Welcome back
        </p>
        <h2 className="text-xl font-bold flex items-center gap-2 text-white mt-1">{name} <Rocket/></h2>
        <p className="text-sm text-gray-400 mt-1">
          Here's a summary of your freelance activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Proposals", value: total, color: "#0f172a" },
          { label: "Pending", value: pending, color: "#FFBF00" },
          { label: "Accepted", value: accepted, color: "#15803d" },
          { label: "Total Earnings", value: `$${totalEarnings}`, color: "#0369a1" },
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

      {/* Pie Chart */}
      <div
        className="rounded-2xl p-6 bg-white border border-neutral-100"
      >
        <h3 className="text-base font-bold mb-6" style={{ color: "#0f172a" }}>
          Proposal Breakdown
        </h3>

        {pieData.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm text-gray-400">No proposals yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} proposals`, name]}
                contentStyle={{
                  background: "#0f172a",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "#64748b", fontSize: "12px" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}