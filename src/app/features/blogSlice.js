import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  blogs: [],
  oneBlog: {},
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlogsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBlogsFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchBlogsSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload;
    },
    fetchOneBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.oneBlog = payload;
    },
    fetchBlogsSuccessWithOutpayload: (state) => {
      state.loading = false;
    },
    fetchBlogsLogout: (state) => {
      state.blogs = [];
      state.oneBlog = {};
    },
  },
});



export const {fetchBlogsStart,fetchBlogsFail,fetchBlogsSuccess,fetchOneBlogSuccess,fetchBlogsSuccessWithOutpayload,fetchBlogsLogout} = blogSlice.actions;
export default blogSlice.reducer;
