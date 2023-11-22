import React from 'react';
import ReactPlayer from 'react-player';

import './style.scss';

function VideoPop() {
  return (
    <div>
      <div className="opacityLayer">
        <div className="videoPlayer">
          <span className="closeBtn">close</span>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
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
