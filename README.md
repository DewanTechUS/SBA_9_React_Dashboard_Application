# SBA 9 - React Dashboard Application

# Author
- Dewan Mahmud (Rocky)
- Software Engineering Student
- Per Scholas - Cohort 2025-RTT-57
- GitHub: https://github.com/DewanTechUS
- LinkedIn: https://www.linkedin.com/in/dewan-mahmud-a579a0265/
- Portfolio: https://dewantech.com/

## This project is a Task Management Dashboard built using React, TypeScript, Vite, and Tailwind CSS. It was developed as part of the Per Scholas Software Engineering Program (Cohort 2025-RTT-57). The goal of this project was to build a practical, real-world dashboard application that demonstrates how modern front-end technologies work together.

## The dashboard allows users to create, organize, filter, sort, and manage tasks in a clean and user-friendly interface. It includes features such as controlled forms, task validation, dynamic filtering, sorting logic, localStorage persistence, and a fully customizable dark/light theme. Through TypeScript, the project enforces strong typing for all components and data structures, improving reliability and maintainability.

## This project showcases my understanding of React component architecture, state management, event handling, and reusable UI structures. It also highlights my ability to style applications using Tailwind CSS and manage project structure using Vite. Overall, it demonstrates how multiple front-end skills come together to build a complete and polished application.


# Project Features

## Core Task Features:
-	Add new tasks with title, description, status, priority, and due date.
-	Update a task’s status by clicking.
-	Delete tasks instantly.
-	Fully responsive layout.

## Filtering and Sorting:
-	Filters for status, priority, and search text.
-	Sorting options including created newest/oldest, due soon/late, and priority high/low.

## Dark/Light Mode:
-	Toggle between dark and light mode.
-	Theme affects the entire dashboard and the page background.

## Local Storage Persistence:
-	All tasks are automatically saved.
-	Tasks remain after refreshing or closing the browser.

## UI Enhancements:
-	Tailwind styling with cards, shadows, animations, and focus states.
-	Clean input fields and controlled components.
-	Centered dashboard layout.

# Technologies Used
- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage

# Project Structure
→ public/
    → react.svg
    → vite.svg
→ src/
    → assets/
        → react.svg
    → components/
        → Dashboard/
            → Dashboard.tsx
        → TaskFilter/
            → TaskFilter.tsx
        → TaskForm/
            → TaskForm.tsx
        → TaskList/
            → TaskItem.tsx
            → TaskList.tsx
    → types/
        → index.ts
    → utils/
        → taskUtils.ts
    → App.css
    → App.tsx
    → index.css
    → main.tsx
→ .gitignore
→ eslint.config.js
→ index.html
→ package.json
→ package-lock.json
→ postcss.config.cjs
→ Project_Planning.md
→ README.md
→ tailwind.config.cjs
→ tsconfig.app.json
→ tsconfig.json
→ tsconfig.node.json
→ vite.config.ts

# How to Run the Project
## Install dependencies:
- npm install
## Start the development server:
- npm run dev
## Open the application in the browser:
- http://localhost:5173/


# Key Concepts Demonstrated

## React State Management:
-	useState for form data, filters, and task state.
-	useEffect for localStorage and theme updates.
-	Controlled inputs for form handling.

## TypeScript Usage:
- Interfaces for tasks, props, and filter types.
-	Union types for status and priority.
-	Strongly typed component props.

## Component Composition:
-	Dashboard controls all data flow.
-	TaskForm manages user input and validation.
-	TaskFilter updates visible tasks.
-	TaskList renders tasks dynamically.
-	Helper functions in utils handle sorting, filtering, and statistics.

## UI/UX Improvements:
-	Tailwind for layout, spacing, and color system.
-	Hover and focus effects.
-	Accessible form elements.
-	Centered structure for readability.

# Reflection
- This SBA helped me better understand how React components communicate and how state flows through an application. At first, managing filters, sorting, and form validation felt challenging, but as I continued building, I learned how powerful React’s state system is. I also realized how TypeScript improves my workflow by catching errors early and guiding me toward writing cleaner, more predictable code.

- One of the most challenging parts was handling the sorting and filtering logic together while keeping the UI responsive and easy to use. Another challenge was fixing a TypeScript import issue that I had encountered in earlier labs. Solving it helped me understand how module resolution works in Vite and TypeScript.

- I also decided to comment out the Export/Import Tasks section for now. I began implementing it, but I realized I need more time to research how to properly validate imported JSON, handle errors safely, and restore large sets of tasks without breaking the UI. Instead of leaving a partially working feature, I commented it out so I can study it further and add it properly later.

- I enjoyed building the UI the most-adding dark mode, styling the dashboard, and improving the layout. Using Tailwind CSS allowed me to quickly customize the project and make it look clean and professional. Seeing everything come together inside the Dashboard component increased my confidence with React and TypeScript.
If I had more time, I would add drag-and-drop task reordering, full export/import with file selection, priority color indicators, and a task analytics section with charts.

- This is actually my second build of the project. My first version had a lot of experimental functions and test code that I used while learning, so I decided to rebuild the entire project from scratch to create a cleaner, more organized, and fully polished version for submission.

- Overall, this project represents my growth as a developer during my time at Per Scholas. This SBA reflects not just what I built, but what I learned through practice, mistakes, debugging, and improving step by step.

# Special Thanks
##  want to give a special thank you to:
-	Tishana Trainor - For her clear explanations, patience, and guidance throughout the React and TypeScript modules.
-	Bryan Santos - For helping me understand core concepts deeply and motivating me to keep improving.
-	My Cohort (2025-RTT-57) - For supporting each other, sharing knowledge, collaborating, and making every day of class meaningful.

I truly appreciate the learning environment and the support system at Per Scholas. It has helped me grow both technically and personally.

I also created a separate Project_Planning.md file to clearly document my planning process before beginning the project.

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