import { getUserSession } from "@/lib/core/session";
import ProposalsTable from "./ProposalsTable";
import { serverFetch } from "@/lib/core/server";

async function getProposals(email) {
  const data = await serverFetch(`/api/proposals?freelancerEmail=${email}`);
  return data || [];
}

export const metadata = {
  title: "My Proposals | SkillSwap",
};

export default async function MyProposalsPage() {
  const session = await getUserSession();
  const proposals = await getProposals(session.email);

  const pending = proposals.filter((p) => p.status === "pending").length;
  const accepted = proposals.filter((p) => p.status === "Accepted").length;
  const rejected = proposals.filter((p) => p.status === "Rejected").length;

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          My Proposals
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Track all your submitted proposals and their current status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
        {[
          { label: "Total", value: proposals.length, color: "#0f172a" },
          { label: "Pending", value: pending,  color: "#FFBF00" },
          { label: "Accepted", value: accepted,  color: "#15803d" },
          { label: "Rejected", value: rejected,  color: "#D10000" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 flex flex-col gap-1 border border-neutral-100"
            style={{ background: stat.bg }}
          >
            <span className="text-xs font-semibold text-[#92400e] uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-3xl font-black" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-4">
        <ProposalsTable proposals={proposals} />
      </div>

    </div>
  );
}