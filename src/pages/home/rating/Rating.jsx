import React, { useEffect, useState } from 'react';

import './style.scss';

import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

function Rating() {
  const [mediaCategory, setMediaCategory] = useState('tv');

  const { data, loading } = useFetch(
    `/${mediaCategory}/top_rated?language=zh-TW`,
  );
  const onTabToggle = (tab) => {
    setMediaCategory(tab === '戲劇' ? 'tv' : 'movie');
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselTitle">Rating</div>
        <SwitchTabs data={['戲劇', '電影']} onTabToggle={onTabToggle} />
      </ContentWrapper>
      <Carousel
        data={data ? data.results : null}
        loading={loading}
        mediaCategory={mediaCategory}
      />
    </div>
  );
}

export default Rating;
