const PublicFooter = ({ data = {} }) => {
  let links = data?.links ?? [];

  if (typeof links === "string") {
    links = links
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  if (!Array.isArray(links)) links = [];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-white mb-2">
            {data.brand || "Gym SaaS"}
          </h4>
          <p className="text-sm">{data.tagline || "Build and manage your gym business online."}</p>
        </div>

        <div>
          <h5 className="font-medium text-white mb-2">Quick Links</h5>
          {links.length === 0 ? (
            <ul className="space-y-1 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Register</li>
            </ul>
          ) : (
            <ul className="space-y-1 text-sm">
              {links.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h5 className="font-medium text-white mb-2">Contact</h5>
          <p className="text-sm">{data.email || "support@gymplatform.com"}</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Gym SaaS Platform
      </div>
    </footer>
  );
};

export default PublicFooter;
