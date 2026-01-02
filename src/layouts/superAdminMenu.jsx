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
  { title: "Dashboard", path: "/superadmin/dashboard", icon: LayoutDashboard },
  { title: "Gyms", path: "/superadmin/gyms", icon: Dumbbell },
  { title: "Create Gym", path: "/superadmin/create-gym", icon: PlusSquare },
  { title: "Gym Requests", path: "/superadmin/requests", icon: ClipboardCheck },
  { title: "Templates", path: "/superadmin/templates", icon: Layers },
  { title: "Create Template", path: "/superadmin/templates/create", icon: Plus },
  { title: "Pages", path: "/superadmin/pages", icon: FileText },
  { title: "Create Page", path: "/superadmin/create-page", icon: FilePlus },
];

export default superAdminMenu;
