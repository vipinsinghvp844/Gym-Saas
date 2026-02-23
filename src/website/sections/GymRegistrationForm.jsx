import { useState } from "react";

/* =========================
   GYM REGISTRATION FORM
========================= */

const GymRegistrationForm = ({
  data = {},
  gym,
  previewMode = false,
}) => {

  /* =========================
     SAFE VALUE HELPER
  ========================= */
  const safe = (v, d) =>
    v === undefined || v === null || v === "" ? d : v;

  /* =========================
     CONTENT (DYNAMIC READY)
  ========================= */
  const heading = safe(data.heading, "Start Your Journey");

  const subheading = safe(
    data.subheading,
    "Fill out the form below and one of our team members will contact you within 24 hours to help you get started."
  );

  const image = safe(
    data.image,
    "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1600&auto=format&fit=crop"
  );

  /* =========================
     FORM STATE
  ========================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: "",
  });

  /* =========================
     TEMP PLANS (later API)
  ========================= */
  const plans = [
    { id: 1, name: "Basic", price: 29 },
    { id: 2, name: "Pro", price: 59 },
    { id: 3, name: "Elite", price: 99 },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (previewMode) {
      alert("Preview mode — submission disabled");
      return;
    }

    console.log("FORM SUBMIT:", form);

    // 👉 next step API call
  };

  return (
    <section id="contact" className="bg-[#0b0f17] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* ================= IMAGE ================= */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={image}
            alt="Gym"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ================= FORM CARD ================= */}
        <div className="bg-gradient-to-br from-[#141a26] to-[#1c2230] rounded-2xl p-8 border border-white/10">

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {heading}
          </h2>

          <p className="text-white/70 mb-8">
            {subheading}
          </p>

          <form onSubmit={submit} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm text-white/80">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-1 h-11 px-4 rounded-xl bg-black border border-white/10 focus:border-red-500 outline-none"
                placeholder="John Doe"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-white/80">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 h-11 px-4 rounded-xl bg-black border border-white/10 focus:border-red-500 outline-none"
                placeholder="john@example.com"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-white/80">
                Phone Number *
              </label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 h-11 px-4 rounded-xl bg-black border border-white/10 focus:border-red-500 outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* PLAN SELECT */}
            <div>
              <label className="text-sm text-white/80">
                Select Plan
              </label>

              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className="w-full mt-1 h-11 px-4 rounded-xl bg-black border border-white/10 focus:border-red-500 outline-none"
              >
                <option value="">Choose Plan</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.price}/month
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm text-white/80">
                Message (Optional)
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="w-full mt-1 p-4 rounded-xl bg-black border border-white/10 focus:border-red-500 outline-none"
                placeholder="Tell us about your fitness goals..."
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-red-500 hover:bg-red-600 font-semibold transition"
            >
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default GymRegistrationForm;