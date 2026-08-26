import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import TasksBar from "@/components/TasksBar";
import DashBoard from "@/components/DashBoard";
import { PATHS } from "./paths";
export const router = createBrowserRouter([
  {
    path: PATHS.MAIN,
    element: <App />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: PATHS.DASHBOARD_CHILDREN.DASHBOARD,
        element: <DashBoard />,
      },
      {
        path:PATHS.DASHBOARD_CHILDREN.TASKS,
        element:<TasksBar/>
      }
    ],
  },
]);
