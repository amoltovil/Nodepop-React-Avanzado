import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { getAdverts } from '../../../api/adverts';
import scopedStyles from './AdvertsPage.module.css';
import Layout from '../../layout/Layout';
import AdvertsList from './AdvertsList';
import FilterForm  from './FilterForm';
import { Button } from '../../shared';
import './AdvertsPage.css';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Listado de Anuncios Vacio</p>
    <Button as={Link} to="/advert/new" variant="primary">
      Crear Anuncio
    </Button>
  </div>
);

const initialState = {
    name: '',
    pricemin: '',
    pricemax: '',
    sale: null, 
    tags: [],
};

const AdvertsPage = ({ className, ...props }) => {
  const [adverts, setAdverts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    name: '',
    pricemin: '',
    pricemax: '',
    sale: null, 
    tags: [],
    
  });

  const clearFilters = () => {
    setFilters({ ...initialState });
}
  
  const handleReset = ev => {
    clearFilters();
  }
  
  // Función que recoje los inputs del Formulario de los filtros
  // y los prepara para realizar el filtro correctamente
  const handleChange = ev => {
    if (ev.target.name !== 'tags' && ev.target.name === 'name') {
      console.log('entro en nombre', ev.target.value);
      setFilters({
        ...filters,
        [ev.target.name]: ev.target.value
      });
    }
    else if (ev.target.name === 'tags') {
      
      let target = ev.target;
      let name = target.name;
      let value = Array.from(target.selectedOptions, option => option.value);
      setFilters({
        ...filters,
        [ev.target.name]: value
      })
    }
    else if (ev.target.name !== 'tags' &&
      (ev.target.name === 'pricemin' || ev.target.name === 'pricemax')) {
      if (ev.target.name !== '') {
        setFilters({
          ...filters,
          [ev.target.name]: parseInt(ev.target.value, 10)
        });
      }
      else {
        setFilters({
          ...filters,
          [ev.target.name]: ev.target.value
        });
      }
    }
    else if (ev.target.name !== 'tags' && ev.target.name === 'sale') {
      let vsale = ev.target.value;
      console.log('valor de sale', vsale);
      console.log('valor de sale al pasarlo a Boolean', Boolean(vsale));
      if (vsale !== 'all' && vsale === 'true') {
        console.log('valor de sale en true', Boolean(ev.target.value));
        setFilters({
          ...filters,
          [ev.target.name]: Boolean(ev.target.value)
        });
      } else if (vsale !== 'all' && vsale === 'false'){
        console.log('valor de sale en false', !Boolean(ev.target.value));
        setFilters({
          ...filters,
          [ev.target.name]: !Boolean(ev.target.value)
        });
      } else if (vsale === 'all') {
        console.log('valor de sale en all');
        
         setFilters({
           ...filters,
           [ev.target.name]: null
         });
      }
    }
  };

  React.useEffect(() => {
    
    const filterInicial = ''; //traemos todos los anuncios del backend en el 1er render
    getAdverts(filterInicial).then(setAdverts);
    
  }, []);

  const applyFilters = () => {
    // Función que filtra por cada campo por separado y luego concatena los resultados.
    let advertsByName = [];
    let advertsByPrice = [];
    let advertsByTags = [];
    let advertsBySale = [];
    let advertsResults = [];
    
    if (filters.name === '' && filters.pricemin === '' && filters.pricemax === '' && filters.sale === null
      && (filters.tags.length === 0 || filters.tags[0]==='')) {
      console.log('sin filtros a aplicar')
      return adverts;
    }
    else {
      console.log('name', filters.name)
      console.log('pricemin', filters.pricemin)
      console.log('pricemax', filters.pricemax)
      console.log('sale', filters.sale)
      console.log('tags', filters.tags)

      if (filters.name !== '') {
        advertsByName = adverts.filter(advert => {
          return (advert.name === filters.name);
        })
      }
      console.log('Anuncios por Nombre', advertsByName);

      if (filters.preciomin !== '' && filters.preciomax !== '') {
        advertsByPrice = adverts.filter(advert => {
          return (advert.price >= filters.pricemin && advert.price <= filters.pricemax);
        });
      } else if ((filters.preciomin !== '') &&
        (filters.pricemax === '' || filters.pricemax === null || filters.pricemax === undefined)) {
        advertsByPrice = adverts.filter(advert => {
          return (advert.price >= filters.pricemin);
        });
      }
        else if ((filters.preciomax !== '') &&
        (filters.pricemin === '' || filters.pricemin === null || filters.pricemin === undefined)) {
        advertsByPrice = adverts.filter(advert => {
          return (advert.price <= filters.pricemax);
        });
      } 
      console.log('Anuncios por precio', advertsByPrice);
    
      if (filters.tags.length > 0) {
        advertsByTags = adverts.filter(advert => {
          //return (someEquals(advert.tags, filters.tags));
          return (advert.tags.some((r)=>filters.tags.indexOf(r)>=0))
        });
      }
      console.log('Anuncios por tags', advertsByTags);
      
      if (filters.sale !== null) {
        advertsBySale = adverts.filter(advert => {
          return (advert.sale === filters.sale);
        })
      }
      console.log('Anuncios por sale', advertsBySale);

      if (advertsByName.length > 0) {
        advertsResults = advertsResults.concat(advertsByName);
      }
      if (advertsByPrice.length > 0) {
        advertsResults = advertsResults.concat(advertsByPrice);
      }
      if (advertsByTags.length > 0) {
        advertsResults = advertsResults.concat(advertsByTags);
      }
      if (advertsBySale.length > 0) {
        advertsResults = advertsResults.concat(advertsBySale);
      }
      
      console.log('Anuncios resultado', advertsResults);
      // Eliminamos anuncios duplicados 
      const result = advertsResults.reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      }, []);
      console.log('Anuncios resultado', result);
      return (result);
    
    }
  };

  const applyFilters2 = () => {
  
    if (filters.name === '' && filters.pricemin === '' && filters.pricemax === ''
      && filters.sale === null && filters.tags.length === 0) {
      console.log('no hay filtros');
      return adverts;
    } else {
    
      // Funcion que compara arrays para comprobar la existencia de los tags en cada anuncio
      const someEquals = (a, b) => a.some((v, i) => v === b[i]);
      
      const advertsFiltered = adverts.filter(advert => {
        
        if (filters.name.length > 0 && filters.sale.length > 0 && filters.preciomin.length > 0 &&
          filters.pricemax > 0 && filters.tags.length > 0) {
          return (
            (advert.name.length ? advert.name === filters.name : true)
            && (advert.sale === filters.sale)
            && (advert.price >= filters.preciomin && advert.price <= filters.pricemax)
            && (someEquals(advert.tags, filters.tags)));
        }
       });

        return advertsFiltered;
      
    }
  }

  return (
    <Layout title="Listado de Anuncios" {...props} >
      <FilterForm
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
      
        />
      <div className={classnames(scopedStyles.advertsPage, className)}>
        
        {adverts.length ? <AdvertsList adverts={applyFilters(adverts)} /> : <EmptyList />}
      </div>
      
    </Layout>
  );
};

export default AdvertsPage;
