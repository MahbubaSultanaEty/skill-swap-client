import TaskCard from "@/components/tasks/TaskCard";
import { getTasks } from "@/lib/api/task";
import Link from "next/link";


export const metadata = {
  title: "Open Tasks | SkillSwap",
};

export default async function OpenTasksPage() {
  const { tasks } = await getTasks();
  const openTasks = tasks.filter((t) => t.status === "open");

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>
          Open Tasks
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Browse available tasks and submit your proposal
        </p>
      </div>

      {openTasks.length === 0 ? (
        <div className="rounded-2xl border border-neutral-100 bg-white p-12 text-center">
          <p className="text-sm text-gray-400">No open tasks available right now</p>
        </div>
      ) : (
        <>
          {/* <p className="text-sm text-gray-400">{openTasks.length} open tasks available</p> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {openTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
                      </div>
                       <div className="text-center mt-2">
                                <Link
                                  href="/tasks"
                                  className="inline-flex items-center justify-center px-6 py-3 border border-[#0f172a] text-base font-medium rounded-md text-[#92400e] bg-transparent hover:bg-[#15803d] hover:border-none hover:text-white transition-colors duration-200"
                                >
                                  Browse All Tasks &rarr;
                                </Link>
                              </div>
        </>
      )}
    </div>
  );
}