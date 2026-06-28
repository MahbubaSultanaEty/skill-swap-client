// components/dashboard/freelancer/ProposalsTable.jsx

"use client";

import { Table, Chip } from "@heroui/react";

const STATUS_STYLE = {
  pending: { background: "#fef3c7", color: "#92400e" },
  Accepted: { background: "#dcfce7", color: "#15803d" },
  Rejected: { background: "#fee2e2", color: "#991b1b" },
  Completed: { background: "#e0f2fe", color: "#0369a1" },
};

export default function ProposalsTable({ proposals }) {
  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold" style={{ color: "#0f172a" }}>
          No proposals yet
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Browse tasks and submit your first proposal
        </p>
      </div>
    );
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="My Proposals" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Task Title</Table.Column>
            <Table.Column>Budget Bid</Table.Column>
            <Table.Column>Est. Days</Table.Column>
            <Table.Column>Date Sent</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            {proposals.map((proposal) => (
              <Table.Row key={proposal._id}>
                <Table.Cell>
                  <span className="font-medium" style={{ color: "#0f172a" }}>
                    {proposal.taskTitle}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="font-semibold" style={{ color: "#15803d" }}>
                    ${proposal.proposedBudget}
                  </span>
                </Table.Cell>
                <Table.Cell>{proposal.estimatedDays} days</Table.Cell>
                <Table.Cell>
                  {new Date(proposal.submittedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Table.Cell>
                <Table.Cell>
                  <Chip
                    size="sm"
                    style={STATUS_STYLE[proposal.status] || STATUS_STYLE["pending"]}
                  >
                    {proposal.status}
                  </Chip>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}