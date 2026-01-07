import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import { createGym } from "../../../redux/actions/gymAction";

const CreateGym = () => {
  const [form, setForm] = useState({
    gym_name: "",
    gym_slug: "",
    owner_name: "",
    owner_email: "",
    owner_password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creating } = useSelector((state) => state.gym);

  const submit = (e) => {
    e.preventDefault();
    dispatch(createGym(form, navigate));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white">
      <PageHeader
        title="Create Gym"
        subtitle="Register a new gym and create its owner account"
      />

      <form
        onSubmit={submit}
        className="bg-white border border-gray-200 rounded-xl p-6 space-y-5"
      >
        {/* Gym Name */}
        <input
          className="input"
          placeholder="Gym Name"
          value={form.gym_name}
          onChange={(e) =>
            setForm({ ...form, gym_name: e.target.value })
          }
          required
        />

        {/* Gym Slug */}
        <input
          className="input"
          placeholder="Gym Slug (iron-fitness)"
          value={form.gym_slug}
          onChange={(e) =>
            setForm({ ...form, gym_slug: e.target.value })
          }
          required
        />

        {/* Owner Name */}
        <input
          className="input"
          placeholder="Owner Name"
          value={form.owner_name}
          onChange={(e) =>
            setForm({ ...form, owner_name: e.target.value })
          }
          required
        />

        {/* Owner Email */}
        <input
          type="email"
          className="input"
          placeholder="Owner Email"
          value={form.owner_email}
          onChange={(e) =>
            setForm({ ...form, owner_email: e.target.value })
          }
          required
        />

        {/* Owner Password */}
        <input
          type="password"
          className="input"
          placeholder="Owner Password"
          value={form.owner_password}
          onChange={(e) =>
            setForm({ ...form, owner_password: e.target.value })
          }
          required
        />

        {/* ACTION */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={creating}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm
              hover:bg-indigo-700 disabled:opacity-60"
          >
            {creating ? "Creating..." : "Create Gym"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGym;
