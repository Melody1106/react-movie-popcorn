import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss';
import Image from '../../../components/lazyLoadImage/Image';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

import useFetch from '../../../hooks/useFetch';

function MainBanner() {
  const navigate = useNavigate();

  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');

  //從redux store中獲取movie資料
  const { url } = useSelector((state) => state.movie);

  //使用useFetch中的資料
  const { data, loading } = useFetch('/movie/upcoming?language=zh-TW');
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    console.log('bg-url', bg);
    //backdrop_path來自於api /movie/upcoming的資料results
    //將bg存進background狀態中 /lyHmhoRj3zXSdeCYbs2oOXLCF4K.jpg
    setBackground(bg);
  }, [data]);

  const handleQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleClickQuery = () => {
    navigate(`/search/${query}`);
  };
  return (
    <div className="mainBanner">
      {!loading && (
        <div className="background-img">
          <Image srcPop={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="mainBannerContent">
          <span className="title">
            隨時打開新的我
            <br />
            豈止經典 精彩上線
          </span>
          <span className="subTitle">
            Open a new me at any time. <br />
            More than just classics, exciting new releases
          </span>

          <div className="searchInput">
            <input
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleQuery}
              type="text"
              placeholder="輸入關鍵字尋找戲劇電影"
            />
            <button onClick={handleClickQuery}>搜尋</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default MainBanner;
