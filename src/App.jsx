import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getCategory } from './store/movieSlice';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Search from './pages/search/Search';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {
  const dispatch = useDispatch();
  //獲取redux store中的movie資料，並將其賦值給url
  const { url } = useSelector((state) => state.movie);
  //console.log(url);
  useEffect(function () {
    fetchApiConfig();
    genresCall();
  }, []);
  //根據url連接configuration details
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      //console.log('img detail',res);
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };

      //在react中使用 useDispatch 來觸發 actions,actions 可以修改 Redux 存儲中的狀態
      dispatch(getApiConfiguration(url));
      //將res資料傳入redux store中
    });
  };

  const genresCall = async () => {
    let promiseAry = [];
    let categorys = ['tv', 'movie'];
    //創建一個空物件 allGenres，它將用於存儲所有類型的數據
    let allGenres = {};

    categorys.forEach((url) => {
      promiseAry.push(fetchDataFromApi(`/genre/${url}/list?language=zh-TW`));
    });

    //使用 Promise.all 等待所有的承諾（API 請求）完成。一旦所有請求都完成，data 陣列將包含每個請求的回傳數據
    const data = await Promise.all(promiseAry);
    console.log('category', data);
    //透過map data陣列將兩個陣列資料提取出來，在解構賦值
    //在map一次將id資料存入allGenres物件
    data.map(({ genres }) => {
      return genres.map((v) => (allGenres[v.id] = v));
    });
    console.log('allGenres', allGenres);

    dispatch(getCategory(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
//如果url存在 有資料，則顯示total_pages在畫面上
export default App;
