import {
  LayoutDashboard,
  FileText,
  Layers,
  Users,
  UserCheck,
  UserX,
  CreditCard,
  Receipt,
  Building,
  Palette,
  Globe,
  LifeBuoy,
} from "lucide-react";

const gymAdminMenu = [
  { title: "Dashboard", path: "/gym/dashboard", icon: LayoutDashboard },

  { title: "Pages", path: "/gym/pages", icon: FileText },
  { title: "Templates", path: "/gym/templates", icon: Layers },

  { title: "All Members", path: "/gym/members", icon: Users },
  { title: "Active Members", path: "/gym/members/active", icon: UserCheck },
  { title: "Inactive Members", path: "/gym/members/inactive", icon: UserX },

  { title: "Plans", path: "/gym/payments/plans", icon: CreditCard },
  { title: "Transactions", path: "/gym/payments/transactions", icon: Receipt },

  { title: "Gym Profile", path: "/gym/settings/profile", icon: Building },
  { title: "Branding", path: "/gym/settings/branding", icon: Palette },
  { title: "Domain", path: "/gym/settings/domain", icon: Globe },

  { title: "Tickets", path: "/gym/support/tickets", icon: LifeBuoy },
];

export default gymAdminMenu;
