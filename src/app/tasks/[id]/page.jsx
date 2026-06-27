import { notFound } from "next/navigation";
import TaskDetailsClient from "@/components/tasks/TaskDetailsClient";
import { getTaskById } from "@/lib/api/task";


export async function generateMetadata({ params }) {
  const { id } = await params;
  const task = await getTaskById(id);
  if (!task) return { title: "Task Not Found | SkillSwap" };

  return {
    title: `${task.title} | SkillSwap`,
    description: task.description?.slice(0, 155),
    openGraph: {
      title: task.title,
      description: task.description?.slice(0, 155),
      type: "website",
    },
  };
}

export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
    const task = await getTaskById(id);
    // console.log("task",task);
  if (!task) notFound();

  return <TaskDetailsClient task={task} />;
}