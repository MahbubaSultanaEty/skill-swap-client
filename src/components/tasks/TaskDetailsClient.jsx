"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import {
  Calendar, DollarSign, User, Mail, Clock,
  Code2, Palette, PenLine, Megaphone, Wrench, Tag, ArrowLeft,
  ArrowBigRight,
} from "lucide-react";

const STATUS_COLOR = {
  open: { bg: "#dcfce7", text: "#15803d" },
  "In Progress": { bg: "#fef9c3", text: "#854d0e" },
  Completed: { bg: "#e0f2fe", text: "#0369a1" },
};

const CATEGORY_ICON = {
  Development: Code2,
  Design: Palette,
  Writing: PenLine,
  Marketing: Megaphone,
  Other: Wrench,
};

export default function TaskDetailsClient({ task }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  
  const isOpen = task.status === "open";
  const canPropose = isOpen;

  const statusStyle = STATUS_COLOR[task.status] || STATUS_COLOR["open"];
  const CategoryIcon = CATEGORY_ICON[task.category] || Tag;

  const deadline = new Date(task.deadline).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
  const postedAt = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <main className="min-h-screen py-10 px-4 " style={{ background: "#f8faf8" }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm w-fit"
          style={{ color: "#15803d" }}
        >
          <ArrowLeft size={16} />
          Back to Tasks
        </button>

        {/* Header */}
        <div className="rounded-2xl border border-green-100 p-6" style={{ background: "#fff" }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "#dcfce7" }}
              >
                <CategoryIcon size={22} style={{ color: "#15803d" }} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{task.category}</p>
                <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>
                  {task.title}
                </h1>
              </div>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: statusStyle.bg, color: statusStyle.text }}
            >
              {task.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-5 mt-5 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <DollarSign size={14} style={{ color: "#92400e" }} />
              <span className="font-semibold" style={{ color: "#92400e" }}>{task.budget}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> Deadline: {deadline}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> Posted: {postedAt}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-green-100 p-6" style={{ background: "#fff" }}>
          <h2 className="font-semibold mb-3" style={{ color: "#14532d" }}>Task Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {task.description}
          </p>
        </div>

        {/* Client Info */}
        <div className="rounded-2xl border border-green-100 p-6" style={{ background: "#f8fafc" }}>
          <h2 className="font-semibold mb-4" style={{ color: "#14532d" }}>Client Info</h2>
          <div className="flex items-center gap-4">
            {task.clientImage ? (
              <img
                src={task.clientImage}
                alt={task.clientName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: "#15803d" }}
              >
                {task.clientName?.[0]}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#92400e" }}>
                <User size={14} /> {task.clientName}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Mail size={12} /> {task.clientEmail}
              </span>
            </div>
          </div>
        </div>

        {/* Proposal CTA */}
        <div
          className="rounded-2xl border border-green-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: "#fff" }}
        >
          <div>
            <p className="font-semibold" style={{ color: "#0f172a" }}>
              Interested in this task?
            </p>
            <p className="text-sm text-gray-400 mt-0.5">
              {!isOpen
                ? `Task is ${task.status} — no longer accepting proposals`
                : "Submit your proposal and get hired"}
            </p>
          </div>

          <Button
            isDisabled={!canPropose}
            onPress={() => router.push(`/tasks/${task._id}/proposal`)}
            style={canPropose ? { background: "#15803d", color: "#fff" } : {}}
          >
          <ArrowBigRight />  Proposal 
          </Button>
        </div>

      </div>
    </main>
  );
}