import { Link } from "react-router-dom";

/* =========================
   HERO COMPONENT
========================= */
const GymHero = ({
  data = {},
  gym,
  previewMode = false,
}) => {

  /* =========================
     DEFAULT CONTENT
  ========================= */
  const {
    title_line_1 = "Transform Your Body.",
    title_line_2 = "Transform Your Life.",
    subtitle =
      "Join our premium fitness community and unlock your full potential with state-of-the-art equipment, expert trainers, and personalized programs designed for your success.",

    primary_button_text = "Start Membership",
    primary_button_link = "register",

    secondary_button_text = "View Plans",
    secondary_button_link = "plans",

    background_image =
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",

    stats = [
      { value: "5000", label: "Members" },
      { value: "50", label: "Trainers" },
      { value: "200", label: "Equipment" },
      { value: "15", label: "Years" },
    ],
  } = data;

  /* =========================
     LINK BUILDER
  ========================= */
  const buildLink = (slug) => {
    if (previewMode) return "#";
    if (!gym) return `/p/${slug}`;
    return `/g/${gym}/${slug}`;
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">

      {/* ===== BACKGROUND IMAGE ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background_image})` }}
      />

      {/* ===== DARK OVERLAY ===== */}
      <div className="absolute inset-0 bg-black/70" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-5xl px-6">

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="text-red-500">{title_line_1}</span>
          <br />
          <span>{title_line_2}</span>
        </h1>

        {/* SUBTITLE */}
        <p className="mt-6 text-white/80 text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link
            to={buildLink(primary_button_link)}
            className="px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 font-semibold transition"
          >
            {primary_button_text}
          </Link>

          <Link
            to={buildLink(secondary_button_link)}
            className="px-8 py-3 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            {secondary_button_text}
          </Link>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-bold text-red-500">
                {s.value}
              </p>
              <p className="text-white/70 text-sm mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GymHero;