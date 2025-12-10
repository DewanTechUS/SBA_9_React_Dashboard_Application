// src/components/TaskList/TaskItem.tsx
import React from "react";
import type { TaskItemProps } from "../../types";

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <li className="flex items-start justify-between rounded-lg bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{task.title}</h3>
        <p className="text-xs text-slate-600">{task.description}</p>

        <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
          <span>Status: {task.status}</span>
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
        <button onClick={() => onToggleStatus(task.id)}>Next Status</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};
