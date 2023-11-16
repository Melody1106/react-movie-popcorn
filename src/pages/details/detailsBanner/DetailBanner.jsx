import React, { useEffect } from 'react';

import './style.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';

import Image from '../../../components/lazyLoadImage/Image';
// 沒有poster替代圖
import NoPosterPic from '../../../assets/no-poster.png';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import PlayBtn from '../PlayBtn';

function DetailBanner() {
  const { url } = useSelector((state) => state.movie);
  // console.log(url);
  const { mediaType, id } = useParams();
  //console.log(id, mediaType);
  const { data, loading } = useFetch(`/${mediaType}/${id}?language=zh-TW`);

  useEffect(() => {
    console.log(data);
  }, [data]);
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
                    <div className="row"></div>
                    <div className="">類型：</div>
                    <div className="overview">
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.original_language && (
                        <div className="infoItem">
                          <span className="text bold"> 語言:</span>
                          <span className="text">
                            {data.original_language}{' '}
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
                          <span className="text">{data.runtime} </span>
                        </div>
                      )}
                    </div>
                    <div className="info"></div>
                    <div className="info"></div>
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
