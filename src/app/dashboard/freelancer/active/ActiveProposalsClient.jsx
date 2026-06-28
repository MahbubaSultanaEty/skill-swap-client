"use client";

import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { serverMutation } from "@/lib/core/server";


export default function ActiveProjectsClient({ active, completed }) {
  const [deliverableUrls, setDeliverableUrls] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const handleDeliver = async (proposal) => {
    const url = deliverableUrls[proposal._id];
    if (!url) return;

    setLoadingId(proposal._id);

    await serverMutation(
      `/api/proposals/${proposal._id}/status`,
      {
        status: "Completed",
        deliverableUrl: url,
        completionDate: new Date().toISOString(),
      },
      "PATCH"
    );

    await serverMutation(
      `/api/tasks/${proposal.taskId}/status`,
      {
        status: "Completed",
        deliverable_url: url,
      },
      "PATCH"
    );

    setLoadingId(null);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Active */}
      <div>
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: "#0f172a" }}>
          <Clock size={16} style={{ color: "#92400e" }} />
          In Progress
        </h2>

        {active.length === 0 ? (
          <div className="rounded-2xl border border-neutral-100 bg-white p-8 text-center">
            <p className="text-sm text-gray-400">No active projects right now</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {active.map((proposal) => (
              <div
                key={proposal._id}
                className="rounded-2xl border border-neutral-100 bg-white p-5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold" style={{ color: "#0f172a" }}>
                      {proposal.taskTitle}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Client: {proposal.clientName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Chip size="sm" style={{ background: "#fef3c7", color: "#92400e" }}>
                      In Progress
                    </Chip>
                    <span className="text-sm font-bold" style={{ color: "#15803d" }}>
                      ${proposal.proposedBudget}
                    </span>
                  </div>
                </div>

                {/* Deliver Form */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Enter deliverable URL (GitHub, Docs, etc.)"
                    value={deliverableUrls[proposal._id] || ""}
                    onChange={(e) =>
                      setDeliverableUrls((prev) => ({
                        ...prev,
                        [proposal._id]: e.target.value,
                      }))
                    }
                    className="flex-1 text-sm px-4 py-2 rounded-xl border border-neutral-200 outline-none"
                    style={{ color: "#0f172a" }}
                  />
                  <Button
                    isDisabled={!deliverableUrls[proposal._id] || loadingId === proposal._id}
                    isLoading={loadingId === proposal._id}
                    onPress={() => handleDeliver(proposal)}
                    style={{ background: "#15803d", color: "#fff" }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: "#0f172a" }}>
          <CheckCircle size={16} style={{ color: "#15803d" }} />
          Completed
        </h2>

        {completed.length === 0 ? (
          <div className="rounded-2xl border border-neutral-100 bg-white p-8 text-center">
            <p className="text-sm text-gray-400">No completed projects yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {completed.map((proposal) => (
              <div
                key={proposal._id}
                className="rounded-2xl border border-green-100 bg-white p-5 flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold" style={{ color: "#0f172a" }}>
                    {proposal.taskTitle}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Client: {proposal.clientName}
                  </p>
                  {proposal.completionDate && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Completed:{" "}
                      {new Date(proposal.completionDate).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold" style={{ color: "#15803d" }}>
                    ${proposal.proposedBudget}
                  </span>
                  <Chip size="sm" style={{ background: "#dcfce7", color: "#15803d" }}>
                    Completed
                  </Chip>
                  {proposal.deliverableUrl && (
                    <Link
                      href={proposal.deliverableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: "#15803d" }}
                    >
                      <ExternalLink size={13} />
                      View
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}