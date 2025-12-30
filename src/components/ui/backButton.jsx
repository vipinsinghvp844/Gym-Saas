import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition ${className}`}
    >
      ← {label}
    </button>
  );
};

export default BackButton;
