import * as types from './types';
import { axiosGlobal } from '../../../network';
import { PUBLIC_API_KEY } from '../../../utils';

export const fetchHeroes = (heroCount, offset) => {
  return dispatch => {
    const url = '/characters';

    return axiosGlobal
      .get(url,{
        params: {
          apikey: PUBLIC_API_KEY,
          limit: heroCount,
          offset: offset
        }
    })
      .then(({data}) => {
        console.log(data.data);
        dispatch({
          type: types.FETCH_HEROES_SUCCESS,
          payload: data.data
        });
      })
      .catch(error => {
        dispatch({
          type: types.FETCH_HEROES_ERROR,
          payload: error
        });
      });
  };
};