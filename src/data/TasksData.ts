export interface taskCardData {
  id?:number|string,
  title?: string;
  status?: string;
  priority?: string;
  date?: string;
  completed?: boolean;
  iconsState?:boolean;
}


export const AllTasksData: taskCardData[] = [
  {
    id: 1,
    title: "Design homepage",
    status: "In Progress",
    priority: "High",
    date: "May 29, 2025",
    completed: false,
  },
  {
    id: 2,
    title: "API integration",
    status: "Pending",
    priority: "High",
    date: "May 30, 2025",
    completed: false,
  },
  {
    id: 3,
    title: "Write documentation",
    status: "In Progress",
    priority: "Medium",
    date: "May 31, 2025",
    completed: false,
  },
  {
    id: 4,
    title: "User testing",
    status: "Pending",
    priority: "Low",
    date: "Jun 2, 2025",
    completed: false,
  },
  {
    id: 5,
    title: "Fix bugs",
    status: "Completed",
    priority: "High",
    date: "May 25, 2025",
    completed: true,
  },
  {
    id: 6,
    title: "Deploy to production",
    status: "Pending",
    priority: "Medium",
    date: "Jun 5, 2025",
    completed: false,
  },
  {
    id: 7,
    title: "Setup database schema",
    status: "Completed",
    priority: "High",
    date: "May 20, 2025",
    completed: true,
  },
  {
    id: 8,
    title: "Refactor authentication flow",
    status: "In Progress",
    priority: "High",
    date: "Jun 8, 2025",
    completed: false,
  },
  {
    id: 9,
    title: "Update Tailwind styles",
    status: "Pending",
    priority: "Low",
    date: "Jun 10, 2025",
    completed: false,
  },
];
