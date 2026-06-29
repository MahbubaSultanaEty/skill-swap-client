import { serverFetch } from "@/lib/core/server";
import ManageTasksTable from "./ManageTaskTable";

export default async function Page({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 1000;

 const getTasks = async (params = {}) => {
  return serverFetch(
    `/api/tasks?page=${params.page || 1}&perPage=${params.perPage || 1000}`
  );
};
  const data = await getTasks();

    // console.log(data);
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Manage Tasks</h1>
        <p className="text-gray-500">
          View and manage all platform tasks. Admin can delete tasks that violate rules.
        </p>

        <p className="font-semibold text-right text-xs text-[#92400e]  bg-green-100 border-2 rounded-2xl p-2">
          Total {data.total} task
        </p>
      </div>

      

      {/* TABLE */}
      <ManageTasksTable tasks={data.tasks || []} />
    </div>
  );
}