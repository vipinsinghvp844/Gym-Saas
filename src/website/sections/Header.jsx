const PublicHeader = ({ data }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <div className="font-bold text-lg">
          {data.logo_text || "Gym SaaS"}
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-black">Features</a>
          <a href="#pricing" className="hover:text-black">Pricing</a>
          <a href="#register" className="hover:text-black">Register</a>
        </nav>

        <a
          href="#register"
          className="px-4 py-2 rounded bg-black text-white text-sm"
        >
          Get Started
        </a>

      </div>
    </header>
  );
};

export default PublicHeader;
