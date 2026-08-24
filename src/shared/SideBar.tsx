import { Link, useLocation } from "react-router-dom";
import { House, Logs, File, NotebookPen, UserRound } from "lucide-react";
import type { ReactElement } from "react";
import { cn } from "../lib/utils";

interface dashboardBtn {
  id: number;
  icon: ReactElement;
  title: string;
  path: string;
}

const dashboardBtns: dashboardBtn[] = [
  {
    id: 1,
    icon: <House />,
    title: "dashboard",
    path: "/",
  },
  {
    id: 2,
    icon: <Logs />,
    title: "tasks",
    path: "/tasks",
  },
  {
    id: 3,
    icon: <File />,
    title: "resources",
    path: "/resources",
  },
  {
    id: 4,
    icon: <NotebookPen />,
    title: "notes",
    path: "/notes",
  },
  {
    id: 5,
    icon: <UserRound />,
    title: "profile",
    path: "/profile",
  },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="py-4 px-5 bg-primaryc h-screen sticky top-0">
      <section className="w-full bg-white rounded-xl flex items-center justify-center mb-7 p-2">
        <img src="/src/assets/logo.png" alt="LogoIcon" className="w-32" />
      </section>
      <ul className="space-y-2">
        {dashboardBtns.map((btn) => {
          const isActive = location.pathname === btn.path;

          return (
            <li key={btn.id}>
              <Link
                to={btn.path}
                className={cn(
                  "hover:bg-secondaryc flex items-center gap-3 w-full rounded-lg p-4 cursor-pointer duration-250 text-muted-text text-xl",
                  isActive && "bg-secondaryc text-indigo-200 font-semibold",
                )}
              >
                {btn.icon}
                <h3 className="capitalize">{btn.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
