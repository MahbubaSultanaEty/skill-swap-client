import { protectedFetch, serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { Table, Chip } from "@heroui/react";

async function getCompletedProposals(email) {
  const data = await protectedFetch(`/api/proposals?freelancerEmail=${email}`);
  const proposals = data || [];
  return proposals.filter((p) => p.status === "Completed");
}

export const metadata = {
  title: "My Earnings | SkillSwap",
};

export default async function MyEarningsPage() {
  const user = await getUserSession();
  const completed = await getCompletedProposals(user?.email);

  const totalEarnings = completed.reduce((sum, p) => sum + Number(p.proposedBudget), 0);

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          My Earnings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Complete breakdown of your finished tasks and payments
        </p>
      </div>

      {/* Stats */}
     <div className="grid grid-cols-2 gap-4">
  <div
    className="rounded-2xl p-5 flex flex-col gap-1"
    style={{ background: "#0f172a" }}
  >
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
      Total Earned
    </span>
    <span className="text-3xl font-black" style={{ color: "#4ade80" }}>
      ${totalEarnings}
    </span>
  </div>
  <div
    className="rounded-2xl p-5 flex flex-col gap-1"
    style={{ background: "#0f172a" }}
  >
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
      Completed Tasks
    </span>
    <span className="text-3xl font-black text-white">
      {completed.length}
    </span>
  </div>
</div>

      {/* Table */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-4">
        {completed.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400">No completed tasks yet</p>
          </div>
        ) : (
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="My Earnings" className="min-w-[600px]">
                <Table.Header>
                  <Table.Column isRowHeader>Task Title</Table.Column>
                  <Table.Column>Client Name</Table.Column>
                  <Table.Column>Amount Made</Table.Column>
                  <Table.Column>Completion Date</Table.Column>
                </Table.Header>
                <Table.Body>
                  {completed.map((proposal) => (
                    <Table.Row key={proposal._id}>
                      <Table.Cell>
                        <span className="font-medium" style={{ color: "#0f172a" }}>
                          {proposal.taskTitle}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-gray-600">
                          {proposal.clientName}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="font-bold" style={{ color: "#15803d" }}>
                          ${proposal.proposedBudget}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-gray-400">
                          {proposal.completionDate
                            ? new Date(proposal.completionDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </div>

    </div>
  );
}