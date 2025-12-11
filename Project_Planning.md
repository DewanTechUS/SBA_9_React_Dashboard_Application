# Project Planning

## Before starting this SBA, I created a clear project plan to guide the development process. My goal was to understand the requirements, organize the structure early, and avoid confusion once I began coding. Below is the breakdown of how I planned the application.

1. Requirements Analysis
Before writing any code, I reviewed the SBA instructions and outlined everything the application needed to support. I planned the core features based on the requirements:
-	Users must be able to create tasks with specific fields (title, description, status, priority, due date).
-	Users should be able to update task status and delete tasks.
-	The dashboard should include filtering, sorting, and a responsive layout.
-	The application must use TypeScript with strong type definitions.
-	Tasks should persist using localStorage.
-	Dark/light mode should be available.
-	Components must be organized cleanly and communicate through props.

From this, I planned to design:
-	A main parent component to control state,
-	Several child components that receive data via props,
-	A set of TypeScript interfaces to enforce structure,
-	Utility functions for task logic such as filtering and sorting.

My goal was to keep the app simple, clean, and organized from the start.

2. Component Planning
I planned the component structure early so that I would know exactly where each part of the app belonged. My goal was to keep every component focused on a single responsibility.
Here is the structure I planned before developing:

Dashboard (Parent)
-	Holds all state (tasks, filters, sorting, theme).
-	Handles localStorage saving and loading.
-	Passes tasks to child components after filtering/sorting.
-	Coordinates all communication between components.
TaskForm
-	Collects input from the user.
-	Validates the task before submission.
-	Sends the completed form data to Dashboard.
TaskFilter
-	Handles status, priority, and search filters.
-	Handles sorting options.
-	Updates Dashboard with new filter/sort values.
TaskList
-	Receives the processed list of tasks.
-	Displays each task using TaskItem.
TaskItem
-	Renders a single task.
-	Provides buttons to toggle status or delete a task.

I planned the hierarchy so that Dashboard owns all major state, while child components only manage their own small responsibilities. This prevented confusion and kept the data flow predictable.

3. TypeScript Interface Planning
I planned all TypeScript types before building the components to ensure consistency.
The key interfaces I designed were:
-	Task
-	TaskFormData
-	TaskFilters
-	TaskSortBy
-	Component prop interfaces (TaskListProps, TaskFormProps, etc.)

By planning the types early, I avoided mistakes and kept the project organized and type-safe.

4. State Management Strategy

I planned for Dashboard to be the single source of truth.
The state I decided to store there included:
-	tasks
-	filters
-	sortBy
-	isDarkMode

My plan was:
-	Child components communicate upward through functions passed as props.
-	Dashboard processes all updates and then re-renders children with new data.
-	Use helper functions (filtering, sorting, stats) to keep the Dashboard clean.

This ensured the entire application stayed predictable and easy to debug.

5. Validation, Updates, and UI Planning
I planned validation rules before writing the form:
-	The title is required.
-	The title must be at least 3 characters.
-	Optional fields like due date should still be accepted if empty.
For UI and styling, I planned to use:
-	Tailwind CSS for fast layout adjustments,
-	A clean card-based dashboard style,
-	A dark/light mode switch,
-	Consistent spacing and responsive design.

I also planned that if any feature wasn’t fully ready (such as full JSON Import/Export), I would comment it out rather than submit something partially working. This helped me keep the final version clean and professional.

# Summary
This planning document reflects the decisions I made before starting development.
By outlining the structure, components, TypeScript types, and state management strategy first, I was able to build the project more confidently and keep the code organized.
Planning ahead also helped me understand how React and TypeScript work together and allowed me to complete the SBA with a cleaner, more structured result.