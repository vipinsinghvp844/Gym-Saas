import { Plus, Download, Search, Eye, Edit, Ban, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';



const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
    <p className="text-sm text-slate-600 mb-1">{label}</p>
    <p className="text-2xl font-semibold text-slate-900">{value}</p>
  </div>
);

const GymTrainers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total_trainers: 0,
    active_trainers: 0,
    avg_rating: 0,
    total_classes: 0
  });
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const fetchStats = async () => {
    try {
      const res = await api.get("/gymadmin/trainers/stats.php");
      if (res.data?.status) {
        setStats(res.data.data);
      }
    } catch (e) {
      console.error("Failed to load trainer stats");
    }
  };
  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gymadmin/trainers/list.php", {
        params: {
          search: searchTerm || undefined
        }
      });

      if (res.data?.status) {
        setTrainers(res.data.data);
      }

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const t = setTimeout(fetchTrainers, 400);
    return () => clearTimeout(t);
  }, [searchTerm]);


  useEffect(() => {
    fetchStats();
    fetchTrainers();
  }, []);



  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Trainers</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your gym trainers and instructors
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
          onClick={() => navigate("/gym/trainers/create")}
          className="h-10 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Trainer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard label="Total Trainers" value={stats.total_trainers} />
        <StatCard label="Active Trainers" value={stats.active_trainers} />
        <StatCard label="Avg Rating" value={stats.avg_rating || "—"} />
        <StatCard label="Total Classes" value={stats.total_classes || "—"} />
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search trainers by name, email, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-900">Gym Admin Access</p>
            <p className="text-sm text-purple-700 mt-1">
              As a Gym Admin, you can add, edit, and manage all trainers for your gym.
              Super Admins do not have direct access to trainer management.
            </p>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10 text-slate-500">
            Loading trainers...
          </div>
        ) : trainers.length === 0 ? (
          <div className="col-span-full text-center py-10 text-slate-500">
            No trainers found
          </div>
        ) : (
          trainers.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="p-6">

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {trainer.name
                      ?.split(" ")
                      .map(n => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-slate-500">{trainer.email}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 mb-3">
                  {trainer.specialty || "—"}
                </p>

                <span className={`inline-block px-2 py-0.5 rounded text-xs ${trainer.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                  }`}>
                  {trainer.status}
                </span>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 h-9 bg-purple-600 text-white rounded-lg text-sm">
                    View
                  </button>
                  <button className="h-9 px-3 bg-slate-100 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="h-9 px-3 bg-slate-100 rounded-lg text-red-600">
                    <Ban className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}


export default GymTrainers;

//