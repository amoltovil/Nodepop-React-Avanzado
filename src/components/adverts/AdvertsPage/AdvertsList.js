import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import Advert, { advertType } from './Advert';

// const renderAdvert = history => advert => (
//   <Advert key={advert.id} {...advert} history={history} />
// );

const AdvertsList = ({ adverts }) => {
  // const handleClick = tweetId => {
  //   history.push(`/tweet/${tweetId}`);
  // };

  return (
    <ul className="advertsList">
      {adverts.map(advert => (
        <li key={advert.id}>
          <Link to={`/advert/${advert.id}`}>
            <Advert
              {...advert}
              // history={history}
              // onClick={() => handleClick(advert.id)}
            />
          </Link>
        </li>
      ))}
      {/* {adverts.map(renderAdvert(history))} */}
    </ul>
  );
};

AdvertsList.propTypes = {
  adverts: T.arrayOf(T.shape(advertType)),
};

export default AdvertsList;
