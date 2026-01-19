const Testimonials = ({ data = {} }) => {
  let items = data?.items ?? [];

  // ✅ support JSON string
  if (typeof items === "string") {
    try {
      items = JSON.parse(items);
    } catch {
      items = [];
    }
  }

  if (!Array.isArray(items)) items = [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold mb-12">
          {data?.heading || "What Our Members Say"}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="md:col-span-3 text-center text-gray-500">
              No testimonials added yet.
            </div>
          ) : (
            items.map((t, i) => (
              <div key={i} className="border rounded-xl p-6 bg-gray-50">
                <p className="text-gray-700 mb-4">
                  “{t?.message || "No message"}”
                </p>
                <div className="font-semibold">{t?.name || "Anonymous"}</div>
                <div className="text-xs text-gray-500">{t?.role || ""}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
