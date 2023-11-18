import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './style.scss';

function CircleRating() {
  return (
    <div className="circleRating">
      <CircularProgressbar value={60} text={`$60%`} />
    </div>
  );
}

export default CircleRating;
