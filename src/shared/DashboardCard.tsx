import {type ReactNode} from "react";
import { taskStateStyle } from "@/styles/taskStateStyleConfig";
import { cn } from "@/lib/utils";

export interface MainDashboardCardsData {
  status?: string;
  title?: string;
  analytics?: number;
  subTitle?: string;
  icon?: ReactNode;
}

const DashBoardCard = ({
  status,
  title,
  analytics,
  subTitle,
  icon,
}: MainDashboardCardsData) => {
  let cardStyle = "";
  if (status == "completed") {
    cardStyle = taskStateStyle.completed.className;
  } else if (status == "pending") {
    cardStyle = taskStateStyle.pending.className;
  } else if (status == "in progress") {
    cardStyle = taskStateStyle["in progress"].className;
  } else if (status == "primary") {
    cardStyle = taskStateStyle.primary.className;
  }

  return (
    <section
      className={cn(
        "rounded-lg p-4 flex justify-between flex-wrap gap-5 shadow-md",
        cardStyle,
      )}
    >
      {/* Text Content */}
      <section className="space-y-3">
        <h3 className="text-lg capitalize font-medium">{title}</h3>
        <p className="text-3xl font-bold">{analytics}</p>
        <p className="text-muted-text capitalize">{subTitle}</p>
      </section>
      {/* Icon */}
      <section className="p-3 rounded-full bg-white shadow-md size-15 flex items-center justify-center">{icon}</section>
    </section>
  );
};
export default DashBoardCard;