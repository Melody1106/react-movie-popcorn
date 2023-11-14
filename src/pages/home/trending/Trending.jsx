import React, { useEffect, useState } from "react";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

function Trending() {
  const [trendingType, setTrendingType] = useState("day");

  const { data, loading } = useFetch(
    `/trending/movie/${trendingType}?language=zh-TW`
  );
  const onTabToggle = (tab) => {
    setTrendingType(tab === "當日" ? "day" : "week");
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["當日", "本週"]} onTabToggle={onTabToggle} />
      </ContentWrapper>
      <Carousel data={data ? data.results : null} loading={loading} />
    </div>
  );
}

export default Trending;
