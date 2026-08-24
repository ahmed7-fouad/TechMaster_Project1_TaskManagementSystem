import { useState } from "react";
import "./App.css";
import SideBar from "./shared/SideBar";
import Resources from "./pages/Resources/Resources";
import Notes from "./pages/notes/Notes";
import Nav from "./shared/Nav";
import { Plus } from "lucide-react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="grid grid-cols-[21rem_1fr] min-h-screen">
      <SideBar />

      <main className="flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Nav
            title="Notes"
            desc="Manage and organize your thoughts & notes"
            btnContent="Add Note"
            btnColor="bg-indigo-600 hover:bg-indigo-700 transition-colors"
            btnContentColor="text-white"
            icon={<Plus size={18} />}
            onBtnClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="p-6">
          <Notes isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Resources />
        </div>
      </main>
    </section>
  );
}

export default App;
