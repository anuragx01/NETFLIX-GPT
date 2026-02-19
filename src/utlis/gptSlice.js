import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setShowGptSearch: (state, action) => {
      state.showGptSearch = Boolean(action.payload);
    },
  },
});

export const { toggleGptSearchView, setShowGptSearch } = gptSlice.actions;
export default gptSlice.reducer;

