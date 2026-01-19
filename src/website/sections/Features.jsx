const Features = ({ data = {} }) => {
  let items = data?.items ?? [];

  // ✅ support JSON string OR comma string
  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      items = parsed;
    } catch {
      items = items
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    }
  }

  if (!Array.isArray(items)) items = [];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {data?.heading || "Why Choose Our Gym"}
          </h2>

          {data?.subheading && (
            <p className="text-gray-500 mt-2">{data.subheading}</p>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-400">No features added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div key={i} className="border rounded-xl p-6 hover:shadow-md transition">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4
                  bg-[var(--brand-primary)] text-white text-lg font-bold"
                >
                  ✓
                </div>
                <p className="text-gray-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
