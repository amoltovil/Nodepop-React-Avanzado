import React from 'react';
import { Button } from '../../shared';
import { getAdvertsTags } from '../../../api/adverts';
import './FilterForm.css';

const FilterForm = ({ onChange, onReset, filters}) => {

    //Obtengo los tags del backend para mostrarlos en pantalla
    const [listaTags, setListaTags] = React.useState([]);
    
    React.useEffect(() => {
        getAdvertsTags().then(setListaTags);
    }, []);
        
   
    return (
        
        <div className="container-form-filter">
            <div className="form-filter-title"><h4>Filtros de Anuncios</h4></div>
            
            <form id="form-filter" className="form-filter"
                 onChange={onChange}
            >
                <label className="form-filter-subtitle">Nombre: </label>
                <input
                    className="search-name"
                    name="name"
                    type="text"
                    placeholder="Search by name..."
                    value={filters.name}
                    onChange={onChange}
                />
                <br />
                <label className="form-filter-subtitle">Tipo de anuncio:</label>
                <fieldset className ="form-filter-gradio">
                   <label>Venta
                    <input
                    type="radio"
                    name="sale"
                    value={true}
                    className="option-formfilter-rb"
                    onChange={onChange}
                    />
                    </label>
                    <label>Compra
                    <input
                    type ="radio"
                    name="sale"
                    value={false}
                    className="option-formfilter-rb"
                    onChange={onChange}
                    />
                    </label>
                    <label>Ambos
                    <input
                    type ="radio"
                    name="sale"
                    value={'all'}   
                    className="option-formfilter-rb"
                    onChange={onChange}
                            
                    />
                    </label>
                </fieldset>
                <br />
            
                <label className="form-filter-subtitle">Precio desde / hasta: </label>
                <input
                    className="search-price"
                    name="pricemin"
                    type="text"
                    placeholder="Price from..."
                    value={filters.pricemin}
                    onChange={onChange}
                />
                <span>   /  </span>
                <input
                    className="search-price"
                    name="pricemax"
                    type="text"
                    placeholder="Price to..."
                    value={filters.pricemax}
                    onChange={onChange}
                />
                <br />
                
                <label className="form-filter-subtitle">Búsqueda por Tags: </label>
                
                <select
                    className="form-filter-tags"
                    multiple={true}
                    name="tags"
                    onChange={onChange}
                    value={filters.tags}
                >
                
                    <option key={'notag'} value={''} className="form-filter-tags"> -- </option>
                    {
                    listaTags.map(tag => (
                    <option key={tag} value={tag} className="form-filter-tags"> {tag} </option>
                    ))}
                </select>
                <br />
                <br />
         
                <div className="newFilterForm-footer">
            
                    <Button
                        type="button"
                        className="filter-button"
                        variant="primary"
                        onClick={onReset}
                    >
                        Limpiar Filtros
                    </Button>
            
                </div>
            </form>
        </div>
    );   
}

FilterForm.defaultProps = {
    filters: {},
  };

export default FilterForm;