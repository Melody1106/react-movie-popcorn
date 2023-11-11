import { configureStore } from "@reduxjs/toolkit";
//加入建立好slice
import movieSlice from "./movieSlice";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});
