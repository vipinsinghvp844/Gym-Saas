import { useEffect, useMemo, useState } from "react";
import publicApi from "../../services/publicApi";

const isValidEmail = (email) => {
  const v = String(email || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

const isValidPhone = (phone) => {
  const v = String(phone || "").trim();
  // India friendly: allow 10 digits
  const onlyDigits = v.replace(/\D/g, "");
  return onlyDigits.length >= 10 && onlyDigits.length <= 13;
};

const RegisterForm = ({ data = {}, selectedPlan, onPlanReset }) => {
  const [form, setForm] = useState({
    gym_name: "",
    owner_name: "",
    owner_email: "",
    phone: "",
    city: "",
    note: "",
    plan_id: "",
  });

  const [agree, setAgree] = useState(false);
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

  const errors = useMemo(() => {
    const e = {};

    if (!form.gym_name.trim()) e.gym_name = "Gym name is required";
    if (!form.owner_name.trim()) e.owner_name = "Owner name is required";

    if (!form.owner_email.trim()) e.owner_email = "Email is required";
    else if (!isValidEmail(form.owner_email)) e.owner_email = "Invalid email";

    if (!form.plan_id) e.plan_id = "Please select a plan";
    if (form.phone.trim() && !isValidPhone(form.phone)) e.phone = "Invalid phone";

    if (!agree) e.agree = "Please accept Terms & Privacy";

    return e;
  }, [form, agree]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const submit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      // quick alert only, optional
      if (errors.plan_id) return alert("Please select a plan first");
      if (errors.agree) return alert("Please accept Terms & Privacy");
      return alert("Please fix form errors");
    }

    try {
      setSubmitting(true);

      await publicApi.post("/public/gym-request.php", {
        gym_name: form.gym_name.trim(),
        owner_name: form.owner_name.trim(),
        owner_email: form.owner_email.trim().toLowerCase(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        note: form.note.trim(),
        plan_id: Number(form.plan_id),
      });

      alert("Request submitted successfully ✅");

      setForm({
        gym_name: "",
        owner_name: "",
        owner_email: "",
        phone: "",
        city: "",
        note: "",
        plan_id: "",
      });

      setAgree(false);

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
            {/* Gym Name */}
            <div>
              <input
                className={`w-full h-11 px-3 rounded-lg border text-sm outline-none focus:ring-2 ${
                  errors.gym_name
                    ? "border-red-300 focus:ring-red-300"
                    : "border-slate-200 focus:ring-indigo-500"
                }`}
                placeholder="Gym Name"
                value={form.gym_name}
                onChange={(e) =>
                  setForm({ ...form, gym_name: e.target.value })
                }
                required
              />
              {errors.gym_name && (
                <p className="text-xs text-red-600 mt-1">{errors.gym_name}</p>
              )}
            </div>

            {/* Owner Name */}
            <div>
              <input
                className={`w-full h-11 px-3 rounded-lg border text-sm outline-none focus:ring-2 ${
                  errors.owner_name
                    ? "border-red-300 focus:ring-red-300"
                    : "border-slate-200 focus:ring-indigo-500"
                }`}
                placeholder="Owner Name"
                value={form.owner_name}
                onChange={(e) =>
                  setForm({ ...form, owner_name: e.target.value })
                }
                required
              />
              {errors.owner_name && (
                <p className="text-xs text-red-600 mt-1">{errors.owner_name}</p>
              )}
            </div>

            {/* Owner Email */}
            <div>
              <input
                type="email"
                className={`w-full h-11 px-3 rounded-lg border text-sm outline-none focus:ring-2 ${
                  errors.owner_email
                    ? "border-red-300 focus:ring-red-300"
                    : "border-slate-200 focus:ring-indigo-500"
                }`}
                placeholder="Owner Email"
                value={form.owner_email}
                onChange={(e) =>
                  setForm({ ...form, owner_email: e.target.value })
                }
                required
              />
              {errors.owner_email && (
                <p className="text-xs text-red-600 mt-1">{errors.owner_email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                className={`w-full h-11 px-3 rounded-lg border text-sm outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-300 focus:ring-red-300"
                    : "border-slate-200 focus:ring-indigo-500"
                }`}
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* City (optional) */}
            <input
              className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="City (optional)"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            {/* Note (optional) */}
            <textarea
              className="w-full min-h-[90px] px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Any note for admin (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-300"
              />
              <p className="text-sm text-slate-600">
                I agree to the{" "}
                <span className="font-semibold text-slate-900">
                  Terms & Privacy Policy
                </span>
              </p>
            </div>
            {errors.agree && (
              <p className="text-xs text-red-600 -mt-2">{errors.agree}</p>
            )}

            {/* Hidden plan id (optional debug) */}
            <input type="hidden" value={form.plan_id} readOnly />

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full h-11 rounded-lg font-semibold text-sm transition ${
                !canSubmit
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {submitting
                ? "Submitting..."
                : data.submit_text || "Submit Request"}
            </button>
          </form>

          {/* Helper */}
          {!form.plan_id && (
            <p className="text-xs text-slate-500 mt-4 text-center">
              Plan select करके ही register request submit होगी ✅
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
