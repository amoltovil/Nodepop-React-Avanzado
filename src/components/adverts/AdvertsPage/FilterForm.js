import React from 'react';
import T from 'prop-types';
import { Button } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { tagsLoadAction } from '../../../store/actions';
import { getTagsState } from '../../../store/selectors';
import './FilterForm.css';

const FilterForm = ({ onChange, onReset, onFilter, filters }) => {
    
    const dispatch = useDispatch();
    // Obtengo los tags del store de redux
    const listaTags = useSelector(getTagsState);
        
    React.useEffect(() => {
          // despachamos la accion de carga de tags 
          dispatch(tagsLoadAction());
    }, []);
      
    return (
        
        <div className="container-form-filter">
            <div className="form-filter-title"><h4>Filtros de Anuncios</h4></div>
            
            <form id="form-filter" className="form-filter"
              //  onChange={onChange}
              //  onSubmit={onFilter}
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
                    
                    {/* <Button
                        type="submit"
                        className="filter-button"
                        variant="primary"
                        onClick={onFilter}
                    >
                        Aplicar Filtros
                    </Button> */}
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
  
FilterForm.propTypes = {
  //  onFilter: T.func.isRequired,
    onChange: T.func.isRequired,
    onReset: T.func.isRequired,   
};
  
export default FilterForm;