// src/components/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import {
  applyFilters,
  applySort,
  getTaskStats,
} from "../../utils/taskUtils";
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Export / Import text area state
  const [exportText, setExportText] = useState("");

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

  function handleToggleTheme() {
    setIsDarkMode((prev) => !prev);
  }

  function handleGenerateExport() {
    setExportText(JSON.stringify(tasks, null, 2));
  }

  function handleImport() {
    if (!exportText.trim()) return;
    try {
      const parsed: Task[] = JSON.parse(exportText);
      setTasks(parsed);
    } catch (error) {
      alert("Invalid JSON. Please check the format.");
    }
  }

  // apply filters + sorting
  const visibleTasks = applySort(applyFilters(tasks, filters), sortBy);
  const stats = getTaskStats(tasks);

  return (
    <div
      className={`min-h-screen px-4 py-8 ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
            <p className="text-sm text-slate-500">
              Track tasks, priorities, and progress in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleTheme}
            className="rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
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
        {/* Export / Import */}
        <section className="mt-6 rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">Export / Import Tasks</h2>
          <p className="mt-1 text-[11px] text-slate-500">
            You can copy this JSON to save your tasks or paste JSON here to
            restore them.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleGenerateExport}
              className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-white hover:bg-slate-900"
            >
              Generate Export
            </button>
            <button
              type="button"
              onClick={handleImport}
              className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Import JSON
            </button>
          </div>
          <textarea
            value={exportText}
            onChange={(e) => setExportText(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono"
          />
        </section>
      </div>
    </div>
  );
};
