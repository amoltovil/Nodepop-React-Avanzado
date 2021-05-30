import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './NewAdvertPage.css';
import Layout from '../../layout/Layout';
import NewAdvertForm from './NewAdvertForm';
//import { createAdvert } from '../../../api/adverts';
import { advertCreateAction } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const NewAdvertPage = props => {
  //const [error, setError] = React.useState(null);
  const [createdAdvert, setCreatedAdvert] = React.useState(null);

  const dispatch = useDispatch();
  const { error } = useSelector(getUi);  

  const handleSubmit = async newAdvert => {
    // dispara la acción para introducir el anuncio en redux  
    //  const advert = await createAdvert(newAdvert);
    //dispatch(advertsCreated(advert));
    //dispatch(advertCreateAction(newAdvert)).then(advert => setCreatedAdvert(advert));
    const advert = await dispatch(advertCreateAction(newAdvert));
    setCreatedAdvert(advert);
    
  };

  if (error && error.status === 401) {
    return <Redirect to="/login" />;
  }

  if (createdAdvert) {
    return <Redirect to={`/advert/${createdAdvert.id}`} />;
  }

  return (
    <Layout title="Creación Nuevo Anuncio" {...props}>
      <div className="newAdvertPage bordered" style={{ borderBottomWidth: 10 }}>
        <div className="right">
          <NewAdvertForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;