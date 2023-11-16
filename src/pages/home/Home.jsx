import React from 'react';
import './style.scss';
import MainBanner from './mainBanner/MainBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import Rating from './rating/Rating';

function Home() {
  return (
    <div>
      <MainBanner />
      <Trending />
      <Rating />
      <Popular />
    </div>
  );
}

export default Home;
