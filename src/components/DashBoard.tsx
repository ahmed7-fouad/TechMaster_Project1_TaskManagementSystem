"use client";

import { Pie, PieChart } from "recharts";
import { Flower2 } from "lucide-react";
import {useState,type ReactNode} from "react";
import {v4 as uuid} from "uuid"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useAllTasks } from "@/Providers/ِTasksDataProvider";
// import DashBoardCard from "@/shared/DashboardCard";
import { type MainDashboardCardsData } from "../shared/DashboardCard";
import { taskStateStyle } from "../styles/taskStateStyleConfig";
import { ClipboardList } from "lucide-react";
import { Clock } from "lucide-react";
import { Check } from "lucide-react";
import { Hourglass } from "lucide-react";
import DashBoardCard from "../shared/DashboardCard";
import MainTasksCard from "./MainTaskCard";
import TaskCard from "@/shared/TaskCard";

const DashBoard = () => {
  const {
    tasks,
    allTasksNumber,
    allCompletedTasksNumber,
    allInProgressTasksNumber,
    allPendingTasksNumber,
  } = useAllTasks();


  const chartData = [
    {
      status: "completed",
      tasks: allCompletedTasksNumber,
      fill: "#10B981",
    },
    {
      status: "in progress",
      tasks: allInProgressTasksNumber,
      fill: "#3B82F6",
    },
    {
      status: "pending",
      tasks: allPendingTasksNumber,
      fill: "#EAB308",
    },
  ];

  const chartConfig = {
    tasks: {
      label: "tasks",
    },
    pending: {
      label: "pending",
      color: taskStateStyle.pending.className,
    },
    completed: {
      label: "completed",
      color: taskStateStyle.completed.className,
    },
    "in progress": {
      label: "in progress",
      color: taskStateStyle["in progress"].className,
    },
  } satisfies ChartConfig;


  const dashboardMainCards: MainDashboardCardsData[] = [
    {
      status: taskStateStyle.primary.label,
      title: "total tasks",
      analytics: allTasksNumber,
      subTitle: "all tasks",
      icon: <ClipboardList />,
    },
    {
      status: taskStateStyle["in progress"].label,
      title: taskStateStyle["in progress"].label,
      analytics: allInProgressTasksNumber,
      subTitle: "keep going!",
      icon: <Clock />,
    },
    {
      status: taskStateStyle.completed.label,
      title: taskStateStyle.completed.label,
      analytics: allCompletedTasksNumber,
      subTitle: "great job!",
      icon: <Check />,
    },
    {
      status: taskStateStyle.pending.label,
      title: taskStateStyle.pending.label,
      analytics: allPendingTasksNumber,
      subTitle: "stay focused!",
      icon: <Hourglass />,
    },
  ];
 
   let date = new Date();
   let ukFormat = new Intl.DateTimeFormat("en-GB").format(date); 
  const [dateNow, setDateNow] = useState(ukFormat);
   setInterval(()=>{
      date = new Date();
      ukFormat = new Intl.DateTimeFormat("en-GB").format(date);
     setDateNow(ukFormat);
   },2000)
  return (
    <header className="pb-10">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-7">
        {dashboardMainCards.map((card) => {
          return (
            <DashBoardCard
              key={uuid()}
              status={card.status}
              title={card.title}
              analytics={card.analytics}
              subTitle={card.subTitle}
              icon={card.icon}
            />
          );
        })}
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-5 mb-7">
        {/* Tasks Chart */}
        <MainTasksCard title="tasks overview" cardHeight="33rem">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle className="capitalize text-2xl">your tasks</CardTitle>
              <CardDescription>{dateNow.toString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[21rem]"
              >
                <PieChart>
                  <Pie data={chartData} dataKey="tasks" />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="status" />}
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </MainTasksCard>

        {/* Dashboard Not Completed Tasks */}
        <MainTasksCard title="upcoming tasks" cardHeight="33rem">
          {tasks.map((task) => {
            if (task.status.toLowerCase() !== "completed") {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status?.toLocaleLowerCase()}
                  date={task.date}
                />
              );
            } else {
              return null;
            }
          })}
        </MainTasksCard>
      </section>

      <MainTasksCard bgColor="#E9E6FF" cardHeight="13rem">
        <section className="relative h-full flex items-center">
          <h4 className="text-3xl font-bold dark:text-gray-600">
            "Small steps every day lead to big results."
          </h4>
          <Flower2 className="absolute size-25 text-secondaryc right-0 bottom-0 hidden xl:block" />
        </section>
      </MainTasksCard>
    </header>
  );
};
export default DashBoard;

