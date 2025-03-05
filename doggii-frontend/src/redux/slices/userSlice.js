import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userName: "",
  email: "",
  phone: "",
  shelterName: null,
  shelterEmail: null,
  shelterPhone: null,
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
      state.shelterEmail = action.payload.shelterEmail || null;
      state.shelterPhone = action.payload.shelterPhone || null;
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
      state.phone = "";
      state.shelterName = null;
      state.shelterEmail = null;
      state.shelterPhone = null;
      state.address = {
        street: "",
        city: "",
        province: "",
        country: ""
      };
      state.role = "";
      state.createdAt = "";
      state.updatedAt = "";
    }
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
