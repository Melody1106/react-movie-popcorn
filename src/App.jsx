import { useEffect } from "react";

import { fetchDataFromApi } from "./utils/api";

import { useDispatch, useSelector } from "react-redux";

import { getApiConfiguration } from "./store/movieSlice";

function App() {
  const dispatch = useDispatch();
  //獲取redux store中的movie資料，並將其賦值給url
  const { url } = useSelector((state) => state.movie);
  console.log(url);
  useEffect(function () {
    apiTesting();
  }, []);
  const apiTesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      //console.log(res);
      //在react中使用 useDispatch 來觸發 actions,actions 可以修改 Redux 存儲中的狀態
      dispatch(getApiConfiguration(res));
      //將res資料傳入redux store中
    });
  };
  return (
    <div className="app">
      App
      {url?.total_pages}
    </div>
  );
}
//如果url存在 有資料，則顯示total_pages在畫面上
export default App;
