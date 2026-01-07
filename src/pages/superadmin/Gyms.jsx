import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/ui/PageHeader";
import GymLoader from "../../components/ui/GymLoader";
import { fetchGyms, updateGymStatus } from "../../../redux/actions/gymAction";

const Gyms = () => {
  const dispatch = useDispatch();
  const { list, listLoading } = useSelector((state) => state.gym);

  useEffect(() => {
    dispatch(fetchGyms());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 bg-white">
      <PageHeader
        title="All Gyms"
        subtitle="List of all registered gyms on the platform"
      />

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {listLoading && (
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  <GymLoader label="Loading gyms..." />
                </td>
              </tr>
            )}

            {!listLoading && list?.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No gyms found
                </td>
              </tr>
            )}

            {!listLoading &&
              list?.map((g) => (
                <tr key={g.id}>
                  <td className="px-4 py-3">{g.id}</td>
                  <td className="px-4 py-3 font-medium">{g.name}</td>
                  <td className="px-4 py-3 text-gray-500">{g.slug}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        dispatch(updateGymStatus(g.id, g.status))
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium transition
      ${g.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                    >
                      {g.status}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gyms;
