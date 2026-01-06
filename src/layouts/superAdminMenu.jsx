import {
  LayoutDashboard,
  Dumbbell,
  PlusSquare,
  ClipboardCheck,
  Layers,
  Plus,
  FileText,
  FilePlus,
} from "lucide-react";

const superAdminMenu = [
  {
    section: "Dashboard",
    items: [
      {
        title: "Dashboard",
        path: "/superadmin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "Gym Management",
    items: [
      {
        title: "Gyms",
        path: "/superadmin/gyms",
        icon: Dumbbell,
      },
      {
        title: "Create Gym",
        path: "/superadmin/create-gym",
        icon: PlusSquare,
      },
      {
        title: "Gym Requests",
        path: "/superadmin/requests",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    section: "Templates",
    items: [
      {
        title: "Templates",
        path: "/superadmin/templates",
        icon: Layers,
      },
      {
        title: "Create Template",
        path: "/superadmin/templates/create",
        icon: Plus,
      },
    ],
  },
  {
    section: "Pages",
    items: [
      {
        title: "Pages",
        path: "/superadmin/pages",
        icon: FileText,
      },
      {
        title: "Create Page",
        path: "/superadmin/create-page",
        icon: FilePlus,
      },
    ],
  },
];

export default superAdminMenu;
