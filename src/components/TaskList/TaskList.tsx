// src/components/TaskList/TaskList.tsx
import React from "react";
import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
        No tasks match your filters. Try adding a new task or changing the filters.
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
