import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

/* =========================
   GYM FOOTER
========================= */

const GymFooter = ({
  data = {},
  gym,
  previewMode = false,
}) => {

  /* =========================
     SAFE VALUE HELPER
  ========================= */
  const safe = (v, d) =>
    v === undefined || v === null || v === "" ? d : v;

  /* =========================
     CONTENT
  ========================= */

  const brand = safe(data.brand, "FITPRO");

  const tagline = safe(
    data.tagline,
    "Transform your body and life with our premium fitness facility, expert trainers, and supportive community."
  );

  const links =
    Array.isArray(data.links) && data.links.length
      ? data.links
      : [
          { label: "Home", link: "home" },
          { label: "About", link: "about" },
          { label: "Features", link: "features" },
          { label: "Plans", link: "plans" },
          { label: "Gallery", link: "gallery" },
          { label: "Testimonials", link: "testimonials" },
        ];

  const address = safe(
    data.address,
    "123 Fitness Street\nNew York, NY 10001"
  );

  const email = safe(data.email, "info@fitprogym.com");
  const phone = safe(data.phone, "+1 (555) 123-4567");

  const socials = {
    facebook: data.facebook || "#",
    instagram: data.instagram || "#",
    twitter: data.twitter || "#",
  };

  /* =========================
     LINK BUILDER
  ========================= */
  const buildLink = (slug) => {
    if (previewMode) return "#";
    if (!gym) return `/p/${slug}`;
    return `/g/${gym}/${slug}`;
  };

  return (
    <footer className="bg-[#0b0f17] text-white border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* ===== BRAND ===== */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {brand}
            </h3>

            <p className="text-white/70 text-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div>
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm text-white/70">
              {links.map((l, i) => (
                <li key={i}>
                  <Link
                    to={buildLink(l.link)}
                    className="hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== CONTACT ===== */}
          <div>
            <h4 className="font-semibold mb-4">
              Contact
            </h4>

            <p className="text-white/70 text-sm whitespace-pre-line">
              {address}
            </p>

            <p className="text-white/70 text-sm mt-3">
              {email}
            </p>

            <p className="text-white/70 text-sm">
              {phone}
            </p>
          </div>

          {/* ===== SOCIAL ===== */}
          <div>
            <h4 className="font-semibold mb-4">
              Follow Us
            </h4>

            <div className="flex gap-4">
              <a
                href={socials.facebook}
                className="w-10 h-10 rounded-full bg-[#141a26] flex items-center justify-center hover:bg-red-500 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href={socials.instagram}
                className="w-10 h-10 rounded-full bg-[#141a26] flex items-center justify-center hover:bg-red-500 transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href={socials.twitter}
                className="w-10 h-10 rounded-full bg-[#141a26] flex items-center justify-center hover:bg-red-500 transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* ===== COPYRIGHT ===== */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} {brand} Gym. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default GymFooter;