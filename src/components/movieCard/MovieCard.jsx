import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import Image from '../lazyLoadImage/Image';
import GenresTag from '../genres/GenresTag';
import NoPosterPic from '../../assets/no-poster.png';

function MovieCard({ data, fromSearch }) {
  const { url } = useSelector((state) => state.movie);
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : NoPosterPic;
  return (
    <div className="movieCard">
      <div className="posterBlock">
        <Image srcPop={posterUrl} className="posterImg" />
        {!fromSearch && <GenresTag data={data.genre_ids.slice(0, 3)} />}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">{data.release_date}</span>
      </div>
    </div>
  );
}

export default MovieCard;
