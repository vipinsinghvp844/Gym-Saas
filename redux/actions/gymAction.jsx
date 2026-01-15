import api from "../../src/services/api";
import toast from "react-hot-toast";
import {
  fetchGymsStart,
  fetchGymsSuccess,
  fetchGymsFail,
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
export const fetchGyms = () => async (dispatch) => {
  try {
    dispatch(fetchGymsStart());

    const res = await api.get("/gyms/list.php");

    dispatch(fetchGymsSuccess(res.data.data || []));
  } catch (err) {
    dispatch(fetchGymsFail("Failed to load gyms"));
  }
};



/* =========================
   CREATE GYM (SUPER ADMIN)
========================= */
export const createGym = (form, navigate) => async (dispatch) => {
  try {
    dispatch(createStart());

    const res = await api.post("/gyms/create.php", form);
    console.log(res,"resaction");
    

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

