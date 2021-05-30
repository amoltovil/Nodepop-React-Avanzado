import { getAdvertDetailState, getAdvertsLoaded, getTagsLoaded } from './selectors';

import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE, 
    AUTH_LOGOUT,
    ADVERTS_CREATED_REQUEST,
    ADVERTS_CREATED_SUCCESS,
    ADVERTS_CREATED_FAILURE,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_FAILURE,
    ADVERTS_DETAIL_REQUEST,
    ADVERTS_DETAIL_SUCCESS,
    ADVERTS_DETAIL_FAILURE,
    ADVERTS_DELETE_REQUEST,
    ADVERTS_DELETE_SUCCESS,
    ADVERTS_DELETE_FAILURE, 
    UI_RESET_ERROR,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS, 
    TAGS_LOADED_FAILURE,
} from './types';

//import { login } from '../api/auth';

/***
 * TAGS ACTIONS CREATORS
 */

export const tagsLoadedRequest = () => {
    return {
        type: TAGS_LOADED_REQUEST,
    };
};

export const tagsLoadedSuccess = (tags) => {
    return {
        type: TAGS_LOADED_SUCCESS,
        payload: tags, 
    };
};

export const tagsLoadedFailure = (error) => {
    return {
        type: TAGS_LOADED_FAILURE,
        payload: error,
        error: true,
    };
};

// thunk para cargar los tags
export const tagsLoadAction = () => {
    
    return async function (dispatch, getState, { api }) {
        //console.log('tagsLoadAction', getState());
        const tagsLoaded = getTagsLoaded(getState());
        if (tagsLoaded) {
            return; // no ejecuta el api porque ya los tiene en el store
        }
        try {
            const tags = await api.adverts.getAdvertsTags();
            dispatch(tagsLoadedSuccess(tags));
        } catch (error) {
            dispatch(tagsLoadedFailure(error));
        }
    };
};

/**
 * UI ACTIONS CREATORS
 */

export const resetError = () => {
    return {
        type: UI_RESET_ERROR,
    }
}

export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
    };
};

export const authLoginSuccess = () => {
    return {
        type: AUTH_LOGIN_SUCCESS, 
    };
};

export const authLoginFailure = (error) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload: error,
        error: true,
    };
};

export const loginAction = (credentials) => {
    // se le puede pasar un 3er parametro con un objeto con las llamadas al api
    // y nos ahorramos el import del api
    return async function (dispatch, getState, {api, history}) {

        dispatch(authLoginRequest());
        try {
            await api.auth.login(credentials);  // llamada al API
            dispatch(authLoginSuccess());  //acción síncrona
            // Redirect se podría hacer con una función //redirect();
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.replace(from);  // substituye la ruta para evitar ir hacia atras
        } catch (error) {
            dispatch(authLoginFailure(error));
        }
    };
};

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    };
};

/**
 * ADVERTS ACTIONS CREATORS
 */

export const advertsLoadedRequest = () => {
    return {
        type: ADVERTS_LOADED_REQUEST,
    };
};

export const advertsLoadedSuccess = (adverts) => {
    return {
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts,
    };
};

export const advertsLoadedFailure = (error) => {
    return {
        type: ADVERTS_LOADED_FAILURE,
        payload: error,
        error: true
    };
};

// thunk para cargar adverts
export const advertsLoadAction = (filterInicial) => {
    
    return async function (dispatch, getState, { api, history}) {
        //console.log('advertsLoadAction', getState());
        const advertsLoaded = getAdvertsLoaded(getState());
        if (advertsLoaded) {
            return; // no ejecuta el api porque ya los tiene 
        }
        dispatch(advertsLoadedRequest())
        try {
            //const filterInicial = ''; //traemos todos los anuncios del backend en el 1er render
            const adverts = await api.adverts.getAdverts(filterInicial);
            dispatch(advertsLoadedSuccess(adverts));
        } catch (error) {
            dispatch(advertsLoadedFailure(error));
        }
    };
};

export const advertsCreatedRequest = () => {
    return {
        type: ADVERTS_CREATED_REQUEST,
    };
};

export const advertsCreatedSuccess = (advert) => {
    return {
        type: ADVERTS_CREATED_SUCCESS,
        payload: advert,
    };
};

export const advertsCreatedFailure = (error) => {
    return {
        type: ADVERTS_CREATED_FAILURE,
        payload: error,
        error: true
    };
};

export const advertCreateAction = advert => {
//     return function (dispatch, getState, { api }) {
//         dispatch(advertsCreatedRequest());        
//         return api.adverts.createAdvert(advert)
//             .then(createAdvert => dispatch(advertsCreatedSuccess(createAdvert)))
//             .catch(error => dispatch(advertsCreatedFailure(error)));     
// }
    return async function (dispatch, getState, { api, history }) {
        dispatch(advertsCreatedRequest());
        try {
            const createdAdvert = await api.adverts.createAdvert(advert);
            dispatch(advertsCreatedSuccess(createdAdvert));
            // redirect with history
            //history.push(`/advert/${createdAdvert.id}`);
            return createdAdvert;
        }
        catch (error) {
            dispatch(advertsCreatedFailure(error));
        }
    }
}

export const advertsDetailRequest = () => {
    return {
      type: ADVERTS_DETAIL_REQUEST,
    };
};

export const advertsDetailSuccess = advert => {
    return {
      type: ADVERTS_DETAIL_SUCCESS,
      payload: advert,
    };
};
  
export const advertsDetailFailure = error => {
    return {
        type: ADVERTS_DETAIL_FAILURE,
        payload: error,
        error: true,
    };
  };

// Thunk - Detail advert
export const advertsDetailAction = advertId => {
    return async function (dispatch, getState, { api, history }) {
      const advertLoaded = getAdvertDetailState(getState(), advertId);
      if (advertLoaded) {
        return;
      }
       dispatch(advertsDetailRequest());
      try {
        const advert = await api.adverts.getAdvertDetail(advertId);
        dispatch(advertsDetailSuccess(advert));
        return advert;
      } catch (error) {
        dispatch(advertsDetailFailure(error));
      }
    };
  };

export const advertsDeleteRequest = () => {
    return {
        type: ADVERTS_DELETE_REQUEST,
    };
};
export const advertsDeleteSuccess = (advertId) => {
    return {
        type: ADVERTS_DELETE_SUCCESS,
        payload: advertId,
    };
};

export const advertsDeleteFailure = (error) => {
    return {
        type: ADVERTS_DELETE_FAILURE,
        payload: error,
        error: true
    };
};

export const advertsDeleteAction = advertId => {
    return async function (dispatch, getState, { api, history }) {
      dispatch(advertsDeleteRequest());
        try {
          //const advertDeleted = await api.adverts.deleteAdvert(advertId);
          await api.adverts.deleteAdvert(advertId);
          dispatch(advertsDeleteSuccess(advertId));
          history.push('/adverts');
          //return advertDeleted;
       } catch (error) {
        dispatch(advertsDeleteFailure(error));
       }
    };
  };


