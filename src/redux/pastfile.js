import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pastSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addtoPastes: (state, action) => {
      // add createdAt when adding
      const paste = {
        ...action.payload,
        createdAt: new Date().toLocaleString()
      };

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste added successfully!");
    },

    updateToPastes: (state, action) => {
      const past = action.payload;
      const index = state.pastes.findIndex((item) => item._id === past._id);

      if (index >= 0) {
        // keep the original createdAt
        state.pastes[index] = {
          ...past,
          createdAt: state.pastes[index].createdAt
        };

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared!");
    },

    removeFromPastes: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter((item) => item._id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed successfully!");
    },
  },
});

export const { addtoPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pastSlice.actions;

export default pastSlice.reducer;
