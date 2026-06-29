"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    <div className="bg-white border rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-5">
        Platform Overview
      </h2>

      <div className="h-[360px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8,8,0,0]}
              fill="#15803d"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}