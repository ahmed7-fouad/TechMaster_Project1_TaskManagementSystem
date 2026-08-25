import "./App.css";
// import { Profile } from './pages/profile/Profile';

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./shared/SideBar";
import Nav from "./shared/Nav";
import { Plus } from "lucide-react";
import Notes from "./pages/notes/Notes";
import Resources from "./pages/Resources/Resources";
import Home from "./pages/Home/Home";

export default function App() {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <section className={`${isHomePage ? "" : "grid grid-cols-[21rem_1fr]"} min-h-screen`}>
      {!isHomePage && <SideBar />}

      <main className="flex flex-col bg-gray-50/50">
        <Routes>
          <Route path="/" element={<Home />} />

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
        </Routes>
      </main>
    </section>
  );
}
