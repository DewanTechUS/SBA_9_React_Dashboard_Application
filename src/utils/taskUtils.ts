// src/utils/taskUtils.ts
// Utility functions for filtering and sorting tasks
// https://ps-lms.vercel.app/curriculum/se/415/sba
import type { Task, TaskFilters } from "../types";

export function applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
  const { status, priority, query } = filters;
  const search = query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesSearch =
      search.length === 0 ||
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search);

    return matchesStatus && matchesPriority && matchesSearch;
  });
}