import {useState,useMemo,useEffect} from "react";
import { ButtonGroup } from "./ui/button-group";
import { Button } from "./ui/button";
import SearchBar from "@/shared/SearchBar";
import TaskCard from "../shared/TaskCard";
import { type taskCardData } from "@/data/TasksData";
import { useAllTasks } from "@/Providers/ِTasksDataProvider";
import { cn } from "@/lib/utils";
interface btnType{
    id?:number,
    content?:string,
    active?:boolean,
}

const buttonsData: btnType[] = [
  {
    id: 1,
    content: "all",
    active: true,
  },
  {
    id: 2,
    content: "in progress",
    active: false,
  },
  {
    id: 3,
    content: "pending",
    active: false,
  },
  {
    id: 4,
    content: "completed",
    active: false,
  },
];


const TasksBar = (() => {
  const { tasks: data } = useAllTasks();

  const [searchQuery, setSearchQuery] = useState("");

  const [allFilterBtns, setAllFilterBtns] = useState(buttonsData);

  // Update Data When Main Data Changed Or Filter
  const filteredData = useMemo(() => {
    let result = [];
    const clickedBtn = allFilterBtns.find((btn) => btn.active == true);

    if (clickedBtn?.content == "all") {
      result = data;
    } else {
      result = data.filter((task) => {
        return (
          clickedBtn?.content?.toLowerCase() === task.status?.toLowerCase()
        );
      });
    }

    if (searchQuery !== "") {
      result = data.filter((task) => {
        return task.title?.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return result;
  }, [data, allFilterBtns, searchQuery]);

  // Handle Search Process
  function handleSearch(searchInputContent: string) {
    setSearchQuery(searchInputContent);
  }

  // Handle Filtered Data
  function handleFilteredData(clickedBtn: btnType) {
    let updatedData = allFilterBtns;
    updatedData = updatedData.map((btn) => {
      if (btn.id === clickedBtn.id) {
        btn.active = true;
      } else {
        btn.active = false;
      }
      return btn;
    });
    setAllFilterBtns(updatedData);
  }

  return (
    <section className="p-10 shadow-lg mx-auto w-full">
      <section className="flex flex-wrap gap-5 sm:flex-col sm:justify-center  lg:flex-row  xl:justify-between items-center mb-7">
        <ButtonGroup className="">
          {allFilterBtns.map((btn) => {
            return (
              <Button
                onClick={() => handleFilteredData(btn)}
                key={btn.id}
                className={cn(
                  "capitalize font-semibold text-md cursor-pointer hover:bg-thirdc hover:text-muted-text duration-250 font-semibold",
                  btn.active && "bg-thirdc text-muted-text",
                )}
              >
                {btn.content}
              </Button>
            );
          })}
        </ButtonGroup>
        <SearchBar
          handleSearchProcess={handleSearch}
          searchQuery={searchQuery}
        />
      </section>
      {/* All Tasks */}
      <section className="max-h-[23rem] overflow-y-scroll">
        {filteredData.map((task) => {
          return (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status?.toLocaleLowerCase()}
              priority={task.priority?.toLocaleLowerCase()}
              date={task.date}
              iconsState={true}
            />
          );
        })}
      </section>
    </section>
  );});
export default TasksBar;