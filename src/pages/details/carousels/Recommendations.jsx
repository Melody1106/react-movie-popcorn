import React from 'react';
import './style.scss';

import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

function Recommendations({ mediaType, id }) {
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/recommendations?language=zh-TW`,
  );
  return (
    <div>
      <div className="title-about">推薦內容</div>
      <Carousel
        data={data?.results}
        loading={loading}
        mediaCategory={mediaType}
      />
    </div>
  );
}

export default Recommendations;
