import { getUserSession } from "@/lib/core/session";
import ManageProposalsClient from "./ManageProposalsClient";
import { getProposalsByClientId } from "@/lib/api/proposals";

export const metadata = {
  title: "Manage Proposals | SkillSwap",
};

export default async function ManageProposalsPage() {
  const session = await getUserSession();
  const proposals = await getProposalsByClientId(session.id);

  const total = proposals.length;
  const pending = proposals.filter((p) => p.status === "pending").length;
  const accepted = proposals.filter((p) => p.status === "Accepted").length;
  const rejected = proposals.filter((p) => p.status === "Rejected").length;

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Manage Proposals
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Review and respond to freelancer proposals for your posted tasks
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {[
    { label: "Total", value: total, color: "#0f172a" },
    { label: "Pending", value: pending, color: "#FFBF00" },
    { label: "Accepted", value: accepted, color: "#15803d" },
    { label: "Rejected", value: rejected, color: "#D10000" },
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

      {/* Proposals */}
      <ManageProposalsClient proposals={proposals} />

    </div>
  );
}