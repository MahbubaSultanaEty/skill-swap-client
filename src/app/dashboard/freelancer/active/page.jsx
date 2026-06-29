import { getUserSession } from "@/lib/core/session";
import ActiveProjectsClient from "./ActiveProposalsClient";
import { protectedFetch, serverFetch } from "@/lib/core/server";

async function getProposals(email) {
  const data = await protectedFetch(`/api/proposals?freelancerEmail=${email}`);
  return data || [];
}

export const metadata = {
  title: "Active Projects | SkillSwap",
};

export default async function ActiveProjectsPage() {
  const session = await getUserSession();
  const proposals = await getProposals(session.email);

  const active = proposals.filter((p) => p.status === "Accepted");
  const completed = proposals.filter((p) => p.status === "Completed");

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Active Projects
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Track your ongoing and completed projects
        </p>
      </div>

      {/* Stats */}
     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
  {[
    { label: "Active", value: active.length, color: "#FFBF00" },
    { label: "Completed", value: completed.length, color: "#15803d" },
    { label: "Total", value: active.length + completed.length, color: "#0f172a" },
  ].map((stat) => (
    <div
      key={stat.label}
      className="rounded-2xl p-4 flex flex-col gap-1"
      style={{ background: "#f1f5f9" }}
    >
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {stat.label}
      </span>
      <span className="text-3xl font-black" style={{ color: stat.color }}>
        {stat.value}
      </span>
    </div>
  ))}
</div>

      <ActiveProjectsClient active={active} completed={completed} />
    </div>
  );
}