import {
  authLoginRequest,
  authLoginSuccess, 
  authLoginFailure,
  advertsLoadedSuccess,
  advertsLoadedFailure,
  advertsLoadedRequest,
  advertsCreatedSuccess, 
  loginAction,
  advertsLoadAction,
  advertCreateAction, 
} from './actions';

import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE,
} from './types';
  
/** TEST DE ACCIONES SINCRONAS DE AUTH */
  
describe('authLoginRequest', () => {
    test('should return an AUTH_LOGIN_REQUEST action', () => {
      const expectedAction = { type: AUTH_LOGIN_REQUEST };
      const result = authLoginRequest();
      //expect(result.type).toBe(AUTH_LOGIN_REQUEST);
      //expect(result).toMatchObject({ type: AUTH_LOGIN_REQUEST });
      expect(result).toEqual(expectedAction);
    });
});
  
describe('authLoginSuccess', () => {
    test('should return an AUTH_LOGIN_SUCCESS action', () => {
      const expectedAction = { type: AUTH_LOGIN_SUCCESS };
      const result = authLoginSuccess();
      expect(result).toEqual(expectedAction);
    });
});

describe('authLoginFailure', () => {
    test('should return an AUTH_LOGIN_FAILURE action', () => {
      const error = 'Invalid Credentials';
      const expectedAction = { type: AUTH_LOGIN_FAILURE, payload: error, error:true };
      const result = authLoginFailure(error);
      expect(result.type).toBe(AUTH_LOGIN_FAILURE);
      expect(result).toEqual(expectedAction);
    });
});

describe('advertsLoadedRequest', () => {
  test('should return a ADVERTS_LOADED_REQUEST action', () => {
      const expectedAction = { type: ADVERTS_LOADED_REQUEST };
      const result = advertsLoadedRequest();
      expect(result).toEqual(expectedAction);
  });
});

describe('advertsLoadedSuccess', () => {
    test('should return a ADVERTS_LOADED_SUCCESS action', () => {
        const adverts = 'adverts';
        const expectedAction = { type: ADVERTS_LOADED_SUCCESS, payload: adverts };
        const result = advertsLoadedSuccess(adverts);
        expect(result).toEqual(expectedAction);
    });
});

describe('advertsLoadedFailure', () => {
    test('should return a ADVERTS_LOADED_FAILURE action', () => {
        const error = 'error';
        const expectedAction = { type: ADVERTS_LOADED_FAILURE, payload: error, error:true };
        const result = advertsLoadedFailure(error);
        expect(result).toEqual(expectedAction);
    });
});

describe('advertsCreatedSuccess', () => {
  test('should return a ADVERTS_CREATED_SUCCESS action', () => {
      const advert = 'advert';
      const expectedAction = { type: ADVERTS_CREATED_SUCCESS, payload: advert };
      const result = advertsCreatedSuccess(advert);
      expect(result).toEqual(expectedAction);
  });
});


/** TEST DE ACCIONES ASINCRONAS */
describe('loginAction', () => {
  describe('when login api resolves', () => {
      // simulamos que resuelva la promesa de login
      const credentials = 'credentials';
      const action = loginAction(credentials);  // Thunk
      // con los mocks, simulamos las llamadas de las funciones de los parametros
      const dispatch = jest.fn();  // fn mockeada
      const getState = () => {};
      const history = {
        location: {},
        replace: jest.fn(),
      };
      
      const api = {
        auth: { login: jest.fn().mockResolvedValue() },
      };
  
    test('should dispatch an AUTH_LOGIN_REQUEST action', () => {
        // realizamos la llamada a la acción
        action(dispatch, getState, { api, history });
        expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
      });
  
      test('should call api.auth.login', () => {
        action(dispatch, getState, { api, history });
        expect(api.auth.login).toHaveBeenCalledWith(credentials);
      });
  
      test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
        await action(dispatch, getState, { api, history });  // necesita el await
        expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTH_LOGIN_SUCCESS });
      });
  
      test('should redirect to /', async () => {
        await action(dispatch, getState, { api, history });
        expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
      });
    });
  
    describe('when login api throws', () => {
      const credentials = 'credentials';
      const action = loginAction(credentials);
      const dispatch = jest.fn();
      const getState = () => {};
      const error = 'Unauthorized';
      const api = {
        auth: { login: jest.fn() }, 
      };
  
      test('should dispatch an AUTH_LOGIN_FAILURE action', async () => {
        api.auth.login.mockRejectedValue(error);  // mockea que devuelva error
        await action(dispatch, getState, { api });
        //console.log(dispatch.mock.calls);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AUTH_LOGIN_FAILURE,
          payload: error,
          error: true,
        });
      });
    });
  });
  
describe('advertsLoadAction', () => {
  describe('when getAdverts api resolves', () => {
    // simulamos la carga de los adverts 
    const filterInicial = '';
    const action = advertsLoadAction(filterInicial);
    const dispatch = jest.fn();  // fn mockeada
    const mockState = {
      advertsLoaded: false,
    }
    const getState = () => mockState.advertsLoaded;

    const getAdvertsLoaded = jest.fn();

    const api = {
      adverts: { getAdverts: jest.fn().mockResolvedValue() },
    };
    
    test('getAdvertsLoaded returns false', () => {
      expect(getAdvertsLoaded()).toBeFalsy();
    });

    // test('should call api.adverts.getAdverts', () => {
    //   //getState = () => mockState.advertsLoaded;
    //   getAdvertsLoaded();
    //   action(dispatch, getState, { api, history });
    //   expect(api.adverts.getAdverts).toHaveBeenCalledWith(filterInicial);
    // });

    //  test('should dispatch an ADVERTS_LOADED_REQUEST action', () => {
    //    // realizamos la llamada a la acción
    //    getAdvertsLoaded();
    //    getState();
    //   // console.log('api', api);
    //   // console.log('getstate', getState);
    //    action(dispatch, getState, { api, history });
    //    //expect(dispatch).toHaveBeenCalledWith({ type: ADVERTS_LOADED_REQUEST });
    //  });

  });
});

describe('advertCreateAction', () => {
  describe('when createAdvert api resolves', () => {
    // simulamos que resuelva la promesa de createAdvert
    const advert = 'advert';
    const action = advertCreateAction(advert);  // Thunk
    
    const dispatch = jest.fn();  // fn mockeada
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };

    const api = {
      adverts: { createAdvert: jest.fn().mockResolvedValue() },
    };

    test('should dispatch an ADVERTS_CREATE_REQUEST action', () => {
      // realizamos la llamada a la acción
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: ADVERTS_CREATED_REQUEST });
    });

    test('should call api.advert.createAdvert', () => {
      action(dispatch, getState, { api, history });
      
      expect(api.adverts.createAdvert).toHaveBeenCalledWith(advert);
    });

    test('should dispatch an ADVERTS_CREATED_SUCCESS action', async () => {
      await action(dispatch, getState, { api, history });  // necesita el await
      expect(dispatch).toHaveBeenNthCalledWith(2, { type: ADVERTS_CREATED_SUCCESS });
    });

  });
});
