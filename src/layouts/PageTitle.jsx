import Breadcrumb from "./Breadcrumb";


const PageTitle = ({
    title,
    subtitle,
    breadcrumb = [],
    rightSlot = null,
}) => {
    return (
        <div
      className="
        sticky top-1 z-30
        bg-white
        border-b border-gray-200
        px-6 py-4
        flex items-center justify-between
      "
    >
      <div>
        <Breadcrumb items={breadcrumb} />
        <h1 className="text-lg font-semibold text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {rightSlot && <div>{rightSlot}</div>}
    </div>
    );
};

export default PageTitle;
