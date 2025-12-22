import { useState } from "react";
import publicApi from "../../services/publicApi";

const RegisterForm = ({ data }) => {
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
    <section style={{ padding: 40, background: "#f5f5f5" }}>
      <h3>Register Your Gym</h3>

      <form onSubmit={submit}>
        <input
          placeholder="Gym Name"
          value={form.gym_name}
          onChange={(e) =>
            setForm({ ...form, gym_name: e.target.value })
          }
        />

        <input
          placeholder="Owner Name"
          value={form.owner_name}
          onChange={(e) =>
            setForm({ ...form, owner_name: e.target.value })
          }
        />

        <input
          placeholder="Owner Email"
          value={form.owner_email}
          onChange={(e) =>
            setForm({ ...form, owner_email: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <select
          value={form.plan}
          onChange={(e) =>
            setForm({ ...form, plan: e.target.value })
          }
        >
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>

        <br /><br />

        <button type="submit">
          {data.submit_text || "Submit Request"}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
