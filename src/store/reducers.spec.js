import { adverts, initialState } from './reducers';
import {
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_DETAIL_SUCCESS,
    ADVERTS_LOADED_FAILURE,
    ADVERTS_CREATED_SUCCESS, 
} from './types';

describe('adverts', () => {
    test('should manage ANY action', () => {
      const state = initialState.adverts;
      const action = { type: 'ANY' }; // cualquier acción no contemplada 
      const nextState = adverts(state, action);
      expect(nextState).toBe(state);
    });
  
    test('should manage ADVERTS_LOADED_SUCCESS action', () => {
      const state = initialState.adverts;
      const advertsData = [];
      const action = { type: ADVERTS_LOADED_SUCCESS, payload: advertsData };
      const expectedState = {
        ...initialState.adverts,
        loaded: true,
        data: advertsData,
      };
      const nextState = adverts(state, action);
      expect(nextState).toStrictEqual(expectedState);
    });
  
    test('should manage ADVERTS_LOADED_FAILURE action', () => {
        const state = initialState.adverts;
        const action = { type: ADVERTS_LOADED_FAILURE }; 
        const nextState = adverts(state, action);
        expect(nextState).toBe(state);
    });

    test('should manage ADVERTS_DETAIL_SUCCESS action', () => {
      const state = initialState.adverts;
      const advert = {};
      const action = { type: ADVERTS_DETAIL_SUCCESS, payload: advert };
      const expectedState = {
        ...initialState.adverts,
        loaded: false,
        data: [...initialState.adverts.data, advert],
      };
      const nextState = adverts(state, action);
      expect(nextState).toStrictEqual(expectedState);
    });

    test('should manage ADVERTS_CREATED_SUCCESS action', () => {
        const state = initialState.adverts;
        const advert = {id:'1'};
        const action = { type: ADVERTS_CREATED_SUCCESS, payload: advert };
        const expectedState = {
          ...initialState.adverts,
          loaded: false,
          data: [...initialState.adverts.data, advert],
        };
        const nextState = adverts(state, action);
        expect(nextState).toStrictEqual(expectedState);
        expect(nextState.data).toEqual([{ id: '1' }]);
        expect(nextState.loaded).toEqual(false);
      });
  
  });