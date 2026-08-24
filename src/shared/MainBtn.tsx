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
  btnColor,
  btnContentColor,
  onClick,
}: btnData) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: btnColor, color: btnContentColor }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg font-semibold capitalize text-xl cursor-pointer hover:bg-thirdc! duration-150",
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default MainBtn;
