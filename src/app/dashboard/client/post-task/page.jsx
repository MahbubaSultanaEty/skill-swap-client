export const metadata = {
  title: "Post a Task | SkillSwap",
  description: "Create a new task and hire freelancers",
};

import { getUserSession } from "@/lib/core/session";
import PostTaskForm from "./PostTaskForm";

const PostTaskPage = async() => {
  const user = await getUserSession();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post a New Task</h1>

      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <PostTaskForm client={ user} />
      </div>
    </div>
  );
};

export default PostTaskPage;
