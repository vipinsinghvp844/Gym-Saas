import { CheckCircle } from "lucide-react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

/* ================= ICON MAP ================= */
const iconMap = {
  trainers: CheckCircle,
  equipment: CheckCircle,
  nutrition: CheckCircle,
  classes: CheckCircle,
  access: CheckCircle,
  personal: CheckCircle,
};

const GymFeatures = ({
  data = {},
  gym,
  previewMode = false,
}) => {

  /* ===================================================
     ----------- FEATURES GRID DATA ---------------------
  =================================================== */

  const defaultItems = [
    { icon: "trainers", title: "Certified Trainers", description: "Expert coaches guiding your journey." },
    { icon: "equipment", title: "Modern Equipment", description: "Premium machines for best performance." },
    { icon: "nutrition", title: "Diet & Nutrition", description: "Personalized nutrition guidance." },
    { icon: "classes", title: "Group Classes", description: "Fun and engaging workouts." },
    { icon: "access", title: "24/7 Access", description: "Train anytime you want." },
    { icon: "personal", title: "Personal Training", description: "One-on-one coaching support." },
  ];

  const heading =
    data?.heading?.trim() || "Why Choose FitPro";

  let featureItems = defaultItems;

  if (Array.isArray(data?.items) && data.items.length > 0) {
    featureItems = data.items;
  } else if (typeof data?.items === "string") {
    try {
      const parsed = JSON.parse(data.items);
      if (Array.isArray(parsed) && parsed.length > 0)
        featureItems = parsed;
    } catch {}
  }

  /* ===================================================
     ----------- ABOUT SPLIT SECTION DATA ---------------
  =================================================== */

  const aboutHeading =
    data?.about_heading || "Why Choose FitPro Gym";

  const description1 =
    data?.description_1 ||
    "At FitPro, fitness is more than exercise — it's a lifestyle transformation.";

  const description2 =
    data?.description_2 ||
    "Our facility combines modern equipment with expert coaching.";

  const image =
    data?.image ||
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop";

  let points = data?.points || [
    "Modern facility with premium equipment",
    "Expert trainers with proven results",
    "Holistic fitness & wellness approach",
  ];

  if (typeof points === "string") {
    try {
      const parsed = JSON.parse(points);
      if (Array.isArray(parsed)) points = parsed;
    } catch {}
  }

  const buttonText = data?.button_text || "Learn More";
  const buttonLink = data?.button_link || "about";

  const buildLink = (slug) => {
    if (previewMode) return "#";
    if (!gym) return `/p/${slug}`;
    return `/g/${gym}/${slug}`;
  };

  /* ===================================================
     =================== UI =============================
  =================================================== */

  return (
    <section id="features" className="bg-[#0b0f17] text-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= FEATURES GRID ================= */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">

          {featureItems.map((item, i) => {
            const Icon = iconMap[item.icon] || CheckCircle;

            return (
              <div
                key={i}
                className="bg-gradient-to-br from-[#141a26] to-[#1c2230]
                p-7 rounded-2xl border border-white/5
                hover:border-red-500/40 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================= ABOUT SPLIT SECTION ================= */}
        <div id="about" className="grid lg:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}
          <img
            src={image}
            alt="Gym"
            className="rounded-2xl w-full h-[420px] object-cover"
          />

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {aboutHeading}
            </h2>

            <p className="text-white/70 mb-5">{description1}</p>
            <p className="text-white/70 mb-8">{description2}</p>

            <div className="space-y-4 mb-8">
              {points.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <Check className="text-red-500 w-5 h-5 mt-1" />
                  <p className="text-sm text-white/80">{p}</p>
                </div>
              ))}
            </div>

            <Link
              to={buildLink(buttonLink)}
              className="inline-block px-7 py-3 rounded-full
              bg-red-500 hover:bg-red-600 transition font-semibold"
            >
              {buttonText}
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GymFeatures;