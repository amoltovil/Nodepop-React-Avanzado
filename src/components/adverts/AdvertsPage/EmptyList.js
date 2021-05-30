import React from 'react';
import T from 'prop-types';
import Button from '../../shared/Button';
import { Link } from 'react-router-dom';

// const EmptyList = () => (
//     <div style={{ textAlign: 'center' }}>
//       <p>Listado de Anuncios Vacio</p>
//       <Button as={Link} to="/advert/new" variant="primary">
//         Crear Anuncio
//       </Button>
//     </div>
//   );

function EmptyList({ advertsCount }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p> Ningún anuncio encontrado </p>
      {advertsCount > 0 ? (
        'Redefina su búsqueda...'
      ) : (
        <Button as={Link} to="/advert/new">Crear Anuncio</Button>
      )}
    </div>
  );
}

EmptyList.propTypes = {
  advertsCount: T.number.isRequired,
};

export default EmptyList;