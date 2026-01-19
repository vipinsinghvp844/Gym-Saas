const PublicHeader = ({ data = {}, previewMode = false }) => {
  // ✅ menu support: array OR comma separated string
  let menu = data?.menu ?? [];
  if (typeof menu === "string") {
    menu = menu
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(menu)) menu = [];

  const buttonText = data?.button_text || "Get Started";
  const buttonLink = data?.button_link || "#register";

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-lg">
          {data?.logo_text || "Gym SaaS"}
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          {menu.length === 0 ? (
            <>
              <a href="#features" className="hover:text-black">Features</a>
              <a href="#pricing" className="hover:text-black">Pricing</a>
              <a href="#register" className="hover:text-black">Register</a>
            </>
          ) : (
            menu.map((m, idx) => (
              <a
                key={idx}
                href={m?.toLowerCase().includes("http") ? m : `#${m.toLowerCase()}`}
                className="hover:text-black"
              >
                {m}
              </a>
            ))
          )}
        </nav>

        <a
          href={previewMode ? "#" : buttonLink}
          className="px-4 py-2 rounded bg-black text-white text-sm"
        >
          {buttonText}
        </a>
      </div>
    </header>
  );
};

export default PublicHeader;
