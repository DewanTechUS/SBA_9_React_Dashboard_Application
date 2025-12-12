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
// Update body styles based on theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#020617";
      document.body.style.color = "#e5e7eb";
    } else {
      document.body.style.backgroundColor = "#f1f5f9";
      document.body.style.color = "#0f172a";
    }
  }, [isDarkMode]);
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
 // Export / Import handlers (commented out for now) This feature will be fully restored in a future update. I commented it out for now because I need to review a few more resources and learn the remaining steps to make it work 100%.
  // function handleGenerateExport() {
  //   setExportText(JSON.stringify(tasks, null, 2));
  // }

  // function handleImport() {
  //   if (!exportText.trim()) return;
  //   try {
  //     const parsed: Task[] = JSON.parse(exportText);
  //     setTasks(parsed);
  //   } catch (error) {
  //     alert("Invalid JSON. Please check the format.");
  //   }
  // }

  // apply filters + sorting
  const visibleTasks = applySort(applyFilters(tasks, filters), sortBy);
  const stats = getTaskStats(tasks);

  return (
    <div
      className={`min-h-screen px-4 py-8 ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
        <div className="flex justify-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium">
              {isDarkMode ? "Dark" : "Light"} Mode
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={handleToggleTheme}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-slate-700 transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      <div className="mx-auto max-w-4xl">
        {/* Header */}

        <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">SBA Task Management Dashboard</h1>
            <h6 className="text-1xl font-small text-center">DEWAN MAHMUD Software Engineering Student of Per Scholas Cohort 2025-RTT-57. This project was built using the skills I gained at Per Scholas Atlanta, a no-cost, career-focused tech training program. Special thanks to my instructors, Tishana Trainor and Bryan Santos, for their outstanding guidance and support.</h6>
            <h6 className="text-sm text-slate-500">
                <a 
                  href="https://www.perscholas.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 underline font-bold text-center block text-blue-600"
                >
                  Join Per Scholas Today!  
                </a>
            </h6>
            <p className="text-2xl text-emerald-600 text-center font-bold">
              Track tasks, priorities, and progress in one place.
            </p>
          </div>
        </header>
        
        {/* Stats */}
        <section className="mt-4 grid gap-3 md:grid-cols-4">
          <div className={`rounded-lg p-3 text-center shadow-sm ${
            isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white"
          }`}>
            <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Total</p>
            <p className="text-lg font-semibold">{stats.total}</p>
          </div>
          <div className={`rounded-lg p-3 text-center shadow-sm ${
            isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white"
          }`}>
            <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>To Do</p>
            <p className="text-lg font-semibold">{stats.todo}</p>
          </div>
          <div className={`rounded-lg p-3 text-center shadow-sm ${
            isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white"
          }`}>
            <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>In Progress</p>
            <p className="text-lg font-semibold">{stats.inProgress}</p>
          </div>
          <div className={`rounded-lg p-3 text-center shadow-sm ${
            isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white"
          }`}>
            <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Done</p>
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
        {/* Export / Import: This feature will be fully restored in a future update. I commented it out for now because I need to review a few more resources and learn the remaining steps to make it work 100%. */}
         
        {/* <section className="mt-6 rounded-lg bg-white p-4 shadow-sm">
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
        </section> */}
      </div>
    </div>
  );
};
