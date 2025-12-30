import BackButton from "./backButton";

const PageHeader = ({
  title,
  subtitle,
  showBack = true,
  className = "",
}) => {
  return (
    <div className={`flex items-start gap-4 mb-6 ${className}`}>
      {showBack && <BackButton className="mt-1" />}

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
