// src/components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";
import type { Task, TaskFormData } from "../../types";

const STORAGE_KEY = "task-dashboard-tasks";

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed: Task[] = JSON.parse(saved);
      setTasks(parsed);
    } catch (error) {
      console.error("Could not parse tasks from localStorage", error);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(formData: TaskFormData) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      createdAt: Date.now(),
      dueDate: formData.dueDate || undefined,
    };

    setTasks((prev) => [newTask, ...prev]);
  }

  function handleToggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        let nextStatus: Task["status"];
        if (task.status === "todo") nextStatus = "in-progress";
        else if (task.status === "in-progress") nextStatus = "done";
        else nextStatus = "todo";

        return { ...task, status: nextStatus };
      })
    );
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
          <p className="text-sm text-slate-500">
            Track tasks and stay organized.
          </p>
        </header>

        <TaskForm onSubmit={handleAddTask} />

        <TaskList
          tasks={tasks}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};
