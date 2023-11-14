import React, { useRef } from "react";
import "./style.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../lazyLoadImage/Image";
// 沒有poster替代圖
import NoPosterPic from "../../assets/no-poster.png";

import { useSelector } from "react-redux";
import dayjs from "dayjs";

function Carousel({ data, loading }) {
  const { url } = useSelector((state) => state.movie);
  const carouselContainer = useRef();
  //console.log(carouselContainer.current);
  return (
    <div className="carousel">
      <ContentWrapper>
        <div className="carouselTitle"></div>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" />
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" />
        {!loading ? (
          <div className="carouselItems">
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
                    <span className="title">{v.title}</span>
                    <div className="date">
                      {dayjs(v.release_date).format("YYYY-MM-DD")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <span>Loading...</span>
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
