"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Input,
  Label,
  Description,
  FieldError,
  Button,
  Select,
  ListBox,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBoxItem,
  TextArea,
} from "@heroui/react";

import { toast } from "react-toastify";
import { createTask } from "@/lib/actions/task";
import { useRouter } from "next/navigation";

const PostTaskForm = ({ client }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        title: form.title,
        category: form.category,
        description: form.description,
        budget: Number(form.budget),
        deadline: form.deadline,
        clientId: client?.id || client?._id,
        clientEmail: client?.email,
        clientName: client?.name || "",
        status: "open",
        deliverable_url: "",
        createdAt: new Date().toISOString(),
      };

      await createTask(taskData);

      toast.success("Task posted successfully!");

      setForm({
        title: "",
        category: "",
        description: "",
        budget: "",
        deadline: "",
      });

      router.push("/dashboard/client/my-tasks");
    } catch (err) {
      toast.error(err.message || "Failed to post task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">

      {/* TITLE */}
      <TextField>
        <Label>Task Title</Label>
        <Input
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title"
        />
        <Description>Give a clear and short title</Description>
        <FieldError />
      </TextField>

      {/* CATEGORY (STABLE FIX - NO onSelectionChange BUG) */}
      <TextField>
        <Label>Category</Label>

        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="" >Select category</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Development">Development</option>
          <option value="Marketing">Marketing</option>
          <option value="Other">Other</option>
        </select>

        <Description>Select task category</Description>
        <FieldError />
      </TextField>

      {/* DESCRIPTION */}
      <TextField>
        <Label>Description</Label>
        <TextArea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe your task"
        />
        <Description>Explain what you need clearly</Description>
        <FieldError />
      </TextField>

      {/* BUDGET */}
      <TextField>
        <Label>Budget (USD)</Label>
        <Input
          type="number"
          value={form.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
        />
        <Description>Set your budget</Description>
        <FieldError />
      </TextField>

      {/* DEADLINE */}
      <TextField>
        <Label>Deadline</Label>
        <Input
          type="date"
          value={form.deadline}
          onChange={(e) => handleChange("deadline", e.target.value)}
        />
        <FieldError />
      </TextField>

      {/* SUBMIT */}
      <Button
        type="submit"
        isLoading={loading}
        className="w-full bg-black text-white"
      >
        Post Task
      </Button>
    </Form>
  );
};

export default PostTaskForm;