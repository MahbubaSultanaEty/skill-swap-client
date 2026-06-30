import { getUserSession } from "@/lib/core/session";
// import { getClientTasks } from "@/lib/api/task";
import ClientDashboardHomePage from "./ClientDashboardHomepage";
import { serverFetch } from "@/lib/core/server";

export const metadata = {
  title: "Overview | Client Dashboard",
};


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientTasks = async (clientId) => {
  console.log("calling:", `${baseUrl}/api/tasks/${clientId}`);
  const result = await serverFetch(`/api/tasks/${clientId}`);
  console.log("result:", result);
  return result;
};

export default async function ClientOverviewPage() {
  const user = await getUserSession();
  // console.log(user);

  const tasks = await getClientTasks(user?.id);
  console.log(tasks);
  

  const total = tasks.length;
  const open = tasks.filter((t) => t.status === "open").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const totalSpent = tasks
    .filter((t) => t.status === "Completed" || t.status === "In Progress")
    .reduce((sum, t) => sum + Number(t.budget || 0), 0);

  const stats = { total, open, inProgress, completed, totalSpent };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Overview
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Your task activity at a glance
        </p>
      </div>
      <ClientDashboardHomePage stats={stats} name={user?.name} />
    </div>
  );
}