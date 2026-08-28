import "./App.css";
import { useState, useEffect } from "react";
import SideBar from "./shared/SideBar";
import Nav from "./shared/Nav";
import { Plus } from "lucide-react";
import TaskDialog from "./shared/TaskDialog";
import { useLocation, Outlet } from "react-router-dom";
import useTheme from "./hooks/useTheme";


function App() {
  useTheme();

  const [dialogState, setDialogState] = useState(false);
  const [currentClickedTaskId, setcurrentClickedTaskId] = useState<
    number | string
  >(0);
  const [currentTheme, setcurrentTheme] = useState("task");
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);

  const location = useLocation();
  const currentLocation = location.pathname;
  const dialogThemeState = currentLocation.slice(1);

  useEffect(() => {
    if (currentLocation.includes("/notes")) {
      setcurrentTheme("note");
    } else if (currentLocation.includes("/resources")) {
      setcurrentTheme("resource");
    } else {
      setcurrentTheme("task");
    }
  }, [currentLocation]);
  function handleDialogAppearance() {
    setDialogState(!dialogState);
  }

  function getTaskIdAndTheme(id: number | string = -1, theme?: string) {
    if (id !== -1) {
      setcurrentClickedTaskId(id);
    }
    if (theme) {
      setcurrentTheme(theme);
    } else if (dialogThemeState) {
      setcurrentTheme(dialogThemeState);
    }
  }

  function handleSideBarToggle() {
    setSideBarToggle(!sideBarToggle);
  }

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
    default:
      navContentData.title = "app";
      navContentData.subTitle = "Welcome";
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
            <section className="w-full min-h-screen overflow-x-hidden">
              <section>
                <Nav
                  handleDialog={handleDialogAppearance}
                  getTaskIdAndTheme={getTaskIdAndTheme}
                  btnColor="var(--secondaryc)"
                  btnContentColor="whitesmoke"
                  icon={<Plus />}
                  title={navContentData.title}
                  desc={navContentData.subTitle}
                  btnContent={navContentData.btnContent || undefined}
                  handleSideBarToggle={handleSideBarToggle}
                  setIsNotesModalOpen={setIsNotesModalOpen}
                  setIsResourcesModalOpen={setIsResourcesModalOpen}
                />
              </section>

              <section className="main-container mt-11">
                <Outlet
                  context={{
                    getTaskIdAndTheme,
                    handleDialogAppearance,
                    isNotesModalOpen,
                    setIsNotesModalOpen,
                    isResourcesModalOpen,
                    setIsResourcesModalOpen,
                  }}
                />
              </section>
            </section>
          </section>
        </>

  );
}

export default App;
