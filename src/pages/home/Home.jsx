import React from "react";
import "./style.scss";
import MainBanner from "./mainBanner/MainBanner";
import Trending from "./trending/Trending";

function Home() {
  return (
    <div>
      <MainBanner />
      <Trending />
    </div>
  );
}

export default Home;
