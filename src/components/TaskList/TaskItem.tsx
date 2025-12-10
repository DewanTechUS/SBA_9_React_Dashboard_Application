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
      <div>
        <h3 className="text-sm font-semibold">{task.title}</h3>
        <p className="text-xs text-slate-600">{task.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={() => onToggleStatus(task.id)}>Next Status</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};
