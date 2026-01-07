import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  listLoading: false,
  creating: false,
  error: null,
};

const gymSlice = createSlice({
  name: "gym",
  initialState,
  reducers: {
    /* ======================
      GET GYMS
   ====================== */
    fetchGymsStart: (state) => {
      state.listLoading = true;
      state.error = null;
    },
    fetchGymsSuccess: (state, { payload }) => {
      state.listLoading = false;
      state.list = payload;
    },
    fetchGymsFail: (state, { payload }) => {
      state.listLoading = false;
      state.error = payload;
    },
    /*====================
      CREATE GYM
    ======================*/
    createStart: (state) => {
      state.creating = true;
      state.error = null;
    },
    createSuccess: (state) => {
      state.creating = false;
    },
    createFail: (state, { payload }) => {
      state.creating = false;
      state.error = payload;
    },

    /* ======================
     UPDATE GYM STATUS(active/inactive)
    ====================== */
    updateStatusStart: (state) => {
      state.error = null;
    },
    updateStatusSuccess: (state, { payload }) => {
      const gym = state.list.find((g) => g.id === payload.gym_id);
      if (gym) {
        gym.status = payload.status; // 🔥 instant UI update
      }
    },
    updateStatusFail: (state, { payload }) => {
      state.error = payload;
    },

  },
});

export const {
  createStart, //create gym
  createSuccess,  // create gym res
  createFail,  // ceate gym fail
  fetchGymsStart, // fetch gym list
  fetchGymsSuccess, // fetch gym list
  fetchGymsFail, // fetch gym list
  updateStatusStart, //update status active/inactive
  updateStatusSuccess, //update status active/inactive
  updateStatusFail, //update status active/inactive
} = gymSlice.actions; //update status active/inactive

export default gymSlice.reducer;
