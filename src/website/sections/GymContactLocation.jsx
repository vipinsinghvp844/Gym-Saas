import { MapPin, Mail, Phone } from "lucide-react";

/* =========================
   GYM LOCATION SECTION
========================= */

const GymContactLocation = ({
  data = {},
  previewMode = false,
}) => {

  /* =========================
     SAFE VALUE HELPER
  ========================= */
  const safe = (v, d) =>
    v === undefined || v === null || v === "" ? d : v;

  /* =========================
     CONTENT (DYNAMIC READY)
  ========================= */

  const heading = safe(data.heading, "Visit Our Location");

  const subheading = safe(
    data.subheading,
    "Come see our facility in person. We're open 24/7 and our team is always ready to give you a tour."
  );

  const map_embed = safe(
    data.map_embed,
    "https://www.google.com/maps?q=Times+Square+New+York&output=embed"
  );

  const address = safe(
    data.address,
    "123 Fitness Street\nNew York, NY 10001"
  );

  const emails = data.emails?.length
    ? data.emails
    : ["info@fitprogym.com", "support@fitprogym.com"];

  const phones = data.phones?.length
    ? data.phones
    : ["+1 (555) 123-4567", "+1 (555) 987-6543"];

  return (
    <section id="contact" className="bg-[#0b0f17] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {heading}
          </h2>

          <p className="text-white/70 mt-3 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* ================= MAP ================= */}
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-12">
          <iframe
            src={map_embed}
            width="100%"
            height="380"
            loading="lazy"
            className="border-0"
            title="Gym Location Map"
          />
        </div>

        {/* ================= CONTACT CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* ADDRESS */}
          <div className="bg-gradient-to-br from-[#141a26] to-[#1c2230] p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>

            <h3 className="font-semibold mb-2">Address</h3>

            <p className="text-white/70 whitespace-pre-line text-sm">
              {address}
            </p>
          </div>

          {/* EMAIL */}
          <div className="bg-gradient-to-br from-[#141a26] to-[#1c2230] p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="font-semibold mb-2">Email</h3>

            {emails.map((e, i) => (
              <p key={i} className="text-white/70 text-sm">
                {e}
              </p>
            ))}
          </div>

          {/* PHONE */}
          <div className="bg-gradient-to-br from-[#141a26] to-[#1c2230] p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="font-semibold mb-2">Phone</h3>

            {phones.map((p, i) => (
              <p key={i} className="text-white/70 text-sm">
                {p}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default GymContactLocation;