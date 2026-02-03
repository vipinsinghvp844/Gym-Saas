import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import PageTitle from "../../../layouts/PageTitle";
import GymLoader from "../../../components/ui/GymLoader";

const GymMemberDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const loadMember = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gymadmin/members/show.php", {
        params: { id }
      });

      setData(res.data?.data || null);
    } catch (err) {
      alert("Failed to load member details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, [id]);

  if (loading || !data) {
    return <GymLoader label="Loading member details..." />;
  }

  const { member, subscription, payments, attendance } = data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

      <PageTitle
        title={member.name}
        subtitle={`Member since ${formatDate(member.joined_at)}`}
      />

      {/* =====================
         PROFILE
      ===================== */}
      <Card title="Profile">
        <InfoGrid
          items={[
            ["Email", member.email || "-"],
            ["Phone", member.phone],
            ["Gender", member.gender || "-"],
            ["DOB", member.dob ? formatDate(member.dob) : "-"],
            ["Status", <StatusBadge status={member.status} />],
            ["Source", member.source],
          ]}
        />
      </Card>

      {/* =====================
         MEMBERSHIP
      ===================== */}
      <Card title="Membership">
        {subscription ? (
          <InfoGrid
            items={[
              ["Plan", subscription.plan_name],
              ["Start Date", formatDate(subscription.start_date)],
              ["End Date", formatDate(subscription.end_date)],
              [
                "Days Left",
                subscription.days_left >= 0
                  ? `${subscription.days_left} days`
                  : "Expired",
              ],
              ["Status", <StatusBadge status={subscription.status} />],
            ]}
          />
        ) : (
          <Empty text="No active membership" />
        )}
      </Card>

      {/* =====================
         PAYMENTS
      ===================== */}
      <Card title="Payments">
        <InfoGrid
          items={[
            ["Total Paid", `₹${payments.total_paid}`],
            [
              "Last Payment",
              payments.last_payment
                ? `${payments.last_payment.amount} (${payments.last_payment.payment_method})`
                : "-",
            ],
            [
              "Last Paid On",
              payments.last_payment?.paid_at
                ? formatDateTime(payments.last_payment.paid_at)
                : "-",
            ],
          ]}
        />
      </Card>

      {/* =====================
         ATTENDANCE
      ===================== */}
      <Card title="Attendance">
        <InfoGrid
          items={[
            ["Total Present", attendance.total_present],
            [
              "Last Visit",
              attendance.last_visit
                ? formatDate(attendance.last_visit)
                : "-",
            ],
          ]}
        />
      </Card>

    </div>
  );
};

export default GymMemberDetail;

/* =========================
   SMALL COMPONENTS
========================= */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    {children}
  </div>
);

const InfoGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    {items.map(([label, value], i) => (
      <div key={i}>
        <p className="text-gray-400">{label}</p>
        <div className="font-medium text-gray-900">{value}</div>
      </div>
    ))}
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-2 py-1 rounded-full text-xs ${
      status === "active"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-600"
    }`}
  >
    {status}
  </span>
);

const Empty = ({ text }) => (
  <div className="text-sm text-gray-400">{text}</div>
);

/* =========================
   HELPERS
========================= */
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN");

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN");
