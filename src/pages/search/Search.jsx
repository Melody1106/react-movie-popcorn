import React, { useEffect, useState } from 'react';
import './style.scss';

import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';

import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

function Search() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  //mulit api變數狀態
  const { query } = useParams();
  const [pageNum, setPageNum] = useState(1);

  // 連接api
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(
      `/search/multi?query=${query}&language=zh-TW&page=${pageNum}`,
    )
      .then((res) => {
        setData(res);
        setPageNum((pre) => pre + 1);
        //在等下更新狀態時，使用先前的狀態值+1
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/search/multi?query=${query}&language=zh-TW&page=${pageNum}`,
    ).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data.results, ...res.results] });
      } else {
        setData(res);
      }
      setPageNum((pre) => pre + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      <ContentWrapper>
        {!loading && data?.results.length > 0 ? (
          <>
            <div className="pageTitle">
              {' '}
              {`${query} 搜尋結果: ${data.total_results}`}
            </div>

            <InfiniteScroll
              dataLength={data?.results.length}
              next={fetchNextPageData}
              hasMore={data?.total_pages > pageNum}
              loader={<h4>Loading...</h4>}
            >
              {data?.results.map((v, i) => {
                //如果搜尋結果是人物 不會有結果
                if (v.media_type === 'person') return false;
                return <MovieCard key={i} data={v} fromSearch={true} />;
              })}
            </InfiniteScroll>
          </>
        ) : (
          <span className="resultNotFound">Sorry, 無搜尋結果！</span>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Search;
