import { Link } from "react-router-dom";

/* =========================
   GYM CTA SECTION
========================= */

const GymCTA = ({
  data = {},
  gym,
  previewMode = false,
}) => {
  /* =========================
     DEFAULT CONTENT
  ========================= */

  /* =========================
   SAFE VALUE HELPER
========================= */
const safe = (value, fallback) => {
  if (value === undefined || value === null || value === "")
    return fallback;
  return value;
};

/* =========================
   CONTENT
========================= */

const heading = safe(
  data.heading,
  "Ready to Transform Your Life?"
);

const subheading = safe(
  data.subheading,
  "Join thousands of members who have already started their fitness journey with FitPro. Your transformation begins today."
);

const button_text = safe(
  data.button_text,
  "Join Today"
);

const button_link = safe(
  data.button_link,
  "register"
);

const background_color = safe(
  data.background_color,
  "#ef3b2d"
);  

  /* =========================
     LINK BUILDER
  ========================= */
  const buildLink = (slug) => {
    if (previewMode) return "#";
    if (!gym) return `/p/${slug}`;
    return `/g/${gym}/${slug}`;
  };

  return (
    <section id="call-to-action"
      className="py-24 text-center text-white"
      style={{ backgroundColor: background_color }}
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {heading}
        </h2>

        {/* SUBTEXT */}
        <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed">
          {subheading}
        </p>

        {/* BUTTON */}
        <Link
          to={buildLink(button_link)}
          className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          {button_text}
        </Link>

      </div>
    </section>
  );
};

export default GymCTA;