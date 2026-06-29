import { Users, UserRound, BriefcaseBusiness, ShieldBan } from "lucide-react";
import { serverFetch } from "@/lib/core/server";
import ManageUsersTable from "./ManageUsersTable";

export const metadata = {
  title: "Manage Users | SkillSwap",
  description: "Manage all platform users.",
};

async function getUsers() {
  const users = await serverFetch("/api/users");
  return users || [];
}

export default async function ManageUsersPage() {
  const users = await getUsers();

  const totalUsers = users.length;
  const totalClients = users.filter((u) => u.role === "client").length;
  const totalFreelancers = users.filter(
    (u) => u.role === "freelancer"
  ).length;
  const totalBlocked = users.filter((u) => u.isBlocked).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      bg: "bg-green-100",
      color: "text-green-700",
    },
    {
      title: "Clients",
      value: totalClients,
      icon: UserRound,
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Freelancers",
      value: totalFreelancers,
      icon: BriefcaseBusiness,
      bg: "bg-emerald-100",
      color: "text-emerald-700",
    },
    {
      title: "Blocked",
      value: totalBlocked,
      icon: ShieldBan,
      bg: "bg-red-100",
      color: "text-red-700",
    },
  ];

  return (
    <section className="space-y-8 p-4">

      <div>
        <h1 className="text-3xl font-bold text-[#0f1a0f]">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-600 max-w-2xl">
          View all platform accounts, block suspicious users,
          unblock trusted users and monitor user activity.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
            >
              <item.icon className={item.color} size={22} />
            </div>

            <h3 className="mt-5 text-sm text-gray-500">
              {item.title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <ManageUsersTable users={users} />
    </section>
  );
}