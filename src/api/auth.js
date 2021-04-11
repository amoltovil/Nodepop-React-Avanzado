import client, { configureClient, resetClient } from './client';
import storage from '../utils/storage';

// export const login = credentials => {
//   return client.post('/auth/login', credentials).then(({ accessToken }) => {
//     configureClient({ accessToken });
//     storage.set('auth', accessToken);
//   });
// };

export const login = credentials => {
  
    return client.post('api/auth/login', credentials).then(({ accessToken }) => {
      configureClient({ accessToken });
  
      if (credentials.rememberMe) {
        storage.set('auth', accessToken);
      }
    
    })
      // .catch(error => {
      
      // if (error.status === 401) {
      //   console.log('Error de Login', error);
      //   alert('usuario no identificado');
      //   return error;
      //   //<Redirect to="/login" />;

      // }
    //});
    
    
};
  
export const logout = () => {
    return Promise.resolve().then(() => {
      resetClient();
      storage.remove('auth');
    });
  };