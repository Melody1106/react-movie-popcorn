import React, { useEffect, useState } from 'react';
import './style.scss';

import useFetch from '../../hooks/useFetch';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';

import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';

//排序
const sortByData = [
  { value: 'popularity.desc', label: '受歡迎降冪排列' },
  { value: 'popularity.asc', label: '受歡迎升冪排列' },
  { value: 'vote_average.desc', label: '評分降冪排列' },
  { value: 'vote_average.asc', label: '評分升冪排列' },
  {
    value: 'primary_release_date.desc',
    label: '發行日期降冪排列',
  },
  { value: 'primary_release_date.asc', label: '發行日期降冪排列' },
  { value: 'original_title.asc', label: '名稱排列 (a-z)' },
];

function Explore() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  //mulit api變數狀態
  const { mediaType } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [sortby, setSortby] = useState(null);
  const [genre, setGenre] = useState(null);

  const { data: getGenres } = useFetch(`/genre/${mediaType}/list`);

  console.log('genreApi', getGenres);

  let filters = {};

  // 連接explore api
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}?language=zh-TW`, filters)
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
      `/discover/${mediaType}?page=${pageNum}&language=zh-TW`,
      filters,
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
    filters = {};
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectItems, action) => {
    if (action.name === 'sortby') {
      setSortby(selectItems);
      if (action.action !== 'clear') {
        filters.sort_by = selectItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === 'genres') {
      setGenre(selectItems);
      if (action.action !== 'clear') {
        let genreId = selectItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">探索</div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={getGenres?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="分類篩選"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              value={sortby}
              options={sortByData}
              name="sortby"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
              placeholder="排序"
            />
          </div>
        </div>
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
