import React, { useEffect, useState } from 'react';

import './style.scss';

import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

function Popular() {
  const [popularType, setPopularType] = useState('tv');

  const { data, loading } = useFetch(`/${popularType}/popular?language=zh-TW`);
  const onTabToggle = (tab) => {
    setPopularType(tab === '戲劇' ? 'tv' : 'movie');
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Popular</div>
        <SwitchTabs data={['戲劇', '電影']} onTabToggle={onTabToggle} />
      </ContentWrapper>
      <Carousel data={data ? data.results : null} loading={loading} />
    </div>
  );
}

export default Popular;
