const GymLoader = ({
  label = "Loading",
  size = "md",
  fullPage = false,
}) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  const containerClass = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-white z-50"
    : "flex items-center justify-center py-10";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-3">
        
        {/* DUMBBELL LOADER */}
        <div className={`relative ${sizes[size]}`}>
          {/* Left weight */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-8 bg-gray-800 rounded-sm animate-pulse" />
          
          {/* Bar */}
          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-2 bg-gray-900 rounded" />

          {/* Right weight */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-8 bg-gray-800 rounded-sm animate-pulse" />

          {/* Center rotation */}
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40 animate-spin-slow" />
        </div>

        {/* TEXT */}
        <p className="text-sm font-medium text-gray-600 tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
};

export default GymLoader;
