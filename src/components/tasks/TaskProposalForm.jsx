
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@heroui/react";
import { DollarSign, Clock, FileText, Send } from "lucide-react";
import { submitProposal } from "@/lib/actions/proposals";

export default function TaskProposalForm({
  taskId,
  taskTitle,
  clientName,
  clientEmail,
  freelancerId,
  freelancerName,
    freelancerEmail,
  clientId
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    proposedBudget: "",
    estimatedDays: "",
    coverNote: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.proposedBudget || !form.estimatedDays || !form.coverNote) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await submitProposal({
        taskId,
        taskTitle,
          clientName,
        clientId,
        clientEmail,
        freelancerId,
        freelancerName,
        freelancerEmail,
        proposedBudget: Number(form.proposedBudget),
        estimatedDays: Number(form.estimatedDays),
        coverNote: form.coverNote,
        status: "pending",
        submittedAt: new Date().toISOString(),
      });
      toast.success("Proposal submitted successfully!");
    //   router.push("/dashboard/freelancer/proposals");
    } catch (err) {
      toast.error(err.message || "Failed to submit proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Proposed Budget */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#92400e" }}>
          <DollarSign size={14} /> Proposed Budget (USD)
        </label>
        <input
          type="number"
          min="1"
          placeholder="e.g. 150"
          value={form.proposedBudget}
          onChange={(e) => handleChange("proposedBudget", e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all"
          style={{ borderColor: "#dcfce7", background: "#f8faf8", color: "#14532d" }}
          onFocus={(e) => (e.target.style.borderColor = "#86efac")}
          onBlur={(e) => (e.target.style.borderColor = "#dcfce7")}
        />
      </div>

      {/* Estimated Days */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#92400e" }}>
          <Clock size={14} /> Estimated Days to Complete
        </label>
        <input
          type="number"
          min="1"
          placeholder="e.g. 3"
          value={form.estimatedDays}
          onChange={(e) => handleChange("estimatedDays", e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all"
          style={{ borderColor: "#dcfce7", background: "#f8faf8", color: "#14532d" }}
          onFocus={(e) => (e.target.style.borderColor = "#86efac")}
          onBlur={(e) => (e.target.style.borderColor = "#dcfce7")}
        />
      </div>

      {/* Cover Note */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#92400e" }}>
          <FileText size={14} /> Cover Note
        </label>
        <textarea
          rows={5}
          placeholder="Explain why you're the best fit for this task..."
          value={form.coverNote}
          onChange={(e) => handleChange("coverNote", e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all resize-none"
          style={{ borderColor: "#dcfce7", background: "#f8faf8", color: "#14532d" }}
          onFocus={(e) => (e.target.style.borderColor = "#86efac")}
          onBlur={(e) => (e.target.style.borderColor = "#dcfce7")}
        />
        <p className="text-xs" style={{ color: "#9ca3af" }}>{form.coverNote.length}/500 characters</p>
      </div>

      <Button
        type="submit"
        isLoading={loading}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white"
        style={{ background: "#15803d" }}
      >
        {!loading && <Send size={15} className="mr-2" />}
        Submit Proposal
      </Button>
    </form>
  );
}