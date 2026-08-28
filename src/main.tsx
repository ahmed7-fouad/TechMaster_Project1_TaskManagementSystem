import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TasksDataProvider } from '@/Providers/ِTasksDataProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import { NotesProvider } from "./context/NotesContext";
import { ResourcesProvider } from "./context/ResourcesContext";

import {router} from "@/routing/mainRoute.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotesProvider>
      <ResourcesProvider>
        <TasksDataProvider>
           <RouterProvider router={router}/>
        </TasksDataProvider>
    </ResourcesProvider>
    </NotesProvider>
  </StrictMode>
);
