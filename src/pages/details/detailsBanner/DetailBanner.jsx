import React, { useEffect } from 'react';

import './style.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';

import Image from '../../../components/lazyLoadImage/Image';
// 沒有poster替代圖
import NoPosterPic from '../../../assets/no-poster.png';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import CircleRating from '../../../components/circleRating/CircleRating';
import { PlayIcon } from '../../../pages/details/PlayBtn';
import GenresTag from '../../../components/genres/GenresTag';

function DetailBanner({ crew }) {
  const { url } = useSelector((state) => state.movie);
  // console.log(url);
  const { mediaType, id } = useParams();
  //detail
  //console.log(id, mediaType);
  const { data, loading } = useFetch(`/${mediaType}/${id}?language=zh-TW`);

  //在r=credits api中的crew中找出job為Director的人
  const director = crew?.filter((f) => f.job === 'Director');
  //console.log(director);
  const writer = crew?.filter(
    (f) => f.job === 'Screenplay' || f.job === 'Writer' || f.job === 'Story',
  );

  const toHourAndMin = function (time) {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };

  const genreData = data?.genres?.map((g) => g.id);

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Image srcPop={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Image
                        srcPop={url.backdrop + data.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      <Image srcPop={NoPosterPic} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{data.title || data.name}</div>
                    <div className="subtitle">{data.original_title}</div>
                    <div className="row">
                      <CircleRating
                        rating={data.vote_average.toFixed(1) * 10}
                      />
                      <div className="playbtn">
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="">類型：</div>
                      <GenresTag data={genreData} />
                    </div>

                    <div className="overview">
                      {data.overview && <div className="">劇情：</div>}

                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.original_language && (
                        <div className="infoItem">
                          {/* <span className="text bold"> 語言:</span> */}
                          <span className="text">
                            {data.original_language.toUpperCase()}
                          </span>
                        </div>
                      )}

                      {data.status && (
                        <div className="infoItem">
                          <span className="text"> {data.status}</span>
                        </div>
                      )}

                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text">{data.release_date}</span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text">
                            {toHourAndMin(data.runtime)}{' '}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">導演：</span>
                        <span className="text">
                          {director.map((d, i) => (
                            <span key={i}>{d.name}</span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">編劇：</span>
                        <span className="text">
                          {writer.map((w, i) => (
                            <span key={i}>
                              {w.name}
                              {writer.length !== 0 && ','}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold"> Creator</span>
                        <span className="text">
                          {data.created_by.map((c, i) => (
                            <span key={i}>
                              {c.name}
                              {data.created_by.length - 1 !== i && ','}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default DetailBanner;
