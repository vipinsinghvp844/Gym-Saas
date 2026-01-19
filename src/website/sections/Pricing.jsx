import { useEffect, useState } from "react";
import publicApi from "../../services/publicApi";

const Pricing = ({ data = {}, onSelectPlan, selectedPlan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await publicApi.get("/public/plans.php");
      setPlans(res.data.data || []);
    } catch (err) {
      console.error("Failed to load public plans", err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {data?.heading || "Pricing Plans"}
          </h2>
          <p className="text-gray-500 mt-2">
            {data?.subheading || "Choose a plan that fits your gym"}
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-500">
            Loading plans...
          </div>
        )}

        {/* EMPTY */}
        {!loading && plans.length === 0 && (
          <div className="text-center text-gray-500">
            No plans available right now.
          </div>
        )}

        {/* PLANS */}
        {!loading && plans.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {plans.map((plan) => {
              const features = Array.isArray(plan.features_json)
                ? plan.features_json
                : [];

              const isSelected = selectedPlan?.id === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition ${
                    isSelected ? "border-indigo-600 ring-2 ring-indigo-200" : "border-gray-200"
                  }`}
                >
                  {/* PLAN NAME */}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>

                  {/* PRICE */}
                  <p className="text-3xl font-bold my-4 text-gray-900">
                    ₹{plan.price}
                  </p>

                  <p className="text-sm text-gray-500 mb-4 capitalize">
                    {plan.billing_cycle}
                  </p>

                  {/* DESCRIPTION */}
                  {plan.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {plan.description}
                    </p>
                  )}

                  {/* FEATURES */}
                  <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left">
                    {features.length === 0 ? (
                      <li className="text-gray-400 text-center">No features listed</li>
                    ) : (
                      features.map((f, i) => (
                        <li key={i}>✓ {f}</li>
                      ))
                    )}
                  </ul>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => onSelectPlan?.(plan)}
                    className={`w-full py-2 rounded-lg font-medium transition ${
                      isSelected
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {isSelected ? "Selected ✅" : "Get Started"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
