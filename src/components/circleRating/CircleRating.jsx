import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './style.scss';

function CircleRating({ rating }) {
  return (
    <div className="circleRating">
      <CircularProgressbar value={rating} text={rating} />
    </div>
  );
}

export default CircleRating;
