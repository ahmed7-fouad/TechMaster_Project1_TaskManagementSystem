
import { useState } from 'react';
import { taskStateStyle } from '../styles/taskStateStyleConfig';
import { taskPriorityStyle } from '../styles/taskStateStyleConfig';
import { cn } from '@/lib/utils';
import { Checkbox } from "@/components/ui/checkbox";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useAllTasks } from '@/Providers/ِTasksDataProvider';
import { type taskCardData } from '@/data/TasksData';

import { useOutletContext } from "react-router-dom";



;
    const TaskCard = ({
      id,
      title,
      status,
      priority,
      date,
      iconsState,
    }: taskCardData) => {
      let   { tasks, updateTasks } = useAllTasks();
      const { getTaskIdAndTheme, handleDialogAppearance } = useOutletContext();
      
      function handleTaskState(taskId: string | number) {
        const tempData = tasks;
        const updatedTasks = tempData.map((task) => {
          if (task.id == taskId) {
            task.status = task.status !== "completed" ? "completed" : "pending";
          }
          return task;
        });
        updateTasks(updatedTasks);
      }

      return (
        <section
          className={cn(
            "flex items-center flex-wrap gap-5 justify-between  border-y-1 border-muted-text p-5",
          )}
        >
          <Checkbox
            id="terms-checkbox-2"
            name="terms-checkbox-2"
            className="size-5 cursor-pointer"
            checked={status == "completed"}
            onClick={() => handleTaskState(id)}
          />
          <h3
            className={cn(
              "text-lg font-bold capitalize",
              status == "completed" && "line-through",
            )}
          >
            {title?.toLowerCase()}
          </h3>
          <span
            className={cn(
              "text-md inline-block px-3 py-2 rounded-full capitalize",
              taskStateStyle[status]?.className,
            )}
          >
            {status}
          </span>
          <span
            className={cn(
              "text-md inline-block px-3 py-2 rounded-full capitalize",
              taskPriorityStyle[priority]?.className,
            )}
          >
            {priority}
          </span>
          <span className="text-muted-text font-semibold text-md">{date}</span>
          {iconsState && (
            <section className="flex items-center gap-5">
              <SquarePen
                onClick={() => {
                  getTaskIdAndTheme(id, "update");
                  handleDialogAppearance();
                }}
                className="cursor-pointer text-secondaryc"
              />
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  getTaskIdAndTheme(id, "delete");
                  handleDialogAppearance();
                }}
              />
            </section>
          )}
        </section>
      );
    };
export default TaskCard;