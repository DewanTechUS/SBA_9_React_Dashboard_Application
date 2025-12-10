// src/components/TaskForm/TaskForm.tsx
// Task form component for adding new tasks
import React, { useState } from "react";
import type {
  TaskFormData,
  TaskFormProps,
  TaskPriority,
  TaskStatus,
} from "../../types";

const initialForm: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
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

  return (
    <form className="mt-4 space-y-3 rounded-lg bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <h2 className="text-sm font-semibold">Add Task</h2>

      {error && (
        <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};
