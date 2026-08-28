const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

import { type taskCardData } from "@/data/TasksData";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAllTasks } from "@/Providers/ِTasksDataProvider";
import { useResources } from '../context/ResourcesContext';
import { useNotes } from "@/context/NotesContext";

import { useState } from "react";

// Create Unique Id Using UUID Library
import { v4 as uuidv4 } from "uuid"; // Import the uuid generator

const TaskDialog = ({
  taskId,
  dialogState,
  setDialogState,
  theme,
}: {
  taskId: string | number;
  dialogState?: boolean;
  setDialogState?: (data: boolean) => void;
  theme?: string;
}) => {
  const date = new Date("2026-08-25T12:00:00");
  const ukFormat = new Intl.DateTimeFormat("en-GB").format(date);

  const taskStatusChoices: { label: string; value: string | null }[] = [
    //   { label: "Select The Task Status", value: null },
    { label: "pending", value: "pending" },
    { label: "completed", value: "completed" },
    { label: "in progress", value: "in progress" },
  ];

  const taskPriorityChoices: { label: string; value: string | null }[] = [
    {
      label: "high",
      value: "high",
    },
    {
      label: "medium",
      value: "medium",
    },
    {
      label: "low",
      value: "low",
    },
  ];

  const [dialogDataObj, setDialogDataObj] = useState<taskCardData>({
    id: uuidv4(),
    title: "",
    status: "",
    priority: "",
    date: "",
    resource: "",
    note: "",
  });

  // Main Crud Functions On All Data
  const { addTask, editTask, deleteTask } = useAllTasks();
  const { resources, addResource, deleteResource } = useResources();
  const { deleteNote } = useNotes();

  
  function handleAction() {
    if (theme == "task" || theme == "tasks" || theme == "update") {
      if (!dialogDataObj.title) {
        window.alert("The Task Title Is Missing");
      } else if (!dialogDataObj.status) {
        window.alert("The Task Status Is Missing");
      } else if (!dialogDataObj.priority) {
        window.alert("The Task Priority is Missing");
      } else if (!dialogDataObj.date) {
        window.alert("The Task Date Is Missing");
      } else {
        if (theme == "task" || theme == "tasks") {
          addTask(dialogDataObj);
        } else if (theme == "update") {
          editTask(taskId, dialogDataObj);
          window.alert("Task is updated successfully");
        }
        setDialogState(false);
      }
    } else if (theme?.startsWith("delete")) {
      if(theme=="deleteTask"){
         deleteTask(taskId);
         window.alert("Task is deleted successfully");
        }else if (theme=="deleteResource"){
          deleteResource(taskId);
          window.alert("Resource is deleted successfully");
        }else if (theme == "deleteNote"){
          deleteNote(taskId);
          window.alert("Note is deleted successfully");
      }
      setDialogState(false);
    }
  }

  const dialogData: {
    title?: string;
    description?: string;
    mainBtnContent?: string;
  } = {
    title: "",
    description: "",
    mainBtnContent: "add",
  };
  if (theme == "tasks") {
    dialogData.title = "add task";
    dialogData.description = "add your task details here";
  } else if (theme == "resources") {
    dialogData.title = "add resource";
    dialogData.description = "add your resource details here";
  } else if (theme == "notes") {
    dialogData.title = "add note";
    dialogData.description = "add you note details here";
  } else if (theme == "update") {
    dialogData.title = "edit task";
    dialogData.description = "update the task details here";
    dialogData.mainBtnContent = "update";
  } else if(theme?.startsWith("delete")){
    dialogData.title = "deleteing Confirmation";
     dialogData.mainBtnContent = "delete";
     if (theme == "deleteTask") {
      dialogData.description = "Are you sure you want to delete this task?";
    }else if (theme=="deleteResource"){
      dialogData.description = "Are you sure you want to delete this resource?";
    }else if(theme=="deleteNote"){
      dialogData.description = "Are you sure you want to delete this note?";
    }
  }

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <form>
        <DialogContent className="z-[999] sm:max-w-lg border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="capitalize">{dialogData.title}</DialogTitle>
            <DialogDescription className="capitalize dark:text-gray-300">
              {dialogData.description}
            </DialogDescription>
          </DialogHeader>

          {(theme == "tasks" || theme == "update") && (
            <FieldGroup>
              <Field>
                <Label
                  htmlFor="name-1"
                  className="capitalize dark:text-gray-200"
                >
                  task title
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue="task title"
                  className="border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  value={dialogDataObj.title}
                  onChange={(e) =>
                    setDialogDataObj({
                      ...dialogDataObj,
                      title: e.target.value,
                    })
                  }
                />
              </Field>
              <section className="flex items-center gap-5">
                <section className="flex-1">
                  <Select
                    items={taskStatusChoices}
                    className=""
                    value={dialogDataObj.status}
                    onValueChange={(value) =>
                      setDialogDataObj({
                        ...dialogDataObj,
                        status: value,
                      })
                    }
                  >
                    <Label
                      htmlFor="name-3"
                      className="capitalize block mb-3 dark:text-gray-200"
                    >
                      status
                    </Label>
                    <SelectTrigger className="w-full border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[999] border-gray-600 bg-gray-700 text-gray-100">
                      <SelectGroup>
                        <SelectLabel>Task Status</SelectLabel>
                        {taskStatusChoices.map((item) => (
                          <SelectItem
                            className="capitalize text-gray-100 focus:bg-gray-600 focus:text-white"
                            key={item.value}
                            value={!item.value ? "" : item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>

                {/* Priority */}
                <section className="flex-1">
                  <Select
                    items={items}
                    value={dialogDataObj.priority}
                    onValueChange={(value) =>
                      setDialogDataObj({
                        ...dialogDataObj,
                        priority: value,
                      })
                    }
                  >
                    <Label
                      htmlFor="name-3"
                      className="capitalize block mb-3 dark:text-gray-200"
                    >
                      Priority
                    </Label>
                    <SelectTrigger className="w-full border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[999] border-gray-600 bg-gray-700 text-gray-100">
                      <SelectGroup>
                        <SelectLabel>Task Priority</SelectLabel>
                        {taskPriorityChoices.map((item) => (
                          <SelectItem
                            className="capitalize text-gray-100 focus:bg-gray-600 focus:text-white"
                            key={item.value}
                            value={!item.value ? "" : item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </section>
              </section>

              <Field>
                <Label
                  htmlFor="username-1"
                  className="capitalize dark:text-gray-200"
                >
                  date
                </Label>
                <Input
                  id="username-1"
                  type="date"
                  name="username"
                  defaultValue={ukFormat}
                  className="border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  value={dialogDataObj.date}
                  onChange={(e) =>
                    setDialogDataObj({ ...dialogDataObj, date: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
          )}

          {(theme == "resources" || theme == "notes") && (
            <FieldGroup>
              <Field>
                <Label
                  htmlFor="name-1"
                  className="capitalize dark:text-gray-200"
                >
                  {theme == "resources" ? "resource" : "note"} title
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue="task title"
                  className="border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  value={dialogDataObj.title}
                  onChange={(e) => {
                    setDialogDataObj({
                      ...dialogDataObj,
                      title: e.target.value,
                    });
                    console.log(dialogDataObj.title);
                  }}
                />
              </Field>
              <Field>
                <Label
                  htmlFor="name-1"
                  className="capitalize dark:text-gray-200"
                >
                  {theme == "resources" ? "resource link" : "note content"}
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue="task title"
                  className="border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  value={
                    theme == "resources"
                      ? dialogDataObj.resource
                      : dialogDataObj.note
                  }
                  onChange={(e) =>
                    setDialogDataObj({
                      ...dialogDataObj,
                      note: e.target.value,
                    })
                  }
                />
              </Field>
            </FieldGroup>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="hover:bg-thirdc hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-thirdc cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="capitalize  duration-150 text-white bg-secondaryc hover:bg-primaryc cursor-pointer"
              onClick={handleAction}
            >
              {dialogData.mainBtnContent}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default TaskDialog;
