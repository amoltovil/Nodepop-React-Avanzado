import configureStore from 'redux-mock-store'; // simulamos el store de redux con el paquete redux-mock-store
import thunk from 'redux-thunk';
import { advertCreateAction, loginAction } from './actions';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE, 
} from './types';

// Con redux-mock-store podemos crear un store simulado
const createStore = extraArgument => state => {
  const middleware = [thunk.withExtraArgument(extraArgument)];
  const mockStore = configureStore(middleware);
  const store = mockStore(state);
  return store;
};

describe('loginAction', () => {
  describe('when login api resolves', () => {
    const credentials = 'credentials';
    const history = {
      location: {},
      replace: jest.fn(),
    };
    const api = {
      auth: { login: jest.fn().mockResolvedValue() },
      };
      
    const expectedActions = [
        { type: AUTH_LOGIN_REQUEST },
        { type: AUTH_LOGIN_SUCCESS },
      ]

    const store = createStore({ api, history })();  // ya incluye un dispatch mockeado

    test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
      await store.dispatch(loginAction(credentials)); 
      const actions = store.getActions(); // podemos obtener las acciones que se han disparado
      expect(actions).toEqual(expectedActions);
      expect(api.auth.login).toBeCalledWith(credentials);
    });
  });
    
    describe('when login api throws', () => {
        const credentials = 'credentials';
        const error = 'Unauthorized';
        const history = {
            location: {},
            replace: jest.fn(),
        };
        const api = {
            auth: { login: jest.fn() },
        };
        const expectedActions = [
            { type: AUTH_LOGIN_REQUEST },
            { type: AUTH_LOGIN_FAILURE, payload: error, error: true },
        ];

        const store = createStore({ api, history })();  // ya incluye un dispatch mockeado

        test('should dispatch an AUTH_LOGIN_FAILURE action', async () => {
            api.auth.login.mockRejectedValue(error);  // mockeamos que devuelva error
            await store.dispatch(loginAction(credentials));
            const actions = store.getActions(); // podemos obtener las acciones que se han disparado
           // console.log(actions);
            expect(api.auth.login).toBeCalledWith(credentials);
            expect(actions).toEqual(expectedActions);
            expect(actions.length).toEqual(2);
            
          });
    });
});

describe('advertCreateAction', () => {
  describe('when createAdvert api resolves', () => {
    // simulamos que resuelva la promesa de createAdvert
    
    const advert = 'advert';
    const history = {
      location: {},
      replace: jest.fn(),
    };
    
    const api = {
      adverts: { createAdvert: jest.fn().mockResolvedValue() },
    };

    const expectedActions = [
      { type: ADVERTS_CREATED_REQUEST },
      { type: ADVERTS_CREATED_SUCCESS },
    ]

    const store = createStore({ api, history })();  // ya incluye un dispatch mockeado

    test('should dispatch an ADVERTS_CREATED_SUCCESS action', async () => {
       await store.dispatch(advertCreateAction(advert)); 
       const actions = store.getActions(); // podemos obtener las acciones que se han disparado
       //console.log(actions);
       expect(actions).toEqual(expectedActions);
       expect(api.adverts.createAdvert).toBeCalledWith(advert);
     });
  });

  describe('when createAdvert api throws', () => {
    const advert = null;
    const error = 'error';
    const history = {
        location: {},
        replace: jest.fn(),
    };
    const api = {
        adverts: { createAdvert: jest.fn() },
    };
    const expectedActions = [
        { type: ADVERTS_CREATED_REQUEST },
        { type: ADVERTS_CREATED_FAILURE, payload: error, error: true },
    ];

    const store = createStore({ api, history })();  // ya incluye un dispatch mockeado

    test('should dispatch an ADVERTS_CREATED_FAILURE action', async () => {
      api.adverts.createAdvert.mockRejectedValue(error);  // mockeamos que devuelva error
      await store.dispatch(advertCreateAction(advert));
      const actions = store.getActions(); // podemos obtener las acciones que se han disparado
      
      expect(api.adverts.createAdvert).toBeCalledWith(advert);
      expect(api.adverts.createAdvert).toReturn();
      expect(actions).toEqual(expectedActions);
      expect(actions.length).toEqual(2);
        
    });
  });
});