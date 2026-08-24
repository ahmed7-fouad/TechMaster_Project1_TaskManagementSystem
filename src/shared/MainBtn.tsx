import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface btnData {
  icon?: ReactNode;
  title?: string;
  btnColor?: string;
  btnContentColor?: string;
  onClick?: () => void;
}

const MainBtn = ({
  icon,
  title,
  btnColor = "bg-indigo-600 hover:bg-indigo-700",
  btnContentColor = "text-white",
  onClick,
}: btnData) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 md:gap-3 p-2 px-3 md:p-3 rounded-lg font-semibold capitalize text-sm md:text-xl cursor-pointer duration-150 transition-colors",
        btnColor,
        btnContentColor,
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default MainBtn;
