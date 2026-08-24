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
    <nav className="border-b-2  border-gray-200">
      <section className="main-container flex items-center justify-between py-5">
        <section>
          <h1 className="text-4xl capitalize font-semibold mb-3">{title}</h1>
          {desc && (
            <p className="text-2xl text-muted-text font-medium">{desc}</p>
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
