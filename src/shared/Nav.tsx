import type { ReactNode } from "react";
import MainBtn from "./MainBtn";

interface navData {
  title?: string;
  desc?: string;
  btnColor?: string;
  btnContent?: string;
  icon?: ReactNode;
  btnContentColor?: string;
  onBtnClick?: () => void;
}

const Nav = ({
  title,
  desc,
  icon,
  btnContent,
  btnColor,
  btnContentColor,
  onBtnClick,
}: navData) => {
  return (
    <nav className="">
      <section className="main-container flex items-center justify-between py-5">
        <section>
          <h1 className="md:text-4xl text-2xl text-indigo-700 capitalize font-semibold mb-3">{title}</h1>
          {desc && (
            <p className="md:text-2xl text-sm text-muted-text font-medium">{desc}</p>
          )}
        </section>

        {btnContent && icon && (
          <MainBtn
            btnContentColor={btnContentColor}
            icon={icon}
            title={btnContent}
            btnColor={btnColor}
            onClick={onBtnClick}
          />
        )}
      </section>
    </nav>
  );
};

export default Nav;
