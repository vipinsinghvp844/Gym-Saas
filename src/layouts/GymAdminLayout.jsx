import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import api from "../services/api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import gymAdminMenu from "./gymAdminMenu";

const GymAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.get("/gym/settings/get.php").then((res) => {
      const gym = res.data.data;

      localStorage.setItem("primary_color", gym.primary_color);
      localStorage.setItem("secondary_color", gym.secondary_color);

      document.documentElement.style.setProperty(
        "--brand-primary",
        gym.primary_color
      );
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* OVERLAY (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        title="Gym Panel"
        menu={gymAdminMenu}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeClass="bg-brand"
        baseBg="bg-[#1f2937]"
      />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GymAdminLayout;
