//import { combineReducers } from 'redux';

import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
   // AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_CREATED_REQUEST,
    ADVERTS_CREATED_SUCCESS,
    ADVERTS_DETAIL_SUCCESS,
    ADVERTS_DETAIL_FAILURE,
    ADVERTS_DELETE_SUCCESS,
    ADVERTS_DELETE_FAILURE, 
    UI_RESET_ERROR,
    TAGS_LOADED_SUCCESS,
} from './types';

export const initialState = {
    auth: false,
    adverts: {
        loaded: false,
        data: []
    },
    ui: {
        loading: false,
        error: null,
    },
    tags: {
        loaded: false,
        data: [],
    }
};

// function oldReducer(state=initialState, action) {
//     switch (action.type) {
//   //      case AUTH_LOGIN_REQUEST:

//         case AUTH_LOGIN_SUCCESS:
//             return { ...state, auth: true };
//     //    case AUTH_LOGIN_FAILURE:
            
//         case AUTH_LOGOUT:
//             return { ...state, auth: false };
//         case ADVERTS_LOADED:
//             return { ...state, adverts: action.payload.adverts };
//         case ADVERTS_CREATED:
//             // return { ...state, advert: [...state.adverts, action.payload.advert] };
//             return { ...state, adverts: state.adverts.concat(action.payload.advert) };
//         default:
//             return state;
//     }
// }

export function tags(state = initialState.tags, action) {
    if (action.error) {
        return { ...state, loaded: false, error: action.payload };
    }
    switch (action.type) {
        
        case TAGS_LOADED_SUCCESS:
            return { ...state, loaded: true, data: action.payload };
        default:
            return state;
    };
};

export function auth(state=initialState.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return true;
            //return { ...state, auth: true };
     //   case AUTH_LOGIN_FAILURE:
            //return false;
        case AUTH_LOGOUT:
            return false;
            //return { ...state, auth: false };
        default:
            return state;
    };
};

export function adverts(state=initialState.adverts, action) {
    switch (action.type) {
        case ADVERTS_LOADED_SUCCESS:
            //return action.payload;
            return { ...state, loaded: true, data: action.payload };
        //return { ...state, adverts: action.payload.adverts };
        //case ADVERTS_CREATED:
            // return { ...state, advert: [...state.adverts, action.payload.advert] };
            //return { ...state, adverts: state.adverts.concat(action.payload.advert) };
            //return [...state, action.payload];
          //  return { ...state, data: [...state.data, action.payload] };
        case ADVERTS_CREATED_SUCCESS:
        case ADVERTS_DETAIL_SUCCESS:
            return { ...state, loaded: false, data: [...state.data, action.payload] };
        case ADVERTS_DELETE_SUCCESS:
            // en data de adverts devuelvo los datos de los anuncios sin el anuncio borrado
            return {
                ...state,
                loaded: true,
                data: state.data.filter(advert => advert.id !== action.payload),
            };
        default:
            return state;
    }
}

// {
//     loading: false,
//     error: null,     
// }
export function ui(state = initialState.ui, action) {
    if (action.error) {
        return { ...state, loading: false, error: action.payload };
    }
    if (action.type.includes('REQUEST')) {
        // limpiamos el error y ponemos loading a true
        return { ...state, loading: true, error: null };
    }
    if (action.type.includes('SUCCESS')) {
        // ponemos el loading a false
        return { ...state, loading: false };
    }

    switch (action.type) {
        
        // case AUTH_LOGIN_REQUEST:
        // case ADVERTS_LOADED_REQUEST:
        // case ADVERTS_CREATED_REQUEST:
        //     // limpiamos el error y ponemos loading a true
        //     return { ...state, loading: true, error: null };
        // case AUTH_LOGIN_SUCCESS:
        // case ADVERTS_LOADED_SUCCESS:
        // case ADVERTS_CREATED_SUCCESS:
        // case ADVERTS_DETAIL_SUCCESS:
        //     return { ...state, loading: false };
        case UI_RESET_ERROR:
            // limpia el error
            return {
                    ...state, error: null,
                };
    
        default:
            return state;
    }
}

// function reducerStep1(state = initialState, action) {
//     return {
//         auth:auth(state.auth, action), 
//         adverts: adverts(state.adverts, action),
//     }
// }

// const reducer = combineReducers({
//     auth: auth,
//     adverts: adverts,
// })

// export default reducer;