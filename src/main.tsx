import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TasksDataProvider } from '@/Providers/ِTasksDataProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import {router} from "@/routing/mainRoute.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksDataProvider>
      <RouterProvider router={router}/>
    </TasksDataProvider>
  </StrictMode>
);
