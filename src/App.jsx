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

/* =======================
   GYM ADMIN PAGES
======================= */
import GymDashboard from "./pages/gymadmin/Dashboard";
import GymPages from "./pages/gymadmin/pages";
import EditGymPage from "./pages/gymadmin/pages/EditPage";
import GymProfile from "../src/pages/gymadmin/settings/Profile"

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
import SuperAdminProfile from "./pages/superadmin/settings/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =======================
            PUBLIC
        ======================= */}
        <Route path="/" element={<Login />} />

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
          <Route path="create-gym" element={<CreateGym />} />
          <Route path="requests" element={<Requests />} />
          <Route path="templates" element={<Templates />} />
          <Route path="templates/create" element={<CreateTemplate />} />
          <Route path="pages" element={<Pages />} />
          <Route path="create-page" element={<CreatePage />} />
          <Route path="pages/edit/:id" element={<EditPage />} />
          <Route path="setting/profile" element={<SuperAdminProfile />} />
        </Route>

        {/* =======================
            GYM ADMIN (NESTED)
        ======================= */}
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
          <Route path="setting/profile" element={<GymProfile/>}/>
        </Route>

        {/* =======================
            PUBLIC WEBSITE
            (ALWAYS LAST)
        ======================= */}
        <Route path="/g/:gym" element={<GymPageRenderer />} />
        <Route path="/g/:gym/:slug" element={<GymPageRenderer />} />
        <Route path="/:slug" element={<PageRenderer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
