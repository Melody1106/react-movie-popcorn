import React from 'react';

import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import DetailBanner from './detailsBanner/DetailBanner';

function Details() {
  return (
    <div>
      <DetailBanner />
    </div>
  );
}

export default Details;
