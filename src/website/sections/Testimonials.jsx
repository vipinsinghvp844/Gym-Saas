const Testimonials = ({ data }) => {
  const items = data?.items || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-3xl font-bold mb-12">
          {data?.heading || "What Our Members Say"}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 bg-gray-50"
            >
              <p className="text-gray-700 mb-4">
                “{t.message}”
              </p>

              <div className="font-semibold">
                {t.name}
              </div>

              <div className="text-xs text-gray-500">
                {t.role}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
