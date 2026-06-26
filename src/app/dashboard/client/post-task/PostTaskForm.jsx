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

  // generic state update
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ১. ডাটাবেজ রিকোয়ারমেন্টের সব ফিল্ড একসাথে রেডি করা
      const taskData = {
        title: form.title,
        category: form.category,
        description: form.description,
        budget: Number(form.budget), // বাজেটকে স্ট্রিং থেকে পিওর নাম্বারে কনভার্ট করা হলো
        deadline: form.deadline,
        clientId: client?.id || client?._id, // আইডি ব্যাকআপ হ্যান্ডেল করা হলো
        clientEmail: client?.email,
        clientName: client?.name || "", // হোমপেজে নাম দেখানোর জন্য যুক্ত করা হলো
        status: "open", // রিকোয়ারমেন্ট অনুযায়ী ডিফল্ট ওপেন
        deliverable_url: "", // ইনিশিয়াল ফাঁকা স্ট্রিং
        createdAt: new Date().toISOString(), // টাস্ক তৈরির লাইভ টাইমস্ট্যাম্প
      };

      // ২. আগে সার্ভারে ডেটা পাঠানো নিশ্চিত করা
      await createTask(taskData); 

      // ৩. সাকসেস মেসেজ ও ফর্ম রিসেট
      toast.success("Task posted successfully!");
      
      setForm({
        title: "",
        category: "",
        description: "",
        budget: "",
        deadline: "",
      });
        
      // ৪. রিডাইরেকশন
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

      {/* CATEGORY - FIXED SELECT (SET BASED API) */}
      <Select
        selectedKeys={form.category ? new Set([form.category]) : new Set()}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          handleChange("category", value);
        }}
      >
        <Label>Category</Label>

        <SelectTrigger>
          <SelectValue placeholder="Select category" />
          <SelectIndicator />
        </SelectTrigger>

        <Description>Select task category</Description>

        <SelectPopover>
          <ListBox>
            <ListBoxItem key="Design">Design</ListBoxItem>
            <ListBoxItem key="Writing">Writing</ListBoxItem>
            <ListBoxItem key="Development">Development</ListBoxItem>
            <ListBoxItem key="Marketing">Marketing</ListBoxItem>
            <ListBoxItem key="Other">Other</ListBoxItem>
          </ListBox>
        </SelectPopover>

        <FieldError />
      </Select>

      {/* DESCRIPTION */}
      <TextField>
        <Label>Description</Label>
        <TextArea
          value={form.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
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
          placeholder="e.g. 50"
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
        <Description>Choose completion date</Description>
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