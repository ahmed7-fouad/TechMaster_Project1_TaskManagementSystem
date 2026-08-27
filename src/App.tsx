import "./App.css";
import { useState } from "react";
import SideBar from "./shared/SideBar";
import Nav from "./shared/Nav";
import { Plus } from "lucide-react";
import SearchBar from "./shared/SearchBar";
import MainBtn from "./shared/MainBtn";
import TasksBar from "./components/TasksBar";
import TaskDialog from "./shared/TaskDialog";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
function App() {
  const [dialogState, setDialogState] = useState(false);
  const [currentClickedTaskId, setcurrentClickedTaskId] = useState(0);
  const [currentTheme, setcurrentTheme] = useState("task");
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const location = useLocation();
  const currentLocation = location.pathname;
  const dialogThemeState=currentLocation.slice(1);
  function handleDialogAppearance() {
    setDialogState(!dialogState);
  }

  function getTaskIdAndTheme(id = -1,theme) {
    if (id !== -1) {
      setcurrentClickedTaskId(id);
    }
    if(theme){
      setcurrentTheme(theme);
    }else{
      if (dialogThemeState) {
        setcurrentTheme(dialogThemeState);
      } 
    }
    
  }

  function handleSideBarToggle() {
    setSideBarToggle(!sideBarToggle);
  }

  ;

  let navContentData = {
    title: "",
    subTitle: "",
    btnContent: "",
  };

  switch (currentLocation) {
    case "/":
    case "/dashboard":
      navContentData.title = "dashboard";
      navContentData.subTitle = "Good to see you again, Ahmed! 👋";
      break;
    case "/tasks":
      navContentData.title = "tasks";
      navContentData.subTitle = "Manage and organize your tasks";
      navContentData.btnContent = "add task";
      break;
    case "/resources":
      navContentData.title = "resources";
      navContentData.subTitle = "Store and manage your important links & files";
      navContentData.btnContent = "add resource";
      break;
    case "/profile":
      navContentData.title = "profile";
      navContentData.subTitle = "Manage your account information";
      break;
    case "/notes":
      navContentData.title = "notes";
      navContentData.subTitle = "Capture your ideas and thoughts";
      navContentData.btnContent = "add note";
      break;
  }
  return (
    <>
      <TaskDialog
        taskId={currentClickedTaskId}
        theme={currentTheme}
        dialogState={dialogState}
        setDialogState={setDialogState}
      />

      <section className="lg:grid lg:grid-cols-[21rem_1fr]">
        <SideBar
          sideBarToggleState={sideBarToggle}
          updateSideBarToggleState={handleSideBarToggle}
        />
        <section>
          <section>
            <Nav
              handleDialog={handleDialogAppearance}
              getTaskIdAndTheme={getTaskIdAndTheme}
              btnColor="var(--secondaryc)"
              btnContentColor="whitesmoke"
              icon={<Plus />}
              title={navContentData.title}
              desc={navContentData.subTitle}
              btnContent={navContentData.btnContent || null}
              handleSideBarToggle={handleSideBarToggle}
            />
          </section>

          <section className="main-container  mt-11">
            <Outlet
              context={{
                getTaskIdAndTheme,
                handleDialogAppearance,
              }}
            />
          </section>
        </section>
      </section>
    </>
  );
}
export default App;
