import React from 'react';
import T from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Advert.css';

const Advert = ({ createdAt, photo, name, sale, price, tags}) => {

  // const handleLike = ev => {
  //   ev.preventDefault();
  //   // Manage like/unlike flow
  //   //console.log(ev);
  // };
 
  return (
    <article className="advert bordered">
       <div className="left">
      </div> 
      <div className="right">
      <div className="advert-header">
          <span className="advert-name">{name}</span>
          <span className="advert-separator">·</span>
        <time dateTime={createdAt} className="advert-creation">
             {formatDistanceToNow(new Date(createdAt))}
          </time>
          <span className="advert-separator">·</span>
        <span><time dateTime={createdAt}> Fecha Creación: {createdAt.split("T")[0]}</time></span>
        <p className="advert-price">Precio: {price} €</p>
          <span className="advert-sale">Tipo de Anuncio: {sale ? 'Venta' : 'Compra'}</span>
          <p className="advert-tags"> Tags: {'#'+tags.join(', #')} </p>
      </div>
      </div>
    </article>
  )
};

 export const advertType = {
   name: T.string.isRequired,
   sale: T.bool.isRequired,
   price: T.number.isRequired,
   tags: T.arrayOf(T.string.isRequired),
   photo: T.string,
   createdAt: T.string.isRequired,
   id: T.string.isRequired,
  };

//  export const advertType = {
//    name: T.string,
//    sale: T.bool,
//    price: T.number,
//    tags: T.arrayOf(T.string),
//    photo: T.string,
//    createdAt: T.string,
//    id: T.string,
//  };

Advert.propTypes = advertType;

export default Advert;
