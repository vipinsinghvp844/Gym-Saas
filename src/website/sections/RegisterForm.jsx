import { useEffect, useState } from "react";
import publicApi from "../../services/publicApi";

const RegisterForm = ({ data = {}, selectedPlan, onPlanReset }) => {
  const [form, setForm] = useState({
    gym_name: "",
    owner_name: "",
    owner_email: "",
    phone: "",
    plan_id: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // ✅ whenever plan selected in Pricing, auto set plan_id in form
  useEffect(() => {
    if (selectedPlan?.id) {
      setForm((prev) => ({
        ...prev,
        plan_id: selectedPlan.id,
      }));
    }
  }, [selectedPlan]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.plan_id) {
      alert("Please select a plan first");
      return;
    }

    try {
      setSubmitting(true);

      await publicApi.post("/public/gym-request.php", form);

      alert("Request submitted successfully ✅");

      setForm({
        gym_name: "",
        owner_name: "",
        owner_email: "",
        phone: "",
        plan_id: "",
      });

      // ✅ reset selected plan (optional)
      onPlanReset?.();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error submitting request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50" id="register">
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
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {/* SELECTED PLAN */}
          <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              Selected Plan:
              <span className="ml-2 font-semibold text-slate-900">
                {selectedPlan?.name || "Not Selected"}
              </span>
            </p>

            {selectedPlan?.price !== undefined && (
              <p className="text-xs text-slate-500 mt-1">
                Price: ₹{selectedPlan.price} / {selectedPlan.billing_cycle}
              </p>
            )}

            {!selectedPlan?.id && (
              <p className="text-xs text-red-600 mt-2">
                Please select a plan from Pricing section first.
              </p>
            )}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Gym Name"
              value={form.gym_name}
              onChange={(e) =>
                setForm({ ...form, gym_name: e.target.value })
              }
              required
            />

            <input
              className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Owner Name"
              value={form.owner_name}
              onChange={(e) =>
                setForm({ ...form, owner_name: e.target.value })
              }
              required
            />

            <input
              type="email"
              className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Owner Email"
              value={form.owner_email}
              onChange={(e) =>
                setForm({ ...form, owner_email: e.target.value })
              }
              required
            />

            <input
              className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            {/* Hidden plan id (optional for debug) */}
            <input type="hidden" value={form.plan_id} readOnly />

            <button
              type="submit"
              disabled={!form.plan_id || submitting}
              className={`w-full h-11 rounded-lg font-semibold text-sm transition ${
                !form.plan_id || submitting
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {submitting ? "Submitting..." : data.submit_text || "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
