// src/types/index.ts
// Define types for task status and priority
export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export interface Task {
  id: string;               // unique identifier
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;        // timestamp in milliseconds
  dueDate?: string;         //store as ISO string// 

}

// Define type for task form data
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}
// Filter options for the dashboard
export interface TaskFilters {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  query: string; // search text
}

// Sorting options // Define type for sorting tasks
export type TaskSortBy =
  | "created-newest"
  | "created-oldest"
  
  | "due-soon"
  | "due-late"
  
  | "priority-high"
  | "priority-low";



  // dashboard statistics // 
  export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

// Props for various components in the dashboard 
export interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

export interface TaskFilterProps {
  filters: TaskFilters;
  sortBy: TaskSortBy;
  onChangeFilters: (filters: TaskFilters) => void;
  onChangeSortBy: (sortBy: TaskSortBy) => void;
}