"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import { SlidersHorizontal, Briefcase } from "lucide-react";
import TaskCard from "./TaskCard";


const CATEGORIES = ["Development", "Design", "Writing", "Marketing", "Other"];
const STATUSES = ["open", "In Progress", "Completed"];
const BUDGET_RANGES = [
  { label: "Under $150", value: "0-150" },
  { label: "$150 – $300", value: "150-300" },
  { label: "$300 – $500", value: "300-500" },
  { label: "$500+", value: "500-99999" },
];

const PER_PAGE = 9;

export default function TaskListingContainer({ tasks = [], total = 0, initialFilters }) {
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: initialFilters.search || "",
    category: initialFilters.category || "",
    status: initialFilters.status || "",
    budget: initialFilters.budget || "",
    page: Number(initialFilters.page) || 1,
  });

  const totalPages = Math.ceil(total / PER_PAGE);
  const startItem = (filters.page - 1) * PER_PAGE + 1;
  const endItem = Math.min(filters.page * PER_PAGE, total);

 
  useEffect(() => {
    const sp = new URLSearchParams();
    if (filters.search) sp.set("search", filters.search);
    if (filters.category) sp.set("category", filters.category);
    if (filters.status) sp.set("status", filters.status);
    if (filters.budget) sp.set("budget", filters.budget);
    sp.set("page", filters.page);
    router.push(`?${sp.toString()}`);
  }, [filters.search, filters.category, filters.status, filters.budget, filters.page]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ search: "", category: "", status: "", budget: "", page: 1 });
  };

  const hasFilter = filters.search || filters.category || filters.status || filters.budget;

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (filters.page > 3) pages.push("ellipsis");
    const start = Math.max(2, filters.page - 1);
    const end = Math.min(totalPages - 1, filters.page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (filters.page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div>
      {/* Filter Panel */}
      <div
        className="rounded-2xl border p-5 mb-6 space-y-4"
        style={{ borderColor: "#bbf7d0", background: "#fff" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#15803d" }}>
            <SlidersHorizontal size={15} />
            Filter Tasks
          </div>
          {hasFilter && (
            <button
              onClick={handleReset}
              className="text-xs transition-colors"
              style={{ color: "#15803d" }}
            >
              Reset all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm outline-none w-full sm:w-56"
            style={{ borderColor: "#bbf7d0", color: "#14532d" }}
          />

          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm outline-none cursor-pointer"
            style={{ borderColor: "#bbf7d0", color: filters.category ? "#14532d" : "#9ca3af" }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm outline-none cursor-pointer"
            style={{ borderColor: "#bbf7d0", color: filters.status ? "#14532d" : "#9ca3af" }}
          >
            <option value="">All Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Budget */}
          <select
            value={filters.budget}
            onChange={(e) => handleFilterChange("budget", e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm outline-none cursor-pointer"
            style={{ borderColor: "#bbf7d0", color: filters.budget ? "#14532d" : "#9ca3af" }}
          >
            <option value="">Any Budget</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-4">
        Showing {tasks.length > 0 ? `${startItem}–${endItem}` : "0"} of {total} tasks
      </p>

      {/* Grid */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "#dcfce7" }}
          >
            <Briefcase size={28} style={{ color: "#15803d" }} />
          </div>
          <h2 className="font-semibold text-lg mb-2" style={{ color: "#14532d" }}>
            No tasks found
          </h2>
          <p className="text-sm text-gray-400">Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="w-full mt-10">
              <Pagination.Summary>
                Showing {startItem}–{endItem} of {total} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={filters.page === 1}
                    onPress={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                  >
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === filters.page}
                        onPress={() => setFilters((prev) => ({ ...prev, page: p }))}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  )
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={filters.page === totalPages}
                    onPress={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                  >
                    <span>Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}