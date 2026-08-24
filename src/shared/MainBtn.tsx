import { cn } from "../lib/utils";
import type { ReactElement } from "react";

interface btnData {
  icon?: ReactElement;
  title?: string;
  btnColor?: string;
  btnContentColor?: string;
}
const MainBtn = ({ icon, title, btnColor, btnContentColor }: btnData) => {
  return (
    <button
      style={{ backgroundColor: btnColor, color: btnContentColor }}
      className={cn("flex items-center gap-3 p-3 rounded-lg font-semibold capitalize text-xl cursor-pointer hover:bg-thirdc! duration-150")}>
      {icon}
      {title}
    </button>
  );
};

export default MainBtn;
