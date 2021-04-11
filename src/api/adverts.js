import client from './client';

const advertsBaseUrl = '/api/v1';

export const getAdverts = (filter) => {
  const url = `${advertsBaseUrl}/adverts?${filter}`;
  return client.get(url);
   
};

export const getAdvertDetail = advertId => {
  const url = `${advertsBaseUrl}/adverts/${advertId}`;
  return client.get(url);
};

export const createAdvert = advert => {
    const url = `${advertsBaseUrl}/adverts`;
    return client.post(url, advert);
};

// Borrado de anuncio
export const deleteAdvert = advertId => {
    const url = `${advertsBaseUrl}/adverts/${advertId}`;
    return client.delete(url);
  };
  
// tags de adverts
export const getAdvertsTags = () => {
    const url = `${advertsBaseUrl}/adverts/tags`;
    return client.get(url);
};


  
