// selector de Auth
export const getIsLogged = state => state.auth;
//export const getIsLogged = state => !!state.auth; // es lo mismo q lo anterior

//export const getTweets = state => state.tweets;
// les añade la lógica de ordenar los tweets por fecha al obtener el state de los tweets
// export const getTweets = state => state.tweets.sort((t1, t2) => {
//     if (t1.updatedAt < t2.updatedAt) return 1;
//     return -1;
// });

//export const getTweetsLoaded = state => !!state.tweets.data.length;  // para saber si tenemos tweets cargadps
// export const getTweetsLoaded = state => !!state.tweets.loaded;

// export const getTweetDetail = (state, tweetId) => {
//    return state.tweets.data.find(tweet => tweet.Id === Number(tweetId));
// };

// selectores de Adverts
export const getAdvertsState = state => state.adverts;

export const getAdvertsStateSort = state => state.adverts.data.sort((t1, t2) => {
    if (t1.createdAt < t2.createdAt) return 1;
    return -1;
});

export const getAdvertsLoaded = state => !!state.adverts.loaded;

// selecciona solo uno
export const getAdvertDetailState = (state, advertId) => {
    return state.adverts.data.find(advert => advert.id === advertId);
 };
 
// devolvemos todo el estado de ui
export const getUi = state => state.ui;

// Selectores de tags
export const getTagsState = state => state.tags.data;

export const getTagsLoaded = state => !!state.tags.loaded;