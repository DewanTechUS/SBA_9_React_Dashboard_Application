// src/components/TaskList/TaskItem.tsx
import React from "react";
import type { TaskItemProps } from "../../types";

const statusLabel: Record<string, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "done": "Done",
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
}) => {
  const handleToggleClick = () => {
    onToggleStatus(task.id);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  return (
    <li className="flex items-start justify-between rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{task.title}</h3>

          {/* This is my Priority badge */}
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

        <p className="text-xs text-slate-600">{task.description}</p>

        <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
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
          className="rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
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
