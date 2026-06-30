import { getTasks } from "@/lib/api/task";

import { Users, ClipboardList, DollarSign, Activity } from "lucide-react";
import { getPayments } from "@/lib/api/payments";
import { getUsers } from "@/lib/api/users";
import AdminDashboardOverviewChart from "@/components/dashboard/AdminDashboardOverviewChart";


export const metadata = {
  title: "Overview | Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const users = await getUsers();
  const taskData = await getTasks("page=1&perPage=1000");
  const payments = await getPayments();

  const tasks = taskData?.tasks || [];

  const totalUsers = users?.length || 0;
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => t.status === "In Progress").length;
  const totalRevenue = (payments || []).reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users, color: "#0f172a" },
    { label: "Total Tasks", value: totalTasks, icon: ClipboardList, color: "#92400e" },
    { label: "Total Revenue", value: `$${totalRevenue}`, icon: DollarSign, color: "#15803d" },
    { label: "Active Tasks", value: activeTasks, icon: Activity, color: "#0369a1" },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
          Monitor users, tasks, and platform performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl p-6 transition-all hover:shadow-md"
            style={{ background: "#f1f5f9" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ background: "#fff" }}
              >
                <Icon size={20} color={color} />
              </div>
            </div>
            <p className="text-sm" style={{ color: "#64748b" }}>{label}</p>
            <h2 className="mt-1 text-3xl font-bold" style={{ color }}>
              {value}
            </h2>
          </div>
        ))}
      </div>

      <div>
        <AdminDashboardOverviewChart
          totalUsers={totalUsers}
          activeTasks={activeTasks}
          totalRevenue={totalRevenue}
          totalTasks={totalTasks}
        />
      </div>
    </div>
  );
}