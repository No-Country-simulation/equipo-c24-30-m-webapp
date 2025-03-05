import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userName: "",
  email: "",
  phone: "",
  shelterName: null,
  address: {
    street: "",
    city: "",
    province: "",
    country: ""
  },
  role: "",
  createdAt: "",
  updatedAt: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload._id || "";
      state.userName = action.payload.userName || "";
      state.email = action.payload.email || "";
      state.phone = action.payload.phone || "";
      state.shelterName = action.payload.shelterName || null;
      state.address = {
        street: action.payload.address?.street || "",
        city: action.payload.address?.city || "",
        province: action.payload.address?.province || "",
        country: action.payload.address?.country || ""
      };
      state.role = action.payload.role.toLowerCase() || "";
      state.createdAt = action.payload.createdAt || "";
      state.updatedAt = action.payload.updatedAt || "";
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
