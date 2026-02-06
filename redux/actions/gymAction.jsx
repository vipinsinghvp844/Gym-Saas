import api from "../../src/services/api";
import toast from "react-hot-toast";
import {
  fetchGymsStart,
  fetchGymsSuccess,
  fetchGymsFail,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFail,
  createStart,
  createSuccess,
  createFail,
  updateStatusStart,
  updateStatusSuccess,
  updateStatusFail,
} from "../slice/gymSlice";

/* =========================
   Fetch GYMs (SUPER ADMIN)
========================= */
export const fetchGyms = (filters = {}) => async (dispatch) => {
  try {
    dispatch(fetchGymsStart());
    const params = {
      search: filters.search || "",
      status: filters.status || "all",
      plan: filters.plan || "all",
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
    const res = await api.get("/gyms/list.php", { params });

    dispatch(
  fetchGymsSuccess({
    data: res.data.data || [],
    pagination: res.data.pagination || null,
  })
);
  } catch (err) {
    dispatch(fetchGymsFail("Failed to load gyms"));
  }
};

/*=========================
  fettch Card Stats
===========================*/

export const fetchGymStats = () => async (dispatch) => {
  try {
    dispatch(fetchStatsStart());

    const res = await api.get("/gyms/stats.php");

    if (!res.data.status) {
      dispatch(fetchStatsFail("Failed to load stats"));
      return;
    }

    dispatch(fetchStatsSuccess(res.data.data));
  } catch (err) {
    dispatch(fetchStatsFail("Failed to load stats"));
  }
};



/* =========================
   CREATE GYM (SUPER ADMIN)
========================= */
export const createGym = (form, navigate) => async (dispatch) => {
  try {
    dispatch(createStart());

    const res = await api.post("/gyms/create.php", form);
    console.log(res, "resaction");


    if (!res.data.status) {
      toast.error(res.data.message || "Create failed");
      dispatch(createFail(res.data.message));
      return;
    }

    toast.success("Gym created successfully");
    dispatch(createSuccess());

    navigate(-1);
  } catch (err) {
    toast.error("Server error");
    dispatch(createFail("Server error"));
  }
};

/* =========================
   UPDATE GYM STATUS(active/inactive) (SUPER ADMIN)
========================= */

export const updateGymStatus = (gym_id, currentStatus) => async (dispatch) => {
  try {
    dispatch(updateStatusStart());
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const res = await api.post("/gyms/status.php", {
      gym_id,
      status: newStatus,
    });
    if (!res.data.status) {
      toast.error(res.data.message || "Failed to update status");
      dispatch(updateStatusFail("Status update failed"));
      return;
    }
    dispatch(
      updateStatusSuccess({
        gym_id,
        status: newStatus,
      })
    );
    toast.success(`Gym ${newStatus}`);
  } catch (error) {
    toast.error("Server error");
    dispatch(updateStatusFail("Server error"));
  }
}

/*============================
  Bulk Status Change and single
==============================*/

export const bulkUpdateGymStatus = (gym_ids, status, filters) => async (dispatch) => {
  try {
    const res = await api.post("/gyms/bulk-status.php", {
      gym_ids,
      status,
    });

    if (!res.data.status) {
      toast.error(res.data.message || "Bulk update failed");
      return;
    }

    toast.success("Status updated");
    dispatch(fetchGyms(filters));
    dispatch(fetchGymStats(filters));
  } catch (err) {
    toast.error("Server error");
  }
};

/*============================
  Bulk delete gym, user and single
==============================*/

export const bulkDeleteGyms = (gym_ids, filters) => async (dispatch) => {
  try {
    const res = await api.post("/gyms/bulk-delete.php", {
      gym_ids,
    });

    if (!res.data.status) {
      toast.error(res.data.message || "Delete failed");
      return;
    }

    toast.success("Gyms deleted");
    dispatch(fetchGyms(filters));
    dispatch(fetchGymStats(filters));
  } catch (err) {
    toast.error("Server error");
  }
};