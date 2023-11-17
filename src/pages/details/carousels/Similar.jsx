import React, { useEffect } from 'react';
import './style.scss';

import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

function Similar({ mediaType, id }) {
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/similar?language=zh-TW`,
  );

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  return (
    <div>
      <div className="title-about">相關影片</div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
}

export default Similar;
