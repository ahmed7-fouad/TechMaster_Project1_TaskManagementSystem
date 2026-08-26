import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import TasksBar from "@/components/TasksBar";
import DashBoard from "@/components/DashBoard";
import { PATHS } from "./paths";
import Notes from "@/pages/notes/Notes";
import Resources from "@/pages/Resources/Resources";
import { Profile } from "@/pages/profile/Profile";
import Notfound from "@/components/Notfound";
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
        path: PATHS.DASHBOARD_CHILDREN.TASKS,
        element: <TasksBar />,
      },
      {
        path: PATHS.DASHBOARD_CHILDREN.NOTES,
        element: <Notes isModalOpen={false} setIsModalOpen={() => {}} />,
      },
      {
        path: PATHS.DASHBOARD_CHILDREN.RESOURCES,
        element: <Resources isModalOpen={false} setIsModalOpen={() => {}} />,
      },
      {
        path: PATHS.DASHBOARD_CHILDREN.PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
