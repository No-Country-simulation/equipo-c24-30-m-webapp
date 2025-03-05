import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userName: "",
  email: "",
  role: "",
  status: false,
  favoritePets: [],
  createdAt: "",
  updatedAt: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload._id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role.toLowerCase();
      state.status = action.payload.status;
      state.favoritePets = action.payload.favoritePets;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    resetUserInfo: (state) => {
      state.id = "";
      state.userName = "";
      state.email = "";
      state.role = "";
      state.status = false;
      state.favoritePets = [];
      state.createdAt = "";
      state.updatedAt = "";
    }
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
