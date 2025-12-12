// src/components/TaskList/TaskItem.tsx
import React from "react";
import type { TaskItemProps } from "../../types";

const statusLabel: Record<string, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
  isDarkMode,
}) => {
  const handleToggleClick = () => onToggleStatus(task.id);
  const handleDeleteClick = () => onDelete(task.id);

  const cardClass = isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white";
  const descClass = isDarkMode ? "text-slate-300" : "text-slate-600";
  const metaClass = isDarkMode ? "text-slate-400" : "text-slate-500";
  const btnClass = isDarkMode
    ? "border-slate-600 text-slate-100 hover:bg-slate-700"
    : "border-slate-300 text-slate-700 hover:bg-slate-100";

  return (
    <li
      className={`flex items-start justify-between rounded-lg p-4 shadow-sm transition hover:shadow-md ${cardClass}`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{task.title}</h3>

          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-700"
                : task.priority === "medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
        </div>

        <p className={`text-xs ${descClass}`}>{task.description}</p>

        <div className={`flex flex-wrap gap-3 text-[11px] ${metaClass}`}>
          <span>Status: {statusLabel[task.status]}</span>

          <span>
            Created:{" "}
            {new Date(task.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "2-digit",
            })}
          </span>

          {task.dueDate && <span>Due: {task.dueDate}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleToggleClick}
          className={`rounded-full border px-3 py-1 text-[11px] font-medium ${btnClass}`}
        >
          Next Status
        </button>

        <button
          type="button"
          onClick={handleDeleteClick}
          className="rounded-full border border-red-300 px-3 py-1 text-[11px] font-medium text-red-700 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
