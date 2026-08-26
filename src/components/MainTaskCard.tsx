import { useAllTasks } from "@/Providers/ِTasksDataProvider";
import { cn } from "@/lib/utils";
import {type ReactNode} from "react";
import TaskCard from "@/shared/TaskCard";
import {Link} from "react-router-dom";
const MainTaskCard=({title,bgColor,cardHeight,children}:{title?:string,bgColor?:string,cardHeight?:string,children?:ReactNode})=>{
    let { tasks } = useAllTasks();
    return (
      <section
        className={cn("p-5 shadow-lg rounded-xl overflow-y-scroll")}
        style={{ backgroundColor: bgColor, height: cardHeight }}
      >
        {title&&
          <h3 className="font-bold capitalize text-2xl rounded-lg  mb-5">
            {title}
          </h3>
        }
        <section className="h-full">
          {children}
        </section>
      </section>
    );
}
export default MainTaskCard;