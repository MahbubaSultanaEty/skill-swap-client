"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const COLORS = {
  Users: "#0f172a",
  Tasks: "#92400e",
  Revenue: "#15803d",
  Active: "#0369a1",
};

export default function AdminDashboardOverviewChart({
  totalUsers,
  totalTasks,
  totalRevenue,
  activeTasks,
}) {

  const data = [
    {
      name: "Users",
      value: totalUsers,
    },
    {
      name: "Tasks",
      value: totalTasks,
    },
    {
      name: "Revenue",
      value: totalRevenue,
    },
    {
      name: "Active",
      value: activeTasks,
    },
  ];

  return (
    <div className="bg-white border rounded-xl p-6" style={{ borderColor: "#e5e7eb" }}>

      <h2 className="text-xl font-semibold mb-5" style={{ color: "#0f172a" }}>
        Platform Overview
      </h2>

      <div className="h-[360px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />

            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />

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

            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}