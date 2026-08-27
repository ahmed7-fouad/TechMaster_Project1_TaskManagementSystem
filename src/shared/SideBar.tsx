import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {useState} from "react";
import {
  House,
  Logs,
  File,
  NotebookPen,
  UserRound,
} from "lucide-react";
import type { ReactElement } from "react";
import { cn } from "../lib/utils";

interface dashboardBtn {
  id?: number;
  icon?: ReactElement;
  title?: string;
  active?:boolean,
  path?: string;
}

const dashboardBtns: dashboardBtn[] = [
  {
    id: 1,
    icon: <House />,
    title: "dashboard",
    active:true,
    path: "/",
  },
  {
    id: 2,
    icon: <Logs />,
    title: "tasks",
    active:false,
    path: "/tasks",
  },
  {
    id: 3,
    icon: <File />,
    title: "resources",
    active:false,
    path: "/resources",
  },
  {
    id: 4,
    icon: <NotebookPen />,
    title: "notes",
    active:false,
    path: "/notes",
  },
  {
    id: 5,
    icon: <UserRound />,
    title: "profile",
    active:false,
    path: "/profile",
  },
];


const SideBar = ({
  sideBarToggleState,
  updateSideBarToggleState,
}: {
  sideBarToggleState: boolean;
  updateSideBarToggleState:()=>void
}) => {
  const [activeBoardLinks, setActiveBoardLinks] = useState(dashboardBtns);

  function handleActiveBoardLinksClicked(id: number) {
    const updatedActiveLinks = activeBoardLinks.map((lnk) => {
      const tempObj = lnk;
      if (lnk.id == id) {
        tempObj.active = true;
      } else {
        tempObj.active = false;
      }
      return tempObj;
    });
    setActiveBoardLinks(updatedActiveLinks);
  }

  return (
    <aside
      className={cn(
        " py-4 px-5 w-[21rem] fixed  lg:translate-0 bg-primaryc h-screen lg:sticky lg:sticky-top top-0 duration-150 transition-transform z-500",
        !sideBarToggleState && "-translate-x-[35rem]",
      )}
    >
      <section className="flex gap-7">
        <X
          className="visible lg:hidden size-15 text-white bottom-0 cursor-pointer"
          onClick={updateSideBarToggleState}
        />
        <section className="w-full bg-white rounded-xl flex items-center justify-center mb-7">
          <img src="/src/assets/logo.png" alt="LogoIcon" className="w-[8rem]" />
        </section>
      </section>
      <ul className="space-y-2">
        {/* dashboard */}
        {dashboardBtns.map((btn) => {
          // Link Tag Here
          return (
            <Link
              to={`/${btn.title}`}
              key={btn.id}
              onClick={() => handleActiveBoardLinksClicked(btn.id)}
              className={cn(
                "hover:bg-secondaryc inline-block w-full rounded-lg p-4 cursor-pointer duration-250",
                btn.active && "bg-secondaryc",
              )}
            >
              <li className="flex items-center gap-3 text-muted-text text-xl">
                {btn.icon}
                <h3 className="capitalize">{btn.title}</h3>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};


export default SideBar;
