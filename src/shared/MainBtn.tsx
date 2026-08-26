import { cn } from "../lib/utils";
import type { ReactElement } from "react";
import { Menu } from "lucide-react";

interface btnData {
  icon?: ReactElement;
  title?: string;
  btnColor?: string;
  btnContentColor?: string;
  handleClick?: () => void;
  getTaskIdAndTheme:(id:number|string,theme:string)=>void;
}
const MainBtn = ({
  icon,
  title,
  btnColor,
  btnContentColor,
  handleClick,
  getTaskIdAndTheme,
}: btnData) => {
  return (
    <button
      style={{ backgroundColor: btnColor, color: btnContentColor }}
      onClick={()=>{
        handleClick()
        getTaskIdAndTheme(-1,"task");
      }}
      className={cn(
        "flex items-center gap-3 p-2 lg:p-3 rounded-lg font-semibold capitalize text-md lg:text-xl cursor-pointer hover:bg-thirdc! duration-150",
      )}
    >
      {icon}
      {title}
    </button>
  );
};

export default MainBtn;
