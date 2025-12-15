
export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export interface Task {
  id: string;             
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;       
  dueDate?: string;        

}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}

export interface TaskFilters {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  query: string; 
}


export type TaskSortBy =
  | "created-newest"
  | "created-oldest"
  
  | "due-soon"
  | "due-late"
  
  | "priority-high"
  | "priority-low";

  export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

export interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}

export interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  isDarkMode: boolean;
}

export interface TaskFilterProps {
  filters: TaskFilters;
  sortBy: TaskSortBy;
  onChangeFilters: (filters: TaskFilters) => void;
  onChangeSortBy: (sortBy: TaskSortBy) => void;
  isDarkMode: boolean;
}