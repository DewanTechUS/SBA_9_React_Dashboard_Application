import React from "react";
import type { TaskFilterProps } from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  sortBy,
  onChangeFilters,
  onChangeSortBy,
  isDarkMode,
}) => {
  function handleFilterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    onChangeFilters({ ...filters, [name]: value });
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChangeSortBy(event.target.value as typeof sortBy);
  }

  const cardClass = isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white";
  const labelClass = isDarkMode ? "text-slate-300" : "text-slate-600";
  const fieldClass = isDarkMode
    ? "border-slate-600 bg-slate-900 text-slate-100 placeholder:text-slate-400"
    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400";

  return (
    <section
      className={`mt-4 grid gap-3 rounded-lg p-4 shadow-sm md:grid-cols-4 ${cardClass}`}
    >
      <div className="md:col-span-2">
        <label className={`block text-[11px] font-medium ${labelClass}`}>
          Search
        </label>
        <input
          name="query"
          value={filters.query}
          onChange={handleFilterChange}
          placeholder="Search by title or description..."
          className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
        />
      </div>

      <div>
        <label className={`block text-[11px] font-medium ${labelClass}`}>
          Status
        </label>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className={`mt-1 w-full rounded border px-2 py-1 text-sm ${fieldClass}`}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label className={`block text-[11px] font-medium ${labelClass}`}>
          Priority / Sort
        </label>
        <div className="mt-1 flex gap-2">
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className={`w-1/2 rounded border px-2 py-1 text-[11px] ${fieldClass}`}
          >
            <option value="all">Any</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className={`w-1/2 rounded border px-2 py-1 text-[11px] ${fieldClass}`}
          >
            <option value="created-newest">Newest</option>
            <option value="created-oldest">Oldest</option>
            <option value="due-soon">Due Soon</option>
            <option value="due-late">Due Late</option>
            <option value="priority-high">Priority High to Low</option>
            <option value="priority-low">Priority Low to High</option>
          </select>
        </div>
      </div>
    </section>
  );
};
