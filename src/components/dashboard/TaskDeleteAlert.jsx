"use client";

import { serverMutation } from "@/lib/core/server";
import {AlertDialog, Button} from "@heroui/react";

export function TaskDeleteAlert({ task }) {
    
  const handleDelete = async (id) => {
    const res = await serverMutation(`/api/tasks/${id}`, {}, "DELETE");
    if (res?.success) {
      toast.success("Task deleted");
      setTaskList((prev) => prev.filter((t) => t._id !== id));
    } else {
      toast.error("Failed to delete task");
    }
  };


  return (
    <AlertDialog>
      <Button variant="danger">Delete Task</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete task permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}