import { useState } from "react";
import api from "../../services/api";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";

const CreateGym = () => {
  const [form, setForm] = useState({
    gym_name: "",
    gym_slug: "",
    owner_name: "",
    owner_email: "",
    owner_password: "",
  });

  const submit = async () => {
    await api.post("/gyms/create.php", form);
    alert("Gym created successfully");
  };

  return (
    <>
      <h2>Create Gym</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key.replace("_", " ")}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <br /><br />
      <button onClick={submit}>Create</button>
    </>
  );
};

export default CreateGym;
