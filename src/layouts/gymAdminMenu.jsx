import {
  LayoutDashboard,
  Users,
  Dumbbell,
  UserCircle,
  Calendar,
  Clock,
  CreditCard,
  BarChart3,
  DollarSign,
  TrendingUp,
  Megaphone,
  Bell,
  Settings,
  Shield,
} from "lucide-react";

const gymAdminMenu = [
  {
    section: "CORE",
    items: [
      {
        title: "Dashboard",
        path: "/gym/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    section: "GYM OPERATIONS",
    items: [
      {
        title: "Members",
        path: "/gym/members",
        icon: Users,
      },
      {
        title: "Trainers",
        path: "/gym/trainers",
        icon: Dumbbell,
      },
      {
        title: "Staff",
        path: "/gym/staff",
        icon: UserCircle,
      },
    ],
  },

  {
    section: "GYM MANAGEMENT",
    items: [
      {
        title: "Classes",
        path: "/gym/classes",
        icon: Calendar,
      },
      {
        title: "Schedules",
        path: "/gym/schedules",
        icon: Clock,
      },
      {
        title: "Membership Plans",
        path: "/gym/membership-plans",
        icon: CreditCard,
      },
    ],
  },

  {
    section: "REPORTS",
    items: [
      {
        title: "Attendance",
        path: "/gym/reports/attendance",
        icon: BarChart3,
      },
      {
        title: "Revenue",
        path: "/gym/reports/revenue",
        icon: DollarSign,
      },
      {
        title: "Performance",
        path: "/gym/reports/performance",
        icon: TrendingUp,
      },
    ],
  },

  {
    section: "COMMUNICATION",
    items: [
      {
        title: "Announcements",
        path: "/gym/announcements",
        icon: Megaphone,
      },
      {
        title: "Notifications",
        path: "/gym/notifications",
        icon: Bell,
      },
    ],
  },

  {
    section: "SETTINGS",
    items: [
      {
        title: "Gym Settings",
        path: "/gym/settings",
        icon: Settings,
      },
      {
        title: "Roles & Permissions",
        path: "/gym/roles",
        icon: Shield,
      },
    ],
  },
];

export default gymAdminMenu;
