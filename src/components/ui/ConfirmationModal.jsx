import { useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  type = "danger",
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const config = {
    danger: {
      icon: XCircle,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      buttonColor: "bg-red-600 hover:bg-red-700",
    },
    success: {
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
  };

  const modalType = config[type] ? type : "danger";
  const Icon = config[modalType].icon;

  // ✅ IMPORTANT: do not render when closed
  if (!isOpen) return null;

  // ✅ Escape key close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full ${config[modalType].iconBg} flex items-center justify-center mb-4`}
          >
            <Icon className={`w-6 h-6 ${config[modalType].iconColor}`} />
          </div>

          {/* Title & Message */}
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-600 mb-6">{message}</p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
              className={`flex-1 h-10 px-4 text-white rounded-lg text-sm font-medium transition-colors ${config[modalType].buttonColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
