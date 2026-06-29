"use client";

import { Table } from "@heroui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { serverMutation } from "@/lib/core/server";

export default function ManageTasksTable({ tasks }) {
    console.log(tasks);
  const [taskList, setTaskList] = useState(tasks);

  const handleDelete = async (id) => {
    const res = await serverMutation(
      `/api/tasks/${id}`,
      {},
      "DELETE"
    );

    if (res?.success) {
      toast.success("Task deleted");
      setTaskList((prev) => prev.filter((t) => t._id !== id));
    } else {
      toast.error("Failed to delete task");
    }
  };

  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Tasks Table" className="min-w-[700px]">
          <Table.Header>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Budget</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Action</Table.Column>
          </Table.Header>

          <Table.Body>
            {taskList.map((task) => (
              <Table.Row key={task._id}>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.category}</Table.Cell>
                <Table.Cell>${task.budget}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>

                <Table.Cell>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}