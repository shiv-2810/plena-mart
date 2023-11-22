export const addToFavorites = item => ({
    type: 'ADD_TO_FAVORITES',
    payload: item
  });
  
  export const removeFromFavorites = item => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: item
  });

const initialState = {
    favorites: []
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        return { ...state, favorites: [...state.favorites, action.payload] };
      case 'REMOVE_FROM_FAVORITES':
        return { ...state, favorites: state.favorites.filter(item => item.id !== action.payload.id) };
      default:
        return state;
    }
  };
  
  export default favoritesReducer;