import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-1">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={14} className="mx-2 text-gray-400" />
            )}

            {isLast || !item.href ? (
              <span className="text-gray-700 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-gray-900 transition"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
