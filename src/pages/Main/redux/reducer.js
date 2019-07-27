import * as types from './types';

export const MainPageReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_HEROES_SUCCESS:
      return { ...state, heroes: action.payload };
    case types.FETCH_HEROES_ERROR:
      return { ...state, heroesError: action.payload };
    default:
      return state;
  }
};