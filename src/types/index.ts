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
  dueDate?: string;         // optional, store as ISO string// 
// learn more about ISO strings https://www.w3schools.com/jsref/jsref_toisostring.asp
}

// Define type for task form data
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}