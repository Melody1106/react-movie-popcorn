import React, { useEffect } from 'react';

import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import DetailBanner from './detailsBanner/DetailBanner';
import Cast from './cast/Cast';

function Details() {
  const { mediaType, id } = useParams();
  //video
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/videos?language=zh-TW`,
  );
  //cast
  const { data: credits, loading: creditLoading } = useFetch(
    `/${mediaType}/${id}/credits`,
  );

  useEffect(() => {
    console.log(credits);
  }, [credits]);
  return (
    <div>
      {/* <DetailBanner video={DataTransfer.results[0]} /> */}
      <DetailBanner crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditLoading} />
    </div>
  );
}

export default Details;
