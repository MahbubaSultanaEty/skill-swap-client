import { getClientTasks } from "@/lib/api/task";
import { getUserSession } from "@/lib/core/session";
import { Table, Chip, User } from "@heroui/react";
import Link from "next/link";

export const metadata = {
  title: "My Tasks Dashboard | Skill Swap",
  description: "Monitor stats, manage posted tasks, budgets, and track freelancers progress.",
};

export default async function MyTasksPage() {
  const user = await getUserSession();
  const currentClientId = user?.id; 
  const tasks = (await getClientTasks(currentClientId)) || [];
  console.log(tasks);

  // স্ট্যাটস ক্যালকুলেশন
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(t => t.status?.toLowerCase() === "in progress").length;
  const totalBudget = tasks.reduce((sum, t) => sum + Number(t.budget || 0), 0);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open": return "success";
      case "in progress": return "primary";
      case "completed": return "secondary";
      default: return "default";
    }
  };

  
  const handleDelete = async (formData) => {
    "use server";
    const taskId = formData.get("taskId");
    
    // এখানে তোমার ডিলিট এপিআই বা ডাটাবেজ কল হবে
    // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${taskId}`, { method: 'DELETE' });
    console.log("Deleting task with ID:", taskId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-neutral-50/50 min-h-screen">
      
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Task Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Monitor metrics, track hiring status, and check active deliverables.</p>
        </div>
        {/* <div className="flex gap-3">
          <button className="text-xs font-semibold bg-white border border-neutral-200 text-neutral-700 px-4 py-2.5 rounded-xl shadow-sm hover:bg-neutral-50 transition">Export History</button>
          <button className="text-xs font-semibold bg-green-950 text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-neutral-800 transition">+ Post New Task</button>
        </div> */}
      </div>

      {/* স্ট্যাটস কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Total Posted</p>
          <p className="text-2xl font-bold text-[#92400e] mt-2">{totalTasks} Tasks</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Active Progress</p>
          <p className="text-2xl font-bold text-[#92400e] mt-2">{inProgressTasks} Running</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Total Investment</p>
          <p className="text-2xl font-bold text-[#92400e] mt-2">${totalBudget}</p>
        </div>
      </div>

      {/* মেইন টেবিল */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-900">All Posted Projects</h2>
        </div>

        <Table aria-label="Client tasks detailed management dashboard" className="p-2">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header >
                <Table.Column isRowHeader>PROJECT DETAILS</Table.Column>
                <Table.Column>CATEGORY</Table.Column>
                <Table.Column>BUDGET</Table.Column>
                <Table.Column>POSTED DATE & DEADLINE</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column className="text-right">MANAGEMENT</Table.Column>
              </Table.Header>
              
              <Table.Body>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <Table.Row key={task._id} className="hover:bg-neutral-50/50 transition-colors">
                      <Table.Cell isRowHeader>
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-950 text-base">{task.title}</span>
                          <span className="text-xs text-neutral-400 mt-0.5">ID: {task._id?.substring(0, 8)}...</span>
                        </div>
                      </Table.Cell>
                      
                      <Table.Cell>
                        <Chip size="sm" variant="dot" color="default" className="border-neutral-200 text-neutral-600 font-medium">{task.category || "General"}</Chip>
                      </Table.Cell>
                      
                      <Table.Cell><span className="font-bold text-green-900">${task.budget}</span></Table.Cell>
                      
                      <Table.Cell>
                        <div className="flex flex-col text-xs gap-0.5">
                          <span className="text-neutral-500">Posted: {new Date(task?.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}) || "Recent"}</span>
                          <span className="text-danger-500 font-medium">Due: {task.deadline}</span>
                        </div>
                      </Table.Cell>                                 
                      
                      <Table.Cell>
                        <Chip className="capitalize font-semibold text-xs" color={getStatusColor(task.status)} size="sm" variant="flat">{task.status || "open"}</Chip>
                      </Table.Cell>
                      
                      {/* অ্যাকশন বাটন সেকশন */}
                      <Table.Cell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          
                          {/* ১. ডাইনামিক শো ডিটেইলস লিংক বাটন */}
                          <Link 
                            href={`/task/${task._id}`}
                            className="text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-xl transition"
                          >
                            Details
                          </Link>

                          {/* ২. রিভিউ সাবমিশন বাটন (যদি ডেলিভারেবল থাকে) */}
                          {task.deliverable_url && (
                            <a 
                              href={task.deliverable_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs font-semibold bg-success-500 text-white px-3 py-1.5 rounded-xl hover:bg-success-600 transition shadow-sm"
                            >
                              Review
                            </a>
                          )}

                          {/* ৩. ডিলিট বাটন (সার্ভার অ্যাকশন ফর্ম দিয়ে জটলা ছাড়া হ্যান্ডেল করা হয়েছে) */}
                          <form action={handleDelete}>
                            <input type="hidden" name="taskId" value={task._id} />
                            <button 
                              type="submit"
                              className="text-xs font-semibold bg-danger-50 text-danger-600 hover:bg-danger-100 px-3 py-1.5 rounded-xl transition"
                            >
                              Delete
                            </button>
                          </form>

                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell><span className="text-neutral-400">No projects initiated yet.</span></Table.Cell>
                    <Table.Cell></Table.Cell><Table.Cell></Table.Cell><Table.Cell></Table.Cell><Table.Cell></Table.Cell><Table.Cell></Table.Cell><Table.Cell></Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}