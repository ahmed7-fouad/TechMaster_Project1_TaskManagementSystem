import { useState } from "react";
import "./App.css";
import SideBar from "./shared/SideBar";
import Nav from "./shared/Nav";
import { Plus } from "lucide-react";
import Notes from "./pages/notes/Notes";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className="grid grid-cols-[21rem_1fr] min-h-screen">
      <SideBar />

      <main className="flex flex-col">
        <Nav
          btnColor="var(--secondaryc)"
          btnContentColor="whitesmoke"
          icon={<Plus />}
          title="Notes"
          desc="Manage and organize your personal notes"
          btnContent="Add Note"
          onBtnClick={() => setIsModalOpen(true)}
        />

        <div className="p-4">
          <Notes isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      </main>
    </section>
  );
}

export default App;
