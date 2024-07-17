

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  categories: [],
  oneCategory: {},
  loading: false,
  error: false,
};

const categorySlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchcCategoryStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchcCategoryFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchcCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    },
    fetchOneCategorySuccess: (state, { payload }) => {
      state.loading = false;
      state.oneCategory = payload;
    },
    fetchCategorySuccessWithOutpayload: (state) => {
      state.loading = false;
    },
    fetchCategoryLogout: (state) => {
      state.categories = [];
      state.oneCategory = {};
    },
  },
});



export const {fetchcCategoryStart,fetchcCategoryFail, fetchcCategoriesSuccess,fetchOneCategorySuccess,fetchCategorySuccessWithOutpayload, fetchCategoryLogout} = categorySlice.actions;
export default categorySlice.reducer;
