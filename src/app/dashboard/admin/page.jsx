import { getUsers } from "@/lib/api/user";
import { getTasks } from "@/lib/api/task";
import { getPayments } from "@/lib/api/payment";
import AdminDashboardOverviewChart from "./AdminDashboardOverviewChart";

export default async function Page() {
  const users = await getUsers();

  const taskData = await getTasks("page=1&perPage=1000");

  const payments = await getPayments();

  const tasks = taskData.tasks || [];

  const totalUsers = users.length;

  const totalTasks = tasks.length;

  const activeTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-green-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, projects and platform performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard title="Total Users" value={totalUsers} />

        <StatCard title="Total Tasks" value={totalTasks} />

        <StatCard title="Total Revenue" value={`$${totalRevenue}`} />

        <StatCard title="Active Tasks" value={activeTasks} />

      </div>

      <AdminDashboardOverviewChart
        totalUsers={totalUsers}
        totalTasks={totalTasks}
        totalRevenue={totalRevenue}
        activeTasks={activeTasks}
      />

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-green-800 mt-2">
        {value}
      </h2>
    </div>
  );
}