const Hero = ({ data }) => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          {data.title || "Build Your Fitness Brand"}
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          {data.subtitle || "Manage your gym, members and payments from one powerful platform"}
        </p>

        <button
          className="px-6 py-3 rounded-md font-medium text-sm
          bg-[var(--brand-primary)] text-white
          hover:opacity-90 transition"
        >
          {data.button_text || "Get Started"}
        </button>

      </div>
    </section>
  );
};

export default Hero;
