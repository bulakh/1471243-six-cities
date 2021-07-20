import {NameSpace} from '../root-reducer.js';

export const getCity = (state) => state[NameSpace.NAVIGATION].city;
export const getSelectedPointId = (state) => state[NameSpace.NAVIGATION].selectedPointId;
export const getSort = (state) => state[NameSpace.NAVIGATION].sort;
