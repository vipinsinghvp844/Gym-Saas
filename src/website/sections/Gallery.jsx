const Gallery = ({ data }) => {
  const images = data?.images || [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-3xl font-bold mb-10">
          {data?.heading || "Our Gym Gallery"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images?.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
