import type { ReactNode } from "react";
import MainBtn from "./MainBtn";
import { Menu } from "lucide-react";

interface navData {
  title?: string;
  desc?: string;
  btnColor?: string;
  btnContent?: string;
  icon?: ReactElement;
  btnContentColor?: string;
  handleDialog: () => void;
  getTaskIdAndTheme: (id?: number | string, theme?: string) => void;
  handleSideBarToggle:()=>void;
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
}: navData) => {
  return (
    <nav className="">
      <section className="main-container  flex  flex-row justify-between items-center flex-wrap gap-5 py-5 ">
        <section className="flex items-center">
          <Menu className="visible lg:hidden cursor-pointer size-7  bggreen-500 me-5" onClick={handleSideBarToggle}/>

          <section>
            <h1 className="text-3xl lg:text-4xl capitalize font-semibold mb-3">
              {title}
            </h1>
            {desc && (
              <p className="text-xl lg:text-2xl text-muted-text font-medium">
                {desc}
              </p>
            )}
          </section>
        </section>

        {btnContent && icon && (
          <MainBtn
            btnContentColor={btnContentColor}
            icon={icon}
            title={btnContent}
            btnColor={btnColor}
            handleClick={handleDialog}
            getTaskIdAndTheme={getTaskIdAndTheme}
          />
        )}
      </section>
    </nav>
  );
};

    

export default Nav;
