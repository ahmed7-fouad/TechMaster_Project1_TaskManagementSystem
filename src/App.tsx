<<<<<<< HEAD
import "./App.css";
import { Profile } from './pages/profile/Profile';

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./shared/SideBar";
import Nav from "./shared/Nav";
=======
import './App.css'
import {useState} from "react";
import SideBar from './shared/SideBar'
import Nav from './shared/Nav';
>>>>>>> f0c887aca4055e9558b70c490389f1f9e0a272fe
import { Plus } from "lucide-react";
import SearchBar from './shared/SearchBar';
import MainBtn from './shared/MainBtn';
import TasksBar from './components/TasksBar';
import TaskDialog from './shared/TaskDialog';
import { useLocation } from "react-router-dom";

import {Outlet} from "react-router-dom"
function App() {
  const [dialogState, setDialogState] = useState(false);
  const [currentClickedTaskId,setcurrentClickedTaskId]=useState(0);
  const [currentTheme, setcurrentTheme] = useState("task");
  const [sideBarToggle, setSideBarToggle] = useState(false);
  function handleDialogAppearance(){
    setDialogState(!dialogState);
  }

  
  function getTaskIdAndTheme(id=-1,theme){
    if (id!==-1){
      setcurrentClickedTaskId(id)
    }
    if(theme)
      setcurrentTheme(theme)
  }
  
  function handleSideBarToggle(){
      setSideBarToggle(!sideBarToggle);
  }
  
  const location=useLocation();
  const currentLocation=location.pathname;

  let navContentData={
    title:"",
    subTitle:"",
    btnContent:"",
  }

  switch (currentLocation){
    case "/":
    case "/dashboard":
      navContentData.title="dashboard";
      navContentData.subTitle = "Good to see you again, Ahmed! 👋";
      break;
      case "/tasks":
        navContentData.title="tasks";
        navContentData.subTitle = "Manage and organize your tasks";
        navContentData.btnContent="add task";
        break;
        case "/resources":
          navContentData.title="resources";
          navContentData.subTitle = "Store and manage your important links & files";
          navContentData.btnContent="add resource";
          break;
          case "/profile":
            navContentData.title="profile";
            navContentData.subTitle = "Manage your account information";
            break;
            case "/notes":
              navContentData.title="notes";
              navContentData.subTitle = "Capture your ideas and thoughts";
              navContentData.btnContent="add note";
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
              btnContent={navContentData.btnContent||null}
              handleSideBarToggle={handleSideBarToggle}
            />
          </section>

<<<<<<< HEAD
          <Route
            path="/notes"
            element={
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-100 bg-white">
                  <Nav
                    title="Notes"
                    desc="Manage and organize your thoughts & notes"
                    btnContent="Add Note"
                    btnColor="bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    btnContentColor="text-white"
                    icon={<Plus size={18} />}
                    onBtnClick={() => setIsNoteModalOpen(true)}
                  />
                </div>
                <div className="p-6">
                  <Notes
                    isModalOpen={isNoteModalOpen}
                    setIsModalOpen={setIsNoteModalOpen}
                  />
                </div>
              </div>
            }
          />

          <Route
            path="/resources"
            element={
              <Resources
                isModalOpen={isResourceModalOpen}
                setIsModalOpen={setIsResourceModalOpen}
              />
            }
          />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </main>
    </section>
=======
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
>>>>>>> f0c887aca4055e9558b70c490389f1f9e0a272fe
  );
}
export default App;