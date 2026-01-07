import { useState } from "react";
import publicApi from "../../services/publicApi";

const RegisterForm = ({ data = {} }) => {
  const [form, setForm] = useState({
    gym_name: "",
    owner_name: "",
    owner_email: "",
    phone: "",
    plan: "basic",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await publicApi.post("/public/gym-request.php", form);
      alert("Request submitted successfully");
      setForm({
        gym_name: "",
        owner_name: "",
        owner_email: "",
        phone: "",
        plan: "basic",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting request");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            {data.title || "Register Your Gym"}
          </h2>
          <p className="text-gray-500 mt-2">
            {data.subtitle || "Submit your details to get started"}
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <form onSubmit={submit} className="space-y-4">

            <input
              className="w-full input"
              placeholder="Gym Name"
              value={form.gym_name}
              onChange={(e) =>
                setForm({ ...form, gym_name: e.target.value })
              }
              required
            />

            <input
              className="w-full input"
              placeholder="Owner Name"
              value={form.owner_name}
              onChange={(e) =>
                setForm({ ...form, owner_name: e.target.value })
              }
              required
            />

            <input
              type="email"
              className="w-full input"
              placeholder="Owner Email"
              value={form.owner_email}
              onChange={(e) =>
                setForm({ ...form, owner_email: e.target.value })
              }
              required
            />

            <input
              className="w-full input"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <select
              className="w-full input"
              value={form.plan}
              onChange={(e) =>
                setForm({ ...form, plan: e.target.value })
              }
            >
              <option value="basic">Basic Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition"
            >
              {data.submit_text || "Submit Request"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default RegisterForm;
