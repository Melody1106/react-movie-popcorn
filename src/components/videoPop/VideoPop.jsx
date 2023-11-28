import React from 'react';
import ReactPlayer from 'react-player';

import './style.scss';

function VideoPop({ show, setShow, videoId, setVideoId }) {
  const handleVideoPop = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? 'visible' : ''}`}>
      <div className="opacityLayer">
        <div className="videoPlayer">
          <span className="closeBtn" onClick={handleVideoPop}>
            CLOSE
          </span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPop;
