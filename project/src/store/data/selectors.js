import {NameSpace} from '../root-reducer';

export const getOffer = (state) => state[NameSpace.DATA].offer;
export const getAllOffers = (state) => state[NameSpace.DATA].allOffers;
export const getFavorites = (state) => state[NameSpace.DATA].favorites;
export const getUpdateOffer = (state) => state[NameSpace.DATA].updateOffer;
export const getFetchDataStatus = (state) => state[NameSpace.DATA].fetchDataStatus;
