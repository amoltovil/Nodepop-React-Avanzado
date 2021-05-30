import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import Advert, { advertType } from './Advert';

const AdvertsList = ({ adverts }) => {
  
  return (
    <ul className="advertsList">
      {adverts.map(advert => (
        <li key={advert.id}>
          <Link to={`/advert/${advert.id}`}>
            <Advert
              {...advert}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

AdvertsList.propTypes = {
  adverts: T.arrayOf(T.shape(advertType)),
};

export default AdvertsList;
