"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { Calendar, DollarSign, User, Code2, Palette, PenLine, Megaphone, Wrench, Tag } from "lucide-react";

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

export default function TaskCard({ task }) {
  const statusStyle = STATUS_COLOR[task.status] || STATUS_COLOR["open"];
  const CategoryIcon = CATEGORY_ICON[task.category] || Tag;
  const deadline = new Date(task.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/tasks/${task._id}`}>
      <Card
        ispressable
        className="w-full border border-green-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        style={{ background: "#fff" }}
      >
        <Card.Header className="flex items-start justify-between gap-2 p-5 pb-0">
          <CategoryIcon size={20} style={{ color: "#15803d" }} />
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: statusStyle.bg, color: statusStyle.text }}
          >
            {task.status}
          </span>
        </Card.Header>

        <Card.Content className="flex flex-col gap-2 px-5 py-3">
          <h2
            className="font-semibold text-base leading-snug line-clamp-1"
            style={{ color: "#1a1919" }}
          >
            {task.title}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
        </Card.Content>

        <Card.Footer className="px-5 pb-5 pt-2 border-t border-green-50 flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <DollarSign size={12} />
            <span style={{ color: "#15803d", fontWeight: 600 }}>${task.budget}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {deadline}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {task.clientName}
          </span>
        </Card.Footer>
      </Card>
    </Link>
  );
}