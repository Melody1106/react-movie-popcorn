import React, { useState } from 'react';

import './style.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Image from '../../../components/lazyLoadImage/Image';
import { PlayIcon } from '../playBtn';
import VideoPop from '../../../components/videoPop/VideoPop';

function VideoSection({ data, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <div className="videoSection">
      <ContentWrapper>
        <div className="sectionHeading">《預告影片》</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((v) => (
              <div className="videoItem" key={v.id}>
                <div className="videoThumbnail">
                  <Image
                    srcPop={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{v.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </ContentWrapper>
      <VideoPop />
    </div>
  );
}

export default VideoSection;
