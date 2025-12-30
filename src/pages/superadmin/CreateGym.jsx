import { useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";

const CreateGym = () => {

  const [form, setForm] = useState({
    gym_name: "",
    gym_slug: "",
    owner_name: "",
    owner_email: "",
    owner_password: "",
  });

  const submit = async () => {
    try{
      await api.post("/gyms/create.php", form);
    alert("Gym created successfully");
    navigate(-1);
    }catch(error){
      console.error
    }
    
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white">

      {/* HEADER */}
      <PageHeader
        title="Create Gym"
        subtitle="Register a new gym and create its owner account"
      />



      {/* FORM CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">

        {/* Gym Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gym Name
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter gym name"
            value={form.gym_name}
            onChange={(e) =>
              setForm({ ...form, gym_name: e.target.value })
            }
          />
        </div>

        {/* Gym Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gym Slug
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. iron-fitness"
            value={form.gym_slug}
            onChange={(e) =>
              setForm({ ...form, gym_slug: e.target.value })
            }
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner Name
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter owner name"
            value={form.owner_name}
            onChange={(e) =>
              setForm({ ...form, owner_name: e.target.value })
            }
          />
        </div>

        {/* Owner Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="owner@email.com"
            value={form.owner_email}
            onChange={(e) =>
              setForm({ ...form, owner_email: e.target.value })
            }
          />
        </div>

        {/* Owner Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Owner Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
            value={form.owner_password}
            onChange={(e) =>
              setForm({ ...form, owner_password: e.target.value })
            }
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={submit}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
          >
            Create Gym
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateGym;
