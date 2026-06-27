import TaskListingContainer from "@/components/tasks/TaskListingContainer";
import {  getTasks } from "@/lib/api/task";


export const metadata = {
  title: "Browse Tasks | SkillSwap",
  description:
    "Explore available freelance micro-tasks across Development, Design, Writing, Marketing and more.",
  keywords: "freelance, tasks, micro-tasks, development, design, writing, marketing",
  openGraph: {
    title: "Browse Tasks | SkillSwap",
    description: "Find the perfect task that matches your skills.",
    type: "website",
  },
};


export default async function BrowseTasksPage({ searchParams }) {
  const sp = await searchParams;

  const query = new URLSearchParams();
  if (sp.search) query.set("search", sp.search);
  if (sp.category) query.set("category", sp.category);
  if (sp.status) query.set("status", sp.status);
  if (sp.budget) query.set("budget", sp.budget);
  if (sp.page) query.set("page", sp.page);

  const filters = {
    search: sp.search || "",
    category: sp.category || "",
    status: sp.status || "",
    budget: sp.budget || "",
    page: Number(sp.page) || 1,
  };

    const { tasks, total } = await getTasks(query.toString());
    // console.log("tasks",tasks);

  return (
    <main className="min-h-screen" style={{ background: "#f8faf8" }}>
      <div className="max-w-7xl mx-auto px-4 py-10 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "#14532d" }}>
            Browse <span style={{ color: "#15803d" }}>Tasks</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Find the perfect task that matches your skills
          </p>
        </div>
        <TaskListingContainer tasks={tasks} total={total} initialFilters={filters} />
      </div>
    </main>
  );
}