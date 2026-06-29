import { getUserSession } from "@/lib/core/session";
import FreelancerOverviewClient from "./FreelancerOverviewClient";
import { protectedFetch, serverFetch } from "@/lib/core/server";

async function getProposals(email) {
  const data = await protectedFetch(`/api/proposals?freelancerEmail=${email}`);
  return data || [];
}

export const metadata = {
  title: "Overview | Freelancer Dashboard",
};

export default async function FreelancerOverviewPage() {
  const user = await getUserSession();
  const proposals = await getProposals(user?.email);

  const total = proposals.length;
  const pending = proposals.filter((p) => p.status === "pending").length;
  const accepted = proposals.filter((p) => p.status === "Accepted").length;
  const rejected = proposals.filter((p) => p.status === "Rejected").length;
  const completed = proposals.filter((p) => p.status === "Completed").length;
  const totalEarnings = proposals
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + Number(p.proposedBudget), 0);

  const stats = { total, pending, accepted, rejected, completed, totalEarnings };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Overview
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Your freelance activity at a glance
        </p>
      </div>
      <FreelancerOverviewClient stats={stats} name={user?.name} />
    </div>
  );
}