import * as types from './types';
import { axiosGlobal } from '../../../network';
import { PUBLIC_API_KEY } from '../../../utils';

export const fetchHeroDetail = (heroId) => {
  return dispatch => {
    const url = `/characters/${heroId}`;

    return axiosGlobal
      .get(url, {
        params: {
          apikey: PUBLIC_API_KEY
        }
      })
      .then(({data}) => {
        dispatch({
          type: types.FETCH_HERO_DETAIL_SUCCESS,
          payload: data.data
        })
      })
      .catch(error => {
        dispatch({
          type: types.FETCH_HERO_DETAIL_ERROR,
          payload: error
        })
      });
  };
};

export const fetchHeroComics = (heroId) => {
  return dispatch => {
    const url = `/characters/${heroId}/comics`;

    return axiosGlobal
      .get(url, {
        params: {
          apikey: PUBLIC_API_KEY,
          startYear: 2005,
          orderBy: 'onsaleDate',
          limit: 10
        }
      })
      .then(({data}) => {
        dispatch({
          type: types.FETCH_HERO_COMICS_SUCCESS,
          payload: data.data
        })
      })
      .catch(error => {
        dispatch({
          type: types.FETCH_HERO_COMICS_ERROR,
          payload: error
        })
      });
  };
};