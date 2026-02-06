import React, { useEffect } from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Crown,
} from "lucide-react";

const statusBadge = {
  active: "bg-green-100 text-green-700",
  trial: "bg-amber-100 text-amber-700",
  suspended: "bg-red-100 text-red-700",
  inactive: "bg-slate-100 text-slate-700",
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};

const GlobalPreviewModal = ({ isOpen, onClose, type = "gym", data }) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "NA";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (val) => {
    if (!val) return "—";
    return val;
  };

  const renderContent = () => {
    switch (type) {
      case "gym": {
        const gymName = data?.name || "Gym Name";
        const gymStatus = (data?.status || "active").toLowerCase();
        const gymPlan = (data?.plan_name || "free").toLowerCase();

        return (
          <div className="space-y-6">
            {/* Gym Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                {data?.logo ? (
                  <img
                    src={`http://localhost/GymsBackend/${data.logo}`}
                    alt="Gym Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(gymName)
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  {gymName}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Slug:{" "}
                  <span className="font-mono text-slate-700">
                    {data?.slug || "—"}
                  </span>
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge[gymStatus] || "bg-slate-100 text-slate-700"
                  }`}
              >
                {gymStatus}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-600 mb-1">Members</p>
                <p className="text-2xl font-bold text-slate-900">
                  {data?.members ?? 0}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-600 mb-1">Trainers</p>
                <p className="text-2xl font-bold text-slate-900">
                  {data?.trainers ?? 0}
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-600 mb-1">Revenue</p>
                <p className="text-2xl font-bold text-slate-900">
                  {data?.revenue ?? 0}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Email
                  </p>
                  <p className="text-sm text-slate-900 mt-1">
                    {data?.gymEmail || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Phone
                  </p>
                  <p className="text-sm text-slate-900 mt-1">
                    {data?.phone || "No phone add"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Address
                  </p>
                  <p className="text-sm text-slate-900 mt-1">
                    {data?.address || "No Address"}
                  </p>
                  <p className="text-sm text-slate-900 mt-1">
                    {data?.city || "No city "} {data?.state || "No state "}{" "}
                    {data?.zip ? `- ${data.zip}` : "No ZIP "}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Current Plan
                  </p>
                  <p className="text-sm text-slate-900 mt-1">
                    {gymPlan.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Gym Admin
                  </p>
                  <p className="text-sm text-slate-900 mt-1">
                    {data?.ownerName || "—"}{" "}
                    {data?.ownerEmail ? `(${data.ownerEmail})` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button className="flex-1 h-10 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                View Full Details
              </button>
              <button className="h-10 px-4 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200">
                Edit Gym
              </button>
            </div>
          </div>
        );
      }
    case "member": {
  const member = data?.member || {};
  const subscription = data?.subscription;
  const payments = data?.payments;
  const attendance = data?.attendance;

  const fullName = member.name || "Member";
  const status = (member.status || "active").toLowerCase();

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold">
          {getInitials(fullName)}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{fullName}</h3>
          <p className="text-sm text-slate-500">Member ID: #{member.id}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm ${statusBadge[status]}`}>
          {status}
        </span>
      </div>

      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Row icon={Mail} label="Email" value={member.email} />
        <Row icon={Phone} label="Phone" value={member.phone} />
        <Row icon={Calendar} label="Joined On" value={member.joined_at} />
      </Section>

      {/* MEMBERSHIP */}
      <Section title="Membership">
        {subscription ? (
          <>
            <Row icon={Crown} label="Plan" value={subscription.plan_name} />
            <Row label="Start Date" value={subscription.start_date} />
            <Row label="End Date" value={subscription.end_date} />
            <Row label="Days Left" value={`${subscription.days_left} days`} />
          </>
        ) : (
          <Empty text="No active membership" />
        )}
      </Section>

      {/* PAYMENTS */}
      <Section title="Payments">
        <Row label="Total Paid" value={`₹${payments?.total_paid || 0}`} />
        <Row
          label="Last Payment"
          value={
            payments?.last_payment
              ? `${payments.last_payment.amount} (${payments.last_payment.payment_method})`
              : "—"
          }
        />
      </Section>

      {/* ATTENDANCE */}
      <Section title="Attendance">
        <Row label="Total Present" value={attendance?.total_present || 0} />
        <Row label="Last Visit" value={attendance?.last_visit || "—"} />
      </Section>

    </div>
  );
}



      default:
        return (
          <div className="text-sm text-slate-600">
            Preview type not supported yet.
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Details</h2>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </div>
  );
};
const Section = ({ title, children }) => (
  <div className="border-t pt-5 space-y-3">
    <h4 className="text-xs font-semibold uppercase text-slate-500">{title}</h4>
    {children}
  </div>
);

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex gap-3 items-start text-sm">
    {Icon && <Icon className="w-4 h-4 text-slate-400 mt-0.5" />}
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-medium text-slate-900">{value || "—"}</p>
    </div>
  </div>
);

const Empty = ({ text }) => (
  <p className="text-sm text-slate-400">{text}</p>
);


export default GlobalPreviewModal;
