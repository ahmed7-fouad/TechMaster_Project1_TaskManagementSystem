import type { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import MainBtn from "./MainBtn";
import { Menu, Plus } from "lucide-react";

interface NavData {
  title?: string;
  desc?: string;
  btnColor?: string;
  btnContent?: string;
  icon?: ReactElement;
  btnContentColor?: string;
  handleDialog: () => void;
  getTaskIdAndTheme?: (id: number | string, theme: string) => void;
  handleSideBarToggle: () => void;
  setIsNotesModalOpen?: (open: boolean) => void;
  setIsResourcesModalOpen?: (open: boolean) => void;
}

const Nav = ({
  title,
  desc,
  icon,
  btnContent,
  btnColor,
  btnContentColor,
  handleDialog,
  getTaskIdAndTheme,
  handleSideBarToggle,
  setIsNotesModalOpen,
  setIsResourcesModalOpen,
}: NavData) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isNotesPage = currentPath.includes("/notes");
  const isResourcesPage = currentPath.includes("/resources");

  return (
    <nav className="">
      <section className="main-container flex flex-row justify-between items-center flex-wrap gap-5 py-5">
        <section className="flex items-center">
          <Menu
            className="visible lg:hidden cursor-pointer size-7 me-5 text-gray-700 dark:text-gray-200"
            onClick={handleSideBarToggle}
          />

          <section>
            <h1 className="text-3xl lg:text-4xl capitalize font-semibold mb-3 text-gray-900 dark:text-white">
              {title}
            </h1>
            {desc && (
              <p className="text-xl lg:text-2xl text-muted-text font-medium">
                {desc}
              </p>
            )}
          </section>
        </section>

        {isNotesPage ? (
          <MainBtn
            title="Add Note"
            icon={<Plus size={18} />}
            handleClick={() => setIsNotesModalOpen && setIsNotesModalOpen(true)}
            btnColor="var(--secondaryc)"
            btnContentColor="whitesmoke"
          />
        ) : isResourcesPage ? (
          <MainBtn
            title="Add Resource"
            icon={<Plus size={18} />}
            handleClick={() =>
              setIsResourcesModalOpen && setIsResourcesModalOpen(true)
            }
            btnColor="var(--secondaryc)"
            btnContentColor="whitesmoke"
          />
        ) : (
          btnContent &&
          icon && (
            <MainBtn
              btnContentColor={btnContentColor}
              icon={icon}
              title={btnContent}
              btnColor={btnColor}
              handleClick={handleDialog}
              getTaskIdAndTheme={getTaskIdAndTheme}
            />
          )
        )}
      </section>
    </nav>
  );
};

export default Nav;
