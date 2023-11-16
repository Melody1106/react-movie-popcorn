import React, { useRef } from 'react';
import './style.scss';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Image from '../lazyLoadImage/Image';
// 沒有poster替代圖
import NoPosterPic from '../../assets/no-poster.png';
import GenresTag from '../genres/GenresTag';

import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Carousel({ data, loading }) {
  const { url } = useSelector((state) => state.movie);
  const carouselContainer = useRef();
  //console.log(carouselContainer.current);
  //訪問所存取的DOM元素

  const scrollDirection = (dir) => {
    //carouselItems 現在位置
    const container = carouselContainer.current;

    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
    //console.log('12334');
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <div className="carouselTitle"></div>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => scrollDirection('left')}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => scrollDirection('right')}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((v) => {
              const posterUrl = v.poster_path
                ? url.poster + v.poster_path
                : NoPosterPic;
              return (
                <div key={v.id} className="carouselItem">
                  <div className="posterBlock">
                    <Image srcPop={posterUrl} />
                  </div>
                  <div className="textBlock">
                    <GenresTag data={v.genre_ids.slice(0, 3)} />
                    <span className="title">{v.title || v.name}</span>
                    <div className="date">
                      {dayjs(v.release_date).format('YYYY-MM-DD')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </ContentWrapper>
    </div>
    // <div ref={carouselContainer}>
    //   Carousel
    //   <div>{data}</div>
    // </div>
  );
}

export default Carousel;
