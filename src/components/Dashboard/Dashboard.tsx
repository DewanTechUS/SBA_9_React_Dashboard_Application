// src/components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import { applyFilters, applySort, getTaskStats } from "../../utils/taskUtils";
import type {
  Task,
  TaskFilters,
  TaskFormData,
  TaskSortBy,
} from "../../types";

const STORAGE_KEY = "task-dashboard-tasks";

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
    query: "",
  });
  const [sortBy, setSortBy] = useState<TaskSortBy>("created-newest");

  // Load tasks from localStorage on first mount
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

  function handleChangeFilters(nextFilters: TaskFilters) {
    setFilters(nextFilters);
  }

  function handleChangeSortBy(next: TaskSortBy) {
    setSortBy(next);
  }

  // apply filters + sorting
  const visibleTasks = applySort(applyFilters(tasks, filters), sortBy);
  const stats = getTaskStats(tasks);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
            <p className="text-sm text-slate-500">
              Track tasks, priorities, and progress in one place.
            </p>
          </div>
        </header>

        {/* Stats */} 
        <section className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-lg bg-white p-3 text-center shadow-sm">
            <p className="text-[11px] text-slate-500">Total</p>
            <p className="text-lg font-semibold">{stats.total}</p>
          </div>
          <div className="rounded-lg bg-white p-3 text-center shadow-sm">
            <p className="text-[11px] text-slate-500">To Do</p>
            <p className="text-lg font-semibold">{stats.todo}</p>
          </div>
          <div className="rounded-lg bg-white p-3 text-center shadow-sm">
            <p className="text-[11px] text-slate-500">In Progress</p>
            <p className="text-lg font-semibold">{stats.inProgress}</p>
          </div>
          <div className="rounded-lg bg-white p-3 text-center shadow-sm">
            <p className="text-[11px] text-slate-500">Done</p>
            <p className="text-lg font-semibold">{stats.done}</p>
          </div>
        </section>

        {/* Task Filter */}
        <TaskFilter
          filters={filters}
          sortBy={sortBy}
          onChangeFilters={handleChangeFilters}
          onChangeSortBy={handleChangeSortBy}
        />

        {/* Task Form */}
        <TaskForm onSubmit={handleAddTask} />

        {/* Task List */}
        <TaskList
          tasks={visibleTasks}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};
