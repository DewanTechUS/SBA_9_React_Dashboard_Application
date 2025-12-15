import type { Task, TaskFilters, TaskSortBy, TaskStats, TaskPriority } from "../types";

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

export function applySort(tasks: Task[], sortBy: TaskSortBy): Task[] {
  const copy = [...tasks];

  copy.sort((a, b) => {
    switch (sortBy) {
      case "created-newest":
        return b.createdAt - a.createdAt;
      case "created-oldest":
        return a.createdAt - b.createdAt;
      case "due-soon":
        return (a.dueDate || "").localeCompare(b.dueDate || "");
      case "due-late":
        return (b.dueDate || "").localeCompare(a.dueDate || "");
      case "priority-high":
        return priorityWeight(b.priority) - priorityWeight(a.priority);
      case "priority-low":
        return priorityWeight(a.priority) - priorityWeight(b.priority);
      default:
        return 0;
    }
  });

  return copy;
}

function priorityWeight(priority: TaskPriority): number {
  if (priority === "low") return 1;
  if (priority === "medium") return 2;
  return 3;
}
export function getTaskStats(tasks: Task[]): TaskStats {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  return { total, todo, inProgress, done };
}