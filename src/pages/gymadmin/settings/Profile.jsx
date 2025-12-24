import { useEffect, useState } from "react";
import api from "../../../services/api";

const GymProfile = () => {
  const [gym, setGym] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get("/gym/settings/get.php").then((res) => {
      setGym(res.data.data);
    });
  }, []);
  const save = async () => {
    await api.post("/gym/settings/update.php", gym);
    alert("Profile updated successfully");
  };
  const uploadUserImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await api.post("users/upload-avatar.php", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setGym({
        ...gym,
        user_profile_image: res.data.image
      });

    } catch (err) {
      alert("Profile image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const uploadGymLogo = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);

    try {
      setUploading(true);

      const res = await api.post("/gym/settings/upload-logo.php", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setGym({
        ...gym,
        logo: res.data.logo
      });

    } catch (err) {
      alert("Logo upload failed");
    } finally {
      setUploading(false);
    }
  };



  if (!gym) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto ">
      <h1 className="text-2xl font-semibold text-white mb-1">
        Gym Profile
      </h1>
      <p className="text-gray-400 mb-6">
        Manage gym & owner information
      </p>
      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-8">
        {/* PROFILE & LOGO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* USER PROFILE IMAGE */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Your Profile</h3>

            <div className="flex items-center gap-5">
              <div className="relative group w-24 h-24">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
                  {gym.user_profile_image ? (
                    <img
                      src={`http://localhost/GymsBackend${gym.user_profile_image}`}
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                      No Photo
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
                  {uploading ? "Uploading..." : "Change"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => uploadUserImage(e.target.files[0])}
                  />
                </label>
              </div>

              <div>
                <p className="text-white font-medium">{gym.owner_name}</p>
                <p className="text-sm text-gray-400">Gym Owner</p>
              </div>
            </div>
          </div>

          {/* GYM LOGO */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Gym Logo</h3>

            <div className="flex items-center gap-5">
              <div className="relative group w-24 h-24">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                  {gym.logo ? (
                    <img
                      src={`http://localhost/GymsBackend${gym.logo}`}
                      className="w-full h-full object-cover"
                      alt="Gym Logo"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                      No Logo
                    </div>
                  )}
                </div>

                <label className="absolute inset-0 rounded-lg bg-black/60 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
                  Change
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      uploadGymLogo(e.target.files[0], "logo")
                    }
                  />
                </label>
              </div>

              <p className="text-sm text-gray-400">
                Used on website, invoices & emails
              </p>
            </div>
          </div>
        </div>


        {/* BASIC INFO */}
        <div>
          <h3 className="text-white font-medium mb-4">Gym Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="Gym Name"
              value={gym.name || ""}
              onChange={e => setGym({ ...gym, name: e.target.value })}
            />
            <input className="input" placeholder="Phone"
              value={gym.phone || ""}
              onChange={e => setGym({ ...gym, phone: e.target.value })}
            />
            <input className="input" placeholder="City"
              value={gym.city || ""}
              onChange={e => setGym({ ...gym, city: e.target.value })}
            />
            <input className="input" placeholder="State"
              value={gym.state || ""}
              onChange={e => setGym({ ...gym, state: e.target.value })}
            />
            <input className="input" placeholder="Country"
              value={gym.country || ""}
              onChange={e => setGym({ ...gym, country: e.target.value })}
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 className="text-white font-medium mb-3">Address</h3>
          <textarea
            className="input min-h-[100px]"
            placeholder="Full Address"
            value={gym.address || ""}
            onChange={e => setGym({ ...gym, address: e.target.value })}
          />
        </div>

        {/* BRANDING */}
        <div>
          <h3 className="text-white font-medium mb-3">Brand Colors</h3>
          <div className="flex gap-4">
            <input
              type="color"
              value={gym.primary_color || "#4f46e5"}
              onChange={e => setGym({ ...gym, primary_color: e.target.value })}
            />
            <input
              type="color"
              value={gym.secondary_color || "#22c55e"}
              onChange={e => setGym({ ...gym, secondary_color: e.target.value })}
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end border-t border-gray-800 pt-4">
          <button
            onClick={save}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default GymProfile;
