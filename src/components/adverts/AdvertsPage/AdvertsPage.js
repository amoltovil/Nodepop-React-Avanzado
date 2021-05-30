import React from 'react';
import T from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import scopedStyles from './AdvertsPage.module.css';
import Layout from '../../layout/Layout';
import AdvertsList from './AdvertsList';
import FilterForm from './FilterForm';
import EmptyList from './EmptyList';
import './AdvertsPage.css';
import { getAdvertsStateSort, getUi } from '../../../store/selectors';
import { advertsLoadAction } from '../../../store/actions';

const initialState = {
    name: '',
    pricemin: '',
    pricemax: '',
    sale: null, 
    tags: [],
};

const AdvertsPage = ({ className, ...props }) => {  
  const dispatch = useDispatch();
  const adverts = useSelector(getAdvertsStateSort);
  const { isLoading } = useSelector(getUi);

  const [filters, setFilters] = React.useState({
    name: '',
    pricemin: '',
    pricemax: '',
    sale: null,
    tags: [],
  });

  React.useEffect(() => {
    
    const filterInicial = ''; //traemos todos los anuncios del backend en el 1er render
    dispatch(advertsLoadAction(filterInicial)); // llamamos a la accion de cargar anuncios

  }, []);

  const clearFilters = () => {
    setFilters({ ...initialState });
  }
  
  const handleReset = ev => {
    clearFilters();
  }
  
  // const handleFilter = ev => {
  //   ev.preventDefault();
  //   console.log(filters);
  //   filterAdverts(adverts, filters);
  // }
   
  // Función que recoje los inputs del Formulario de los filtros
  // y los prepara para realizar el filtro correctamente

  const handleChange = ev => {
    let value;
    switch (ev.target.name) {
      case 'name':
        value = ev.target.value;
        break;
      case 'tags':
        value = Array.from(ev.target.selectedOptions, option => option.value);
        break;
      case 'pricemin':
      case 'pricemax':
        if (ev.target.value !== '') {
          value = parseInt(ev.target.value, 10);
        }
        else {
          value = ev.target.value;
        }
        break;
      case 'sale':
      // console.log('sale', ev.target.value)
        if (ev.target.value === 'true') {
          value = Boolean(ev.target.value);
        }
        if (ev.target.value === 'false') {
          value = !Boolean(ev.target.value);
        }
        if (ev.target.value === 'all') {
          value = null;
        }
        break;
        
      default:
        value = ev.target.value;
        break;
    }
  
   setFilters({
    ...filters,
    [ev.target.name]: value, 
  })
  }

  const filterByName = filter => ({ name }) => {
    const nameFilter = filter.trim();
    return !nameFilter || new RegExp(nameFilter, 'gi').test(name);
  };

  const filterByPrice = filter => ({ price }) => {
    if (!filter.pricemin && !filter.pricemax) {
       return true;
    }
    
    if (!filter.pricemax) {
      return price >= filter.pricemin;
    }
    
    return price >= filter.pricemin && price <= filter.pricemax;
  };

  
  const filterBySale = filter => ({ sale }) => {
    //console.log('sale', sale);
    if (filter === null) {
      return true;
    }
    return filter === sale;
  };

  const filterByTags = filter => ({ tags }) =>
    !filter.length || filter.every(tag => tags.includes(tag));

  const filterAdverts = (adverts, { name, pricemin, pricemax, sale, tags }) => {
    
    const applyFilters = (...filters) =>
      adverts.filter(advert => filters.every(filter => filter(advert)));
    
    return applyFilters(
      filterByName(name),
      filterByPrice({ pricemin, pricemax }),
      filterBySale(sale),
      filterByTags(tags)
    );
  };
  

  const filteredAdverts = filterAdverts(adverts, filters);
  
  return (
    <Layout title="Listado de Anuncios" {...props} >
      {adverts.length > 0 && (
      <FilterForm
          filters={filters}
          onChange={handleChange}
          onReset={handleReset}
          //onFilter={handleFilter}
          
        />
      )}
       {isLoading && 'Loading Adverts ...'}
      <div className={classnames(scopedStyles.advertsPage, className)}>
        
       {/* { adverts.length ? <AdvertsList adverts={applyFilters(adverts)} /> : <EmptyList />}  */}
        {filteredAdverts.length ?
          <AdvertsList adverts={filteredAdverts} />
          :
          <EmptyList advertsCount={adverts.length}/>}
      </div>
      
    </Layout>
  );
};

AdvertsPage.propTypes = {
  className: T.string,
};

export default AdvertsPage;
