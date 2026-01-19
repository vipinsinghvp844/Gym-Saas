const Gallery = ({ data = {} }) => {
  let images = data?.images ?? [];

  if (typeof images === "string") {
    try {
      images = JSON.parse(images);
    } catch {
      images = [];
    }
  }

  if (!Array.isArray(images)) images = [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold mb-10">
          {data?.heading || "Our Gym Gallery"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No gallery images added yet.
            </div>
          ) : (
            images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white border">
                <img
                  src={img}
                  alt=""
                  className="w-full h-40 object-cover hover:scale-105 transition"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
