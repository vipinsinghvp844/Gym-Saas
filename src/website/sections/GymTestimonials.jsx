import { Star } from "lucide-react";

/* =========================
   TESTIMONIAL SECTION
========================= */

const GymTestimonials = ({
  data = {},
  previewMode = false,
}) => {

  /* =========================
     DEFAULT DATA
  ========================= */

  const defaultItems = [
    {
      name: "Sarah Mitchell",
      role: "Pro Member",
      message:
        "FitPro completely transformed my approach to fitness. The trainers are incredibly knowledgeable and supportive.",
      rating: 5,
    },
    {
      name: "James Davis",
      role: "Elite Member",
      message:
        "The equipment is top-notch and the facility is always clean. Best gym I've ever joined!",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Elite Member",
      message:
        "24/7 access is a game-changer. Personal training helped me stay accountable and reach goals faster.",
      rating: 5,
    },
  ];

  const heading =
    data?.heading?.trim() || "What Our Members Say";

  /* =========================
     SAFE ITEMS PARSE
  ========================= */

  let testimonials = defaultItems;

  if (Array.isArray(data?.items) && data.items.length > 0) {
    testimonials = data.items;
  }
  else if (typeof data?.items === "string") {
    try {
      const parsed = JSON.parse(data.items);
      if (Array.isArray(parsed) && parsed.length > 0) {
        testimonials = parsed;
      }
    } catch {}
  }

  /* =========================
     HELPER → INITIALS
  ========================= */
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section id="testimonials" className="bg-[#0b0f17] text-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            {heading}
          </h2>
        </div>

        {/* ===== CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#141a26] to-[#1c2230] p-7 rounded-2xl border border-white/5"
            >

              {/* ⭐ STARS */}
              <div className="flex gap-1 mb-4 text-red-500">
                {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-red-500" />
                ))}
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                "{item.message}"
              </p>

              {/* USER */}
              <div className="flex items-center gap-3">

                {/* AVATAR */}
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-semibold">
                  {getInitials(item.name)}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>
                  <p className="text-xs text-white/60">
                    {item.role}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default GymTestimonials;