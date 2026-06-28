"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { Table } from "@heroui/react";
import { Calendar, Clock, DollarSign, User } from "lucide-react";
import { serverMutation } from "@/lib/core/server";

const STATUS_STYLE = {
  pending: { background: "#fef3c7", color: "#92400e" },
  Accepted: { background: "#dcfce7", color: "#15803d" },
  Rejected: { background: "#fee2e2", color: "#991b1b" },
  Completed: { background: "#e0f2fe", color: "#0369a1" },
};

export default function ManageProposalsClient({ proposals }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  
  const grouped = proposals.reduce((acc, proposal) => {
    const key = proposal.taskId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(proposal);
    return acc;
  }, {});

const handleStatusUpdate = async (proposal, status) => {
  if (status === "Accepted") {
    const taskProposals = grouped[proposal.taskId];
    const alreadyAccepted = taskProposals.some((p) => p.status === "Accepted");
    if (alreadyAccepted) return;
  }

  setLoadingId(proposal._id);

  await serverMutation(`/api/proposals/${proposal._id}/status`, { status }, "PATCH");

  if (status === "Accepted") {
    await serverMutation(`/api/tasks/${proposal.taskId}/status`, { status: "In Progress" }, "PATCH");
    // TODO: Stripe checkout
    // router.push(`/payment/checkout?proposalId=${proposal._id}&taskId=${proposal.taskId}&amount=${proposal.proposedBudget}`);
  }

  setLoadingId(null);
  window.location.reload();
};
  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-neutral-100 bg-white">
        <p className="text-lg font-semibold" style={{ color: "#0f172a" }}>
          No proposals yet
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Proposals from freelancers will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([taskId, taskProposals]) => {
        const hasAccepted = taskProposals.some((p) => p.status === "Accepted");

        return (
          <div
            key={taskId}
            className="rounded-2xl border border-neutral-100 bg-white overflow-hidden"
          >
            {/* Task Header */}
            <div
              className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between"
              style={{ background: "#f9fafb" }}
            >
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Task</p>
                <p className="font-bold" style={{ color: "#0f172a" }}>
                  {taskProposals[0]?.taskTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{taskProposals.length} proposal{taskProposals.length > 1 ? "s" : ""}</span>
                {hasAccepted && (
                  <Chip size="sm" style={{ background: "#dcfce7", color: "#15803d" }}>
                    Hired
                  </Chip>
                )}
              </div>
            </div>

            {/* Proposals Table */}
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Proposals" className="min-w-[700px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Freelancer</Table.Column>
                    <Table.Column>Budget Bid</Table.Column>
                    <Table.Column>Est. Days</Table.Column>
                    <Table.Column>Cover Note</Table.Column>
                    <Table.Column>Date</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Actions</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {taskProposals.map((proposal) => {
                      const isPending = proposal.status === "pending";
                      const isLoading = loadingId === proposal._id;

                      return (
                        <Table.Row key={proposal._id}>
                          <Table.Cell>
                            <span className="flex items-center gap-1.5 font-medium" style={{ color: "#0f172a" }}>
                              <User size={13} style={{ color: "#92400e" }} />
                              {proposal.freelancerName}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className="font-semibold" style={{ color: "#15803d" }}>
                              ${proposal.proposedBudget}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock size={12} />
                              {proposal.estimatedDays}d
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className="text-sm text-gray-500 line-clamp-1 max-w-[180px]">
                              {proposal.coverNote}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <span className="flex items-center gap-1 text-sm text-gray-400">
                              <Calendar size={12} />
                              {new Date(proposal.submittedAt).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                              })}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <Chip
                              size="sm"
                              style={STATUS_STYLE[proposal.status] || STATUS_STYLE["pending"]}
                            >
                              {proposal.status}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell>
                            {isPending && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  isDisabled={hasAccepted || isLoading}
                                  isLoading={isLoading}
                                  onPress={() => handleStatusUpdate(proposal, "Accepted")}
                                  style={{ background: "#15803d", color: "#fff" }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  isDisabled={isLoading}
                                  isLoading={isLoading}
                                  onPress={() => handleStatusUpdate(proposal, "Rejected")}
                                  style={{ background: "#fee2e2", color: "#991b1b" }}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        );
      })}
    </div>
  );
}