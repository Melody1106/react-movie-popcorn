import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

function GenresTag({ data }) {
  const { category } = useSelector((state) => state.movie);
  return (
    <div className="genres">
      {data?.map((g) => {
        if (!category[g]) return;
        return (
          <div key={g} className="genre">
            {category[g].name}
          </div>
        );
      })}
    </div>
  );
}

export default GenresTag;
