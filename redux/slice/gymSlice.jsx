import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  stats: {
    total: 0,
    active: 0,
    trial: 0,
    suspended: 0,
  },
  listLoading: false,
  statsLoading: false,
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
      state.list = payload.data || [];
      state.pagination = payload.pagination || state.pagination;
    },

    fetchGymsFail: (state, { payload }) => {
      state.listLoading = false;
      state.error = payload;
    },

    /* ======================
       STATS
    ====================== */
    fetchStatsStart: (state) => {
      state.statsLoading = true;
    },
    fetchStatsSuccess: (state, { payload }) => {
      state.statsLoading = false;
      state.stats = payload;
    },
    fetchStatsFail: (state, { payload }) => {
      state.statsLoading = false;
      state.error = payload;
    },

    /* ======================
       CREATE GYM
    ====================== */
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
       UPDATE STATUS
    ====================== */
    updateStatusStart: (state) => {
      state.error = null;
    },
    updateStatusSuccess: (state, { payload }) => {
      const gym = state.list.find((g) => g.id === payload.gym_id);
      if (gym) {
        gym.status = payload.status;
      }
    },
    updateStatusFail: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {
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
} = gymSlice.actions;

export default gymSlice.reducer;
