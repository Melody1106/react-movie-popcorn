import React from 'react';

import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import DetailBanner from './detailsBanner/DetailBanner';
import Cast from './cast/Cast';

function Details() {
  return (
    <div>
      <DetailBanner />
      <Cast />
    </div>
  );
}

export default Details;
