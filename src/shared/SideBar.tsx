// import { Link } from "react-router-dom";
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

interface dashboardBtn{
    id:number,
    icon:ReactElement,
    title:string,
    active:boolean,
}
const dashboardBtns: dashboardBtn[] = [
  {
    id: 1,
    icon: <House />,
    title: "dashboard",
    active: true,
  },
  {
    id: 2,
    icon: <Logs />,
    title: "tasks",
    active: false,
  },
  {
    id: 3,
    icon: <File />,
    title: "resources",
    active: false,
  },
  {
    id: 4,
    icon: <NotebookPen />,
    title: "notes",
    active: false,
  },
  {
    id: 5,
    icon: <UserRound />,
    title: "profile",
    active: false,
  },
];
const SideBar=()=>{
    const [activeBoardLinks, setActiveBoardLinks] = useState(dashboardBtns);
    function handleActiveBoardLinksClicked(id){
        const updatedActiveLinks=activeBoardLinks.map(lnk=>{
            const tempObj=lnk;
            if(lnk.id==id){
                tempObj.active=true;
            }else{
                tempObj.active=false;
            }
            return tempObj;
        })
        setActiveBoardLinks(updatedActiveLinks);
    }
    return (
      <aside className="w-[21rem] py-4 px-5 bg-primaryc h-screen">
        <section className="w-full bg-white rounded-xl flex items-center justify-center mb-7">
          <img src="/src/assets/logo.png" alt="LogoIcon" className="w-[8rem]" />
        </section>
        <ul className="space-y-2">
          {/* dashboard */}
          {
          dashboardBtns.map((btn=>{
            return (
              <p
                key={btn.id}
                onClick={()=>handleActiveBoardLinksClicked(btn.id)}
                className={cn("hover:bg-secondaryc inline-block w-full rounded-lg p-4 cursor-pointer duration-250",
                    btn.active&&"bg-secondaryc")}>
                <li className="flex items-center gap-3 text-muted-text text-xl">
                  {btn.icon}
                  <h3 className="capitalize">
                    {btn.title}
                  </h3>
                </li>
              </p>
            );
          }))
          }
         
        </ul>
      </aside>
    );
}

export default SideBar;