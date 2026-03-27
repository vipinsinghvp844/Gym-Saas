import React from "react";

/* =========================
   GYM GALLERY SECTION
========================= */

const GymGallery = ({
  data = {},
  previewMode = false,
}) => {

  /* =========================
     DEFAULT DATA
  ========================= */

  const defaultImages = [
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558611848-73f7eb4001ab?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
  ];

  const heading =
    data?.heading?.trim() || "Our Facility";

  /* =========================
     SAFE IMAGE PARSE
  ========================= */

  let images = defaultImages;

  if (Array.isArray(data?.images) && data.images.length > 0) {
    images = data.images;
  }
  else if (typeof data?.images === "string") {
    try {
      const parsed = JSON.parse(data.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        images = parsed;
      }
    } catch {}
  }

  return (
    <section id="gallery" className="bg-[#0b0f17] text-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            {heading}
          </h2>
        </div>

        {/* ===== GALLERY GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={img}
                alt={`gallery-${i}`}
                className="w-full h-[260px] object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default GymGallery;