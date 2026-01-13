const Pricing = ({ data = {} }) => {
  const plans = Array.isArray(data?.plans) ? data.plans : [];

  return (
    <section className="py-20 bg-gray-50">
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

        {/* PLANS */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {plans.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No pricing plans added yet.
            </div>
          )}

          {plans.map((plan, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              {/* PLAN NAME */}
              <h3 className="text-xl font-semibold text-gray-900">
                {plan?.name || "Plan"}
              </h3>

              {/* PRICE */}
              <p className="text-3xl font-bold my-4 text-gray-900">
                {plan?.price ? `₹${plan.price}` : "₹0"}
              </p>

              {/* FEATURES */}
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                {(plan?.features || []).length === 0 && (
                  <li className="text-gray-400">
                    No features listed
                  </li>
                )}

                {(plan?.features || []).map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                {plan?.button_text || "Get Started"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
