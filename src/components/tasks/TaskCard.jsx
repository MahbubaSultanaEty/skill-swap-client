"use client";

import { useRouter } from "next/navigation";
import { Chip } from "@heroui/react";
import { Calendar, DollarSign, User } from "lucide-react";

const STATUS_COLOR = {
  open: { bg: "#dcfce7", text: "#15803d" },
  "In Progress": { bg: "#fef9c3", text: "#854d0e" },
  Completed: { bg: "#e0f2fe", text: "#0369a1" },
};

const CATEGORY_EMOJI = {
  Development: "💻",
  Design: "🎨",
  Writing: "✍️",
  Marketing: "📣",
  Other: "🔧",
};

export default function TaskCard({ task }) {
  const router = useRouter();
  const statusStyle = STATUS_COLOR[task.status] || STATUS_COLOR["open"];
  const emoji = CATEGORY_EMOJI[task.category] || "📌";
  const deadline = new Date(task.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      onClick={() => router.push(`/tasks/${task._id}`)}
      className="cursor-pointer rounded-2xl border border-green-100 p-5 flex flex-col gap-3 
                 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{ background: "#fff" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-xl">{emoji}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          {task.status}
        </span>
      </div>

      {/* Title */}
      <h2
        className="font-semibold text-base leading-snug line-clamp-2"
        style={{ color: "#14532d" }}
      >
        {task.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>

      {/* Footer */}
      <div className="mt-auto pt-2 border-t border-green-50 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <DollarSign size={12} />
          <span style={{ color: "#15803d", fontWeight: 600 }}>
            ${task.budget}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {deadline}
        </span>
        <span className="flex items-center gap-1">
          <User size={12} />
          {task.clientName}
        </span>
      </div>
    </div>
  );
}