// src/components/TaskFilter/TaskFilter.tsx
import React from "react";
import type { TaskFilterProps } from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  sortBy,
  onChangeFilters,
  onChangeSortBy,
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

  return (
    <section className="mt-4 space-y-3 rounded-lg bg-white p-4 shadow-sm">
      <div>
        <label className="block text-[11px] font-medium text-slate-600">
          Search
        </label>
        <input
          name="query"
          value={filters.query}
          onChange={handleFilterChange}
          placeholder="Search by title or description..."
          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-600">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600">
            Priority
          </label>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
          >
            <option value="all">Any</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600">
            Sort
          </label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
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
