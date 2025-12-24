// src/hooks/useAuthUser.js
import { useEffect, useState } from "react";
import api from "../services/api";

const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me.php")
      .then((res) => {
        setUser(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, setUser, loading };
};

export default useAuthUser;
