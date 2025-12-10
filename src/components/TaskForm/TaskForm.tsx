// src/components/TaskForm/TaskForm.tsx
import React, { useState } from "react";
import type { TaskFormData, TaskFormProps } from "../../types";

const initialForm: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<TaskFormData>(initialForm);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  }

  return (
    <form className="mt-4 space-y-3 rounded-lg bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <h2 className="text-sm font-semibold">Add Task</h2>

      <input
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Task title"
        className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};