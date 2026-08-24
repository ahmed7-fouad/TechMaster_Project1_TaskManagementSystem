import './App.css'
import SideBar from './shared/SideBar'
import Nav from './shared/Nav';
import { Plus } from "lucide-react";
import MainBtn from './shared/MainBtn';
function App() {
  return (
    <section className="grid grid-cols-[21rem_1fr]">
      <SideBar />
      <section>
        <Nav
          btnColor="var(--secondaryc)"
          btnContentColor="whitesmoke"
          icon={<Plus />}
          title="tasks"
          desc="manage and organize your tasks"
          btnContent="add task"
        />
      </section>
    </section>
  );
}

export default App
