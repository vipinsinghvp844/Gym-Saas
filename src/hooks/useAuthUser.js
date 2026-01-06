import { useEffect, useState } from "react";
import api from "../services/api";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me.php");
      setUser(res.data.data);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handler = () => fetchUser();
    window.addEventListener("user-updated", handler);

    return () => {
      window.removeEventListener("user-updated", handler);
    };
  }, []);

  return { user, loading, refreshUser: fetchUser };
};

export default useAuthUser;
