import { createContext, useContext, type ReactNode,useState ,useEffect} from "react";
import { AllTasksData } from "@/data/TasksData";
import { type taskCardData } from "@/data/TasksData";

const TasksContext = createContext([]);

// Add Data To LocalStorage First
export const TasksDataProvider=({children}:{children:ReactNode})=>{
    const [allTasks, setAllTasks] = useState(()=>{
         const stringifyData = window.localStorage.getItem("tasks")
         if(stringifyData && stringifyData!=="undefined"){
            try{
                return JSON.parse(stringifyData);
            }catch(error){
                console.log(new Error(`Error Passing Data From Local Storage ${error}`))
            }
         }
         window.localStorage.setItem("tasks", JSON.stringify(AllTasksData));
         return AllTasksData;
    });
  
    const allTasksNumber = allTasks.length;
    const allCompletedTasksNumber= allTasks.filter((el) => el.status.toLowerCase() == "completed").length;
    const allInProgressTasksNumber = allTasks.filter((el) => el.status.toLowerCase() == "in progress",).length;
    const allPendingTasksNumber = allTasks.filter((el) => el.status.toLowerCase() == "pending").length;
    
    useEffect(()=>{
        const data = JSON.stringify(allTasks);
        window.localStorage.setItem("tasks", data);
    },[allTasks])
 
    
    function updateTasks(newTasksList: taskCardData[]) {
      setAllTasks(newTasksList);
    }
    
    function AddNewTask (taskObj:taskCardData){
         if (taskObj) {
            const checkExistingTask=allTasks.some((task)=>{
                return(
                    task.title==taskObj.title
                );
            })

            if(!checkExistingTask){
                setAllTasks([...allTasks, taskObj]);
                window.localStorage.setItem("tasks",JSON.stringify(allTasks))
                window.alert("The Task Is Added Successfully");
            }
            else{
                window.alert("This Task Is Already Added")
            }
        }
        
    }

    function deleteTask(taskId){
        if (taskId){
          const updatedData = allTasks.filter((task) => {
            return task.id !== taskId;
          });
          setAllTasks(updatedData);
        }
    }

    function editTask(taskId,taskObj){
        const updatedData=allTasks.map(task=>{
            if(task.id === taskId){
                return taskObj;
            }else{
                return task;
            }
        })
        setAllTasks(updatedData)
    }

    interface providerDataTypes {
      tasks?: taskCardData[];
      allTasksNumber?: number;
      allCompletedTasksNumber?: number;
      allInProgressTasksNumber?: number;
      allPendingTasksNumber?:number,
      addTask?: (taskObj: taskCardData) => void;
      deleteTask: (taskId: string | number) => void;
      editTask: (taskId: string | number, taskObj: taskCardData) => void;
      updateTasks: (tasksList: taskCardData[]) => void;
    }
    
    const tasksProviderData: providerDataTypes = {
      tasks: allTasks,
      allTasksNumber:allTasksNumber,
      allCompletedTasksNumber:allCompletedTasksNumber,
      allInProgressTasksNumber:allInProgressTasksNumber,
      allPendingTasksNumber:allPendingTasksNumber,
      addTask: AddNewTask,
      deleteTask: deleteTask,
      editTask: editTask,
      updateTasks:updateTasks
    };

    return (
      <TasksContext.Provider value={tasksProviderData}>
        {children}
      </TasksContext.Provider>
    );
}

export const useAllTasks=()=>{
   const allData = useContext(TasksContext);
   return allData;
}