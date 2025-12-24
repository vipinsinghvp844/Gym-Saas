import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUserData: {},
};


const AllReducers = createSlice({
  
  name: "counter",
  initialState,
  reducers: {

    LoginTokenReduser: (state, { payload }) => {
      state.token = payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  LoginTokenReduser
} = AllReducers.actions;

export default AllReducers.reducer;