import { useEffect, useState } from "react";
import api from "../../../services/api";
import PageTitle from "../../../layouts/PageTitle";
import useAuthUser from "../../../hooks/useAuthUser";
import avatarPlaceholder from "../../../assets/react.svg";
import ProgressRing from "../../../components/ui/ProgressRing";
import AvatarCropModal from "../../../components/ui/AvatarCropModal";
import { getCroppedImg } from "../../../utils/cropImage";

const GymProfile = () => {
  const [gym, setGym] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cropImage, setCropImage] = useState(null);

  const { user, refreshUser } = useAuthUser();

  /* =========================
     IMAGE URLS
  ========================= */
  const profileImage = user?.avatar
    ? `http://localhost/GymsBackend${user.avatar}`
    : avatarPlaceholder;

  const gymLogo = gym?.logo
    ? `http://localhost/GymsBackend${gym.logo}`
    : null;

  /* =========================
     LOAD GYM DATA
  ========================= */
  useEffect(() => {
    api.get("/gym/settings/get.php").then((res) => {
      setGym(res.data.data);
    });
  }, []);

  /* =========================
     DRAG & DROP (AVATAR)
  ========================= */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    handleImageSelect(file);
  };

  /* =========================
     AVATAR SELECT → CROP
  ========================= */
  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onload = () => setCropImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCropSave = async (pixels) => {
    const blob = await getCroppedImg(cropImage, pixels);
    setCropImage(null);
    uploadAvatar(blob);
  };

  /* =========================
     UPLOAD AVATAR
  ========================= */
  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      setProgress(0);

      await api.post("users/upload-avatar.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      window.dispatchEvent(new Event("user-updated"));
      refreshUser();
    } catch {
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 400);
    }
  };

  /* =========================
     REMOVE AVATAR
  ========================= */
  const removeAvatar = async () => {
    if (!window.confirm("Remove profile photo?")) return;

    await api.post("users/remove-avatar.php");
    window.dispatchEvent(new Event("user-updated"));
    refreshUser();
  };

  /* =========================
     UPLOAD GYM LOGO
  ========================= */
  const uploadGymLogo = async (file) => {
    const formData = new FormData();
    formData.append("logo", file);

    try {
      setUploading(true);
      const res = await api.post("/gym/settings/upload-logo.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setGym({ ...gym, logo: res.data.logo });
    } catch {
      alert("Logo upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     SAVE PROFILE
  ========================= */
  const save = async () => {
    await api.post("/gym/settings/update.php", gym);
    alert("Profile updated successfully");
  };

  if (!gym) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 bg-[#f3f6f9] min-h-screen space-y-6">
      <PageTitle title="Gym Profile" subtitle="Manage gym & owner information" />

      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-8">

        {/* =====================
            AVATAR + LOGO
        ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* USER AVATAR */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Your Profile</h3>

            <div className="flex items-center gap-5">
              <div
                className={`relative w-24 h-24 rounded-full overflow-hidden border border-gray-700 bg-gray-800
                ${dragging ? "ring-2 ring-indigo-500" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <img src={profileImage} className="w-full h-full object-cover" />

                {uploading && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <ProgressRing progress={progress} size={44} />
                  </div>
                )}
              </div>

              <div>
                <p className="text-white font-medium">{gym.owner_name}</p>
                <p className="text-sm text-gray-400 mb-2">Gym Owner</p>

                <div className="flex gap-3 text-xs">
                  <label className="text-indigo-400 cursor-pointer hover:underline">
                    Change
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e.target.files[0])}
                    />
                  </label>

                  {user?.avatar && (
                    <button
                      onClick={removeAvatar}
                      className="text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* GYM LOGO */}
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Gym Logo</h3>

            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                {gymLogo ? (
                  <img src={gymLogo} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    No Logo
                  </div>
                )}

                <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-xs text-white cursor-pointer transition">
                  Change
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => uploadGymLogo(e.target.files[0])}
                  />
                </label>
              </div>

              <p className="text-sm text-gray-400">
                Used on website, invoices & emails
              </p>
            </div>
          </div>
        </div>

        {/* =====================
            GYM INFO
        ===================== */}
        <div>
          <h3 className="text-white font-medium mb-4">Gym Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "phone", "city", "state", "country"].map((field) => (
              <input
                key={field}
                className="input"
                placeholder={field}
                value={gym[field] || ""}
                onChange={(e) =>
                  setGym({ ...gym, [field]: e.target.value })
                }
              />
            ))}
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 className="text-white font-medium mb-3">Address</h3>
          <textarea
            className="input min-h-[100px]"
            value={gym.address || ""}
            onChange={(e) =>
              setGym({ ...gym, address: e.target.value })
            }
          />
        </div>

        {/* BRAND COLORS */}
        <div>
          <h3 className="text-white font-medium mb-3">Brand Colors</h3>
          <div className="flex gap-4">
            <input
              type="color"
              value={gym.primary_color || "#4f46e5"}
              onChange={(e) =>
                setGym({ ...gym, primary_color: e.target.value })
              }
            />
            <input
              type="color"
              value={gym.secondary_color || "#22c55e"}
              onChange={(e) =>
                setGym({ ...gym, secondary_color: e.target.value })
              }
            />
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end border-t border-gray-800 pt-4">
          <button
            onClick={save}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {cropImage && (
        <AvatarCropModal
          image={cropImage}
          onClose={() => setCropImage(null)}
          onSave={handleCropSave}
        />
      )}
    </div>
  );
};

export default GymProfile;
