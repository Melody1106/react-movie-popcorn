import { createSlice } from "@reduxjs/toolkit";

//創建初始值 url,category兩狀態變數
const initialState = {
  url: {},
  category: {},
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    //創建reducers儲存url,category狀態
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

//reducers state作為方法導出
export const { getApiConfiguration, getCategory } = movieSlice.actions;
//reducer 導出
export default movieSlice.reducer;
