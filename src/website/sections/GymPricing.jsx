import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const GymPricing = ({
  data = {},
  gym,
  previewMode = false,
}) => {

  /* =========================
     DEFAULT DATA
  ========================= */

  const defaultPlans = [
    {
      name: "Basic",
      price: "29",
      duration: "month",
      recommended: false,
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Free fitness assessment",
      ],
      button_text: "Join Now",
      button_link: "register",
    },
    {
      name: "Pro",
      price: "59",
      duration: "month",
      recommended: true,
      features: [
        "All Basic features",
        "Unlimited group classes",
        "Nutrition consultation",
        "Guest passes (2/month)",
      ],
      button_text: "Join Now",
      button_link: "register",
    },
    {
      name: "Elite",
      price: "99",
      duration: "month",
      recommended: false,
      features: [
        "All Pro features",
        "Personal training (4 sessions)",
        "Priority class booking",
        "Spa & sauna access",
        "Unlimited guest passes",
      ],
      button_text: "Join Now",
      button_link: "register",
    },
  ];

  const heading =
    data?.heading?.trim() || "Membership Plans";

  const subheading =
    data?.subheading?.trim() ||
    "Choose the perfect plan that fits your lifestyle and fitness goals.";

  /* =========================
     SAFE PLAN PARSE
  ========================= */

  let plans = defaultPlans;

  if (Array.isArray(data?.plans) && data.plans.length > 0) {
    plans = data.plans;
  }

  if (typeof data?.plans === "string" && data.plans !== "") {
    try {
      const parsed = JSON.parse(data.plans);
      if (Array.isArray(parsed) && parsed.length > 0) {
        plans = parsed;
      }
    } catch {}
  }

  /* =========================
     LINK BUILDER
  ========================= */

  const buildLink = (slug) => {
    if (previewMode) return "#";
    if (!gym) return `/p/${slug}`;
    return `/g/${gym}/${slug}`;
  };

  return (
    <section id="plans" className="bg-[#0b0f17] text-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            {heading}
          </h2>

          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* ===== PLANS GRID ===== */}
        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, i) => {

            const recommended = plan.recommended;

            return (
              <div
                key={i}
                className={`
                  relative rounded-2xl p-8 border transition
                  bg-gradient-to-br from-[#141a26] to-[#1c2230]
                  ${recommended
                    ? "border-red-500 scale-105"
                    : "border-white/10"}
                `}
              >

                {/* RECOMMENDED BADGE */}
                {recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-xs px-4 py-1 rounded-full font-semibold">
                    Recommended
                  </div>
                )}

                {/* PLAN NAME */}
                <h3 className="text-xl font-semibold mb-4">
                  {plan.name}
                </h3>

                {/* PRICE */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-500">
                    ${plan.price}
                  </span>
                  <span className="text-white/60 ml-1">
                    /{plan.duration}
                  </span>
                </div>

                {/* FEATURES */}
                <ul className="space-y-3 mb-8">
                  {plan.features?.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <Check className="w-4 h-4 text-red-500 mt-1" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <Link
                  to={buildLink(plan.button_link)}
                  className={`
                    block text-center py-3 rounded-full font-semibold transition
                    ${recommended
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "border border-red-500 text-red-400 hover:bg-red-500 hover:text-white"}
                  `}
                >
                  {plan.button_text}
                </Link>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GymPricing;