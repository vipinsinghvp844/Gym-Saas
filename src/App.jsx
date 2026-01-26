import { BrowserRouter, Routes, Route } from "react-router-dom";
import "tailwindcss";
import Login from "./pages/Login";

/* =======================
   SUPER ADMIN PAGES
======================= */
import Dashboard from "./pages/superadmin/Dashboard";
import Gyms from "./pages/superadmin/Gyms";
import CreateGym from "./pages/superadmin/CreateGym";
import Requests from "./pages/superadmin/Requests";
import Templates from "./pages/superadmin/Templates";
import Pages from "./pages/superadmin/pages";
import CreatePage from "./pages/superadmin/CreatePage";
import EditPage from "./pages/superadmin/EditPage";
import CreateTemplate from "./pages/superadmin/CreateTemplate";
import SuperAdminProfile from "./pages/superadmin/settings/profile";
import GymPlans from "./pages/superadmin/GymPlans";
import Plans from "./pages/superadmin/Plans";
import Subscriptions from "./pages/superadmin/Subscriptions";
import Payments from "./pages/superadmin/Payments";
import Invoices from "./pages/superadmin/Invoices";
import RevenueAnalytics from "./pages/superadmin/RevenueAnalytics";
import GymGrowth from "./pages/superadmin/GymGrowth";
import UsageReports from "./pages/superadmin/UsageReports";
import EmailTemplates from "./pages/superadmin/EmailTemplates";
import SupportTickets from "./pages/superadmin/SupportTickets";
import Announcements from "./pages/superadmin/Announcements";
import Settings from "./pages/superadmin/Settings";
import AuditLogs from "./pages/superadmin/AuditLogs";

/* =======================
   GYM ADMIN PAGES
======================= */
import GymDashboard from "./pages/gymadmin/Dashboard";
import GymPages from "./pages/gymadmin/pages";
import EditGymPage from "./pages/gymadmin/pages/EditPage";
import GymProfile from "../src/pages/gymadmin/settings/Profile";

/* =======================
   LAYOUTS & AUTH
======================= */
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import GymAdminLayout from "./layouts/GymAdminLayout";

/* =======================
   PUBLIC WEBSITE
======================= */
import PageRenderer from "./website/PageRenderer";
import GymPageRenderer from "./website/GymPageRenderer";
import Integrations from "./pages/superadmin/Integrations";
import EditTemplate from "./pages/superadmin/EmailTemplates";
import CreatePlan from "./pages/superadmin/CreatePlan";
import EditPlan from "./pages/superadmin/EditPlan";
import BillingRequired from "../src/pages/gymadmin/BillingRequired";
import CreateEmailTemplate from "./pages/superadmin/CreateEmailTemplate";
import EditEmailTemplate from "./pages/superadmin/EditEmailTemplate";




function App() {
  return (
    <Routes>

      {/* =======================
            PUBLIC
        ======================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PageRenderer />} />

      {/* =======================
            CHANGE PASSWORD
        ======================= */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* =======================
            SUPER ADMIN (NESTED)
        ======================= */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute role="super_admin">
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gyms" element={<Gyms />} />
        <Route path="gyms/:id" element={<Gyms />} />
        <Route path="gyms/:id/edit" element={<Gyms />} />
        <Route path="gyms/:id/billing" element={<Gyms />} />
        <Route path="create-gym" element={<CreateGym />} />
        <Route path="requests" element={<Requests />} />
        <Route path="templates" element={<Templates />} />
        <Route path="templates/create" element={<CreateTemplate />} />
        <Route path="templates/edit/:id" element={<EditTemplate />} />
        <Route path="pages" element={<Pages />} />
        <Route path="pages/edit/:id" element={<EditPage />} />
        <Route path="pages/create" element={<CreatePage />} />
        <Route path="email-templates/create" element={<CreateEmailTemplate />} />
        <Route path="email-templates/edit/:id" element={<EditEmailTemplate />} />
        <Route path="gym-plans" element={<GymPlans />} />
        <Route path="billing/plans" element={<Plans />} />
        <Route path="billing/plans/create" element={<CreatePlan />} />
        <Route path="billing/plans/edit/:id" element={<EditPlan />} />
        <Route path="billing/subscriptions" element={<Subscriptions />} />
        <Route path="billing/payments" element={<Payments />} />
        <Route path="billing/invoices" element={<Invoices />} />
        <Route path="analytics/revenue" element={<RevenueAnalytics />} />
        <Route path="analytics/gym-growth" element={<GymGrowth />} />
        <Route path="analytics/usage" element={<UsageReports />} />
        <Route path="email-templates" element={<EmailTemplates />} />
        <Route path="support/tickets" element={<SupportTickets />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="settings" element={<Settings />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="integrations" element={<Integrations />} />


        <Route path="pages/edit/:id" element={<EditPage />} />
        <Route path="setting/profile" element={<SuperAdminProfile />} />
      </Route>

      {/* =======================
            GYM ADMIN (NESTED)
        ======================= */}
      <Route
        path="/gym/billing-required"
        element={
          <ProtectedRoute role="gym_admin">
            <BillingRequired />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gym"
        element={
          <ProtectedRoute role="gym_admin">
            <GymAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<GymDashboard />} />
        <Route path="pages" element={<GymPages />} />
        <Route path="pages/edit/:id" element={<EditGymPage />} />
        <Route path="setting/profile" element={<GymProfile />} />

      </Route>

      {/* =======================
            PUBLIC WEBSITE
            (ALWAYS LAST)
        ======================= */}
      <Route path="/g/:gym" element={<GymPageRenderer />} />
      <Route path="/g/:gym/:slug" element={<GymPageRenderer />} />
      <Route path="/p" element={<PageRenderer />} />
      <Route path="/p/:slug" element={<PageRenderer />} />

    </Routes>
  );
}

export default App;
