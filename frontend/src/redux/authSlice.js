import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("_user") ? JSON.parse(Cookies.get("_user")) : null,
  token: Cookies.get("_auth") || null,
};

//  manage authentication-related state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        Cookies.set("_user", JSON.stringify(action.payload), { expires: 0.5 }); // Set the user cookie for 12 hours
      } else {
        Cookies.remove("_user");
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("_auth", action.payload, { expires: 0.5 }); // Set the token cookie for 12 hours
      } else {
        Cookies.remove("_auth");
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("_user");
      Cookies.remove("_auth");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
