import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  GitPullRequest,
  Package,
  Users,
  Shield,
  CreditCard,
  DollarSign,
  Receipt,
  TrendingUp,
  BarChart3,
  Activity,
  FileStack,
  FileText,
  Mail,
  HelpCircle,
  Megaphone,
  Settings,
  FileCheck,
  Plug,
} from "lucide-react";

const superAdminMenu = [
  /* ================= CORE ================= */
  {
    section: "CORE",
    items: [
      {
        title: "Dashboard",
        path: "/superadmin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  /* ============ GYM MANAGEMENT ============ */
  {
    section: "GYM MANAGEMENT",
    items: [
      {
        title: "Gyms",
        path: "/superadmin/gyms",
        icon: Building2,
      },
      {
        title: "Create Gym",
        path: "/superadmin/create-gym",
        icon: PlusCircle,
      },
      {
        title: "Gym Requests",
        path: "/superadmin/requests",
        icon: GitPullRequest,
      },
      {
        title: "Gym Plans",
        path: "/superadmin/gym-plans",
        icon: Package,
      },
    ],
  },

  /* ================= BILLING ================= */
  {
    section: "BILLING",
    items: [
      {
        title: "Plans",
        path: "/superadmin/billing/plans",
        icon: Package,
      },
      {
        title: "Subscriptions",
        path: "/superadmin/billing/subscriptions",
        icon: CreditCard,
      },
      {
        title: "Payments",
        path: "/superadmin/billing/payments",
        icon: DollarSign,
      },
      {
        title: "Invoices",
        path: "/superadmin/billing/invoices",
        icon: Receipt,
      },
    ],
  },

  /* ================= ANALYTICS ================= */
  {
    section: "ANALYTICS",
    items: [
      {
        title: "Revenue Analytics",
        path: "/superadmin/analytics/revenue",
        icon: TrendingUp,
      },
      {
        title: "Gym Growth",
        path: "/superadmin/analytics/gym-growth",
        icon: BarChart3,
      },
      {
        title: "Usage Reports",
        path: "/superadmin/analytics/usage",
        icon: Activity,
      },
    ],
  },

  /* ================= CONTENT ================= */
  {
    section: "CONTENT",
    items: [
      {
        title: "Templates",
        path: "/superadmin/templates",
        icon: FileStack,
      },
      {
        title: "Pages",
        path: "/superadmin/pages",
        icon: FileText,
      },
      {
        title: "Email Templates",
        path: "/superadmin/email-templates",
        icon: Mail,
      },
    ],
  },

  /* ================= SUPPORT ================= */
  {
    section: "SUPPORT",
    items: [
      {
        title: "Support Tickets",
        path: "/superadmin/support/tickets",
        icon: HelpCircle,
      },
      {
        title: "Announcements",
        path: "/superadmin/announcements",
        icon: Megaphone,
      },
    ],
  },

  /* ================= SYSTEM ================= */
  {
    section: "SYSTEM",
    items: [
      {
        title: "Settings",
        path: "/superadmin/settings",
        icon: Settings,
      },
      {
        title: "Audit Logs",
        path: "/superadmin/audit-logs",
        icon: FileCheck,
      },
      {
        title: "Integrations",
        path: "/superadmin/integrations",
        icon: Plug,
      },
    ],
  },
];

export default superAdminMenu;
