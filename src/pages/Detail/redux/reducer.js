import * as types from './types';

export const DetailPageReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_HERO_DETAIL_SUCCESS:
      return { ...state, heroDetail: action.payload };
    case types.FETCH_HERO_DETAIL_ERROR:
      return { ...state, heroDetailError: action.payload };
    case types.FETCH_HERO_COMICS_SUCCESS:
      return { ...state, heroComics: action.payload };
    case types.FETCH_HERO_COMICS_ERROR:
      return { ...state, heroComicsError: action.payload };
    default:
      return state;
  }
};