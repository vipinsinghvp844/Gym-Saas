const CTA = ({ data = {}, previewMode = false }) => {
  return (
    <section className="py-20 bg-[var(--brand-primary)] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {data?.heading || "Ready to Transform Your Fitness?"}
        </h2>

        <p className="opacity-90 mb-6">
          {data?.subheading || "Join our gym today and start your journey"}
        </p>

        <a
          href={previewMode ? "#" : data?.button_link || "#register"}
          className="inline-block px-8 py-3 bg-black rounded-lg"
        >
          {data?.button_text || "Join Now"}
        </a>
      </div>
    </section>
  );
};

export default CTA;
