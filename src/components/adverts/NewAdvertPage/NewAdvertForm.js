import React from 'react';
import T, { string } from 'prop-types';
import useForm from '../../../hooks/useForm';
//import FormField from '../../shared/FormField';
import { Button } from '../../shared';
import { getAdvertsTags } from '../../../api/adverts';

const NewAdvertForm = ({onSubmit}) => {

  const [advert, handleChange, handleSubmit] = useForm(
    {
      name: '',
      price: '',
      sale: null, 
      tags: [],
      photo: null, 
    });
  
  // Obtengo los tags del backend para pintarlos en el select multiple 
  const [listaTags, setListaTags] = React.useState([]);
  
  React.useEffect(() => {
      getAdvertsTags().then(setListaTags);
  }, []);

  
  const afterPreventDefault = ev => {
    //console.log('Evento de afterPrevent', ev);
    const fData = new FormData();
    fData.append("name", advert.name);
    fData.append("price", advert.price);
    fData.append("tags", advert.tags);
    fData.append("sale", advert.sale);
    
    if (advert.photo !== '' && advert.photo !== null && advert.photo !== undefined) {
      fData.append("photo", advert.photo); 
    }
    
    //console.log('Enviando formData', fData);
    //onSubmit(advert);
    onSubmit(fData);
  };

  const { name, sale, tags, price, photo } = advert;
  
  const handle = handleSubmit(afterPreventDefault);
 
  return (
    <div className="newAdvertPage-container">
    <form encType="multipart/form-data" onSubmit={handle} >
     
      <label className="newAdvertPage-label">Nombre <
        span className="newAdvertPage-required">*** Campo obligatorio ***</span>
      </label>
      
      <br/>
      <input
        type="text"
        className="newAdvertPage-input"
        name="name"
        placeholder="Introduzca aquí su anuncio.."
        value={name}
        onChange={handleChange}
        autofocus
      />
      <label className="newAdvertPage-label">Precio <
        span className="newAdvertPage-required">*** Campo obligatorio ***</span>
      </label>
      <br/>
      <input
        type="number"
        className="newAdvertPage-input"
        name="price"
        placeholder="Introduzca aquí el precio de su anuncio.."
        value={price}
        onChange={handleChange}
      />
      <br/>
      <label className="newAdvertPage-label">
        Tipo de anuncio <
          span className="newAdvertPage-required">*** Campo obligatorio ***</span>
      </label>
      <fieldset>
      <label>
          Venta
        <input
          type="radio"
          name="sale"
          value={true}
          className="newAdvertPage-sale"
          onChange={handleChange}
        />
        </label>
        <label>
          Compra
        <input
          type ="radio"
          name="sale"
          value={false}
          className="newAdvertPage-sale"
          onChange={handleChange}
        />
        </label>
      </fieldset>
      <br />
      <label className="newAdvertPage-title"> Categorización: </label>
      <span className="newAdvertPage-required">*** Campo obligatorio (seleccione al menos uno) ***</span><br />
      <select
        className="newAdvertPage-tags"
        multiple={true}
        name="tags"
        value={tags}
        onChange = {handleChange}
      >
        {
          listaTags.map(tag => (
          <option key={tag} value={tag} className="newAdvertPage-tags"> {tag} </option>
          ))
        }
        
      </select>
      <br />
      <br />

      <label className="newAdvertPage-title">
          Imagen detalle anuncio
          <span className="newAdvertPage-optional"></span><br />
        </label>
        
        <input
          className="newAdvertPage-inputphoto"
          type="file"
          accept="image/*"
          name="photo"
          onChange={handleChange} />
        
      
        <br />
      <div className="newAdvertPage-footer">
        
        <Button
          type="submit"
          className="newAdvertPage-submit"
          variant="primary"
          disabled={!name || !price || !sale || (tags.length===0)}
        >
          Crear Anuncio
        </Button>
        
      </div>
      </form>
    </div>
  );
};

NewAdvertForm.propTypes = {
  name: T.string.isRequired,
  price: T.number.isRequired,
  tags: T.arrayOf(T.string).isRequired,
  sale: T.bool.isRequired,
};

export default NewAdvertForm;
