import React, { useEffect, useState } from 'react';

import './style.scss';

import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

function Trending() {
  const [mediaCategory, setMediaCategory] = useState('day');

  const { data, loading } = useFetch(
    `/trending/movie/${mediaCategory}?language=zh-TW`,
  );
  const onTabToggle = (tab) => {
    setMediaCategory(tab === '當日' ? 'day' : 'week');
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={['當日', '本週']} onTabToggle={onTabToggle} />
      </ContentWrapper>
      <Carousel
        data={data ? data.results : null}
        loading={loading}
        mediaCategory={mediaCategory}
      />
    </div>
  );
}

export default Trending;
