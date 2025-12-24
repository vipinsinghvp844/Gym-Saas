import { useEffect, useState } from "react";
import api from "../../../services/api";

const GymProfile = () => {
  const [gym, setGym] = useState(null);

  useEffect(() => {
    api.get("/gym/settings/get.php").then((res) => {
      setGym(res.data.data);
    });
  }, []);

  const save = async () => {
    await api.post("/gym/settings/update.php", gym);
    alert("Profile updated successfully");
  };

  if (!gym) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto">
      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Gym Profile</h1>
        <p className="text-sm text-gray-400">
          Manage your gym’s basic information and branding
        </p>
      </div>

      {/* CARD */}
      <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 space-y-6">

        {/* BASIC INFO */}
        {/* LOGO UPLOAD */}
<div className="flex items-center gap-6 mb-8">
  <div className="w-24 h-24 rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden">
    {gym.logo ? (
      <img
        src={`http://localhost/GymsBackend${gym.logo}`}
        alt="Gym Logo"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-gray-400 text-sm">No Logo</span>
    )}
  </div>

  <label className="cursor-pointer">
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("logo", file);

        const res = await api.post("/gym/settings/upload-logo.php", formData);


        setGym({ ...gym, logo: res.data.logo });
      }}
    />

    <span className="px-4 py-2 rounded-md bg-brand text-white text-sm">
      Upload Logo
    </span>
  </label>
</div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Gym Name"
              value={gym.name || ""}
              onChange={(e) => setGym({ ...gym, name: e.target.value })}
            />

            <input
              className="input"
              placeholder="Phone"
              value={gym.phone || ""}
              onChange={(e) => setGym({ ...gym, phone: e.target.value })}
            />

            <input
              className="input"
              placeholder="City"
              value={gym.city || ""}
              onChange={(e) => setGym({ ...gym, city: e.target.value })}
            />

            <input
              className="input"
              placeholder="State"
              value={gym.state || ""}
              onChange={(e) => setGym({ ...gym, state: e.target.value })}
            />

            <input
              className="input"
              placeholder="Country"
              value={gym.country || ""}
              onChange={(e) => setGym({ ...gym, country: e.target.value })}
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Address
          </h3>

          <textarea
            className="input min-h-[100px]"
            placeholder="Full Address"
            value={gym.address || ""}
            onChange={(e) => setGym({ ...gym, address: e.target.value })}
          />
        </div>
        {/*branding logo */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="color"
            value={gym.primary_color}
            onChange={e => setGym({ ...gym, primary_color: e.target.value })}
          />
          <input
            type="color"
            value={gym.secondary_color}
            onChange={e => setGym({ ...gym, secondary_color: e.target.value })}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-4 border-t border-gray-800">
          <button
            onClick={save}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GymProfile;
