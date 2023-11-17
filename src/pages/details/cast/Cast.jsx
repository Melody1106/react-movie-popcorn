import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Image from '../../../components/lazyLoadImage/Image';
import avatar from '../../../assets/avatar.png';

function Cast({ data, loading }) {
  const { url } = useSelector((state) => state.movie);

  return (
    <div className="castSection">
      <div className="sectionHeading">《 演出陣容 》</div>
      <ContentWrapper>
        {!loading ? (
          <div className="listItems">
            {data?.map((v) => {
              let imgUrl = v.profile_path
                ? url.profile + v.profile_path
                : avatar;
              return (
                <div key={v.id} className="listItem">
                  <div className="profileImg">
                    <Image srcPop={imgUrl} />
                  </div>
                  <div className="name">{v.name}</div>
                  <div className="character">{v.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Cast;
