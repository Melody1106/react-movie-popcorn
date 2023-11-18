import React, { useEffect, useState } from 'react';
import './style.scss';

import useFetch from '../../hooks/useFetch';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';

import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

//排序
const sortByData = [
  { value: 'popularity.desc', label: 'popularity Descending' },
  { value: 'popularity.asc', label: 'popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending',
  },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'original_title.asc', label: 'Title (a-z)' },
];

function Explore() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  //mulit api變數狀態
  const { mediaType } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [sortby, setSortby] = useState(null);

  // 連接api
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}?language=zh-TW`)
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
    // `/discover/${mediaType}&language=zh-TW&page=${pageNum}&sort_by=popularity.desc`,
    fetchDataFromApi(
      `/discover/${mediaType}?page=${pageNum}?language=zh-TW`,
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
    fetchInitialData();
  }, [mediaType]);

  return (
    <div className="explorePage">
      <ContentWrapper>
        {!loading && (
          <>
            {/* loding animation  */}
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results.length}
                next={fetchNextPageData}
                hasMore={data?.total_pages > pageNum}
                loader={<h4>Loading...</h4>}
              >
                {data?.results.map((v, i) => {
                  //如果搜尋結果是人物 不會有結果
                  if (v.media_type === 'person') return false;
                  return <MovieCard key={i} data={v} mediaType={mediaType} />;
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, 無搜尋結果！</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Explore;
