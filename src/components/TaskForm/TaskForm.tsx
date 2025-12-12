// src/components/TaskForm/TaskForm.tsx
// Task form component for adding new tasks
import React, { useState } from "react";
import type { TaskFormData, TaskFormProps, TaskPriority, TaskStatus } from "../../types";

const initialForm: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isDarkMode }) => {
  const [form, setForm] = useState<TaskFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? (value as TaskStatus)
          : name === "priority"
          ? (value as TaskPriority)
          : value,
    }));
  }

  function validate(): boolean {
    if (!form.title.trim()) {
      setError("Title is required.");
      return false;
    }
    if (form.title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      return false;
    }
    setError(null);
    return true;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    onSubmit(form);
    setForm(initialForm);
  }
  const cardClass = isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white";
  const labelClass = isDarkMode ? "text-slate-300" : "text-slate-600";
  const fieldClass = isDarkMode
    ? "border-slate-600 bg-slate-900 text-slate-100 placeholder:text-slate-400"
    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400";

  return (
    <form
      onSubmit={handleSubmit}
     className={`mt-4 space-y-3 rounded-lg p-4 shadow-sm ${cardClass}`}

    >
      <h2 className="text-sm font-semibold">Add Task</h2>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className={`block text-[11px] font-medium ${labelClass}`}>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
            placeholder="e.g. Review project documentation"
          />
        </div>

        <div>
          <label className={`block text-[11px] font-medium ${labelClass}`}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate || ""}
            onChange={handleChange}
            className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
          />
        </div>
      </div>

      <div>
        <label className={`block text-[11px] font-medium ${labelClass}`}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
          placeholder="Short note about what needs to be done..."
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className={`block text-[11px] font-medium ${labelClass}`}>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className={`block text-[11px] font-medium ${labelClass}`}>Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};
