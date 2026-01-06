import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  Calendar,
  CreditCard,
  ClipboardList,
  Dumbbell,
  Activity,
  Package,
  MessageSquare,
  Settings,
  Layers,
} from "lucide-react";

const gymAdminMenu = [
  {
    section: "Home",
    items: [
      { title: "Dashboard", path: "/gym/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Business Management",
    items: [
      { title: "Trainers", path: "/gym/trainers", icon: UserCheck },
      { title: "Trainees", path: "/gym/trainees", icon: Users },
      { title: "Classes", path: "/gym/classes", icon: Calendar },
      { title: "Membership", path: "/gym/memberships", icon: ClipboardList },
      { title: "Workouts", path: "/gym/workouts", icon: Dumbbell },
      { title: "Attendance", path: "/gym/attendance", icon: Activity },
      { title: "Finance", path: "/gym/finance", icon: CreditCard },
      { title: "Product Management", path: "/gym/products", icon: Package },
      { title: "Notice Board", path: "/gym/notices", icon: MessageSquare },
    ],
  },
  {
    section: "System Configuration",
    items: [
      { title: "Pages", path: "/gym/pages", icon: Layers },
      { title: "Templates", path: "/gym/templates", icon: Layers },
      { title: "Settings", path: "/gym/settings/profile", icon: Settings },
    ],
  },
];

export default gymAdminMenu;
