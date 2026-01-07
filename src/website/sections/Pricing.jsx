const Pricing = ({ data }) => {
  const plans = data?.plans || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            {data?.heading || "Pricing Plans"}
          </h2>
          <p className="text-gray-500 mt-2">
            {data?.subheading || "Choose a plan that fits your gym"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{plan?.name}</h3>
              <p className="text-3xl font-bold my-4">
                ₹{plan?.price}
              </p>

              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx}>✓ {f}</li>
                ))}
              </ul>

              <button className="w-full py-2 rounded bg-[var(--brand-primary)] text-white">
                {plan.button_text || "Get Started"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
