import {NameSpace} from '../root-reducer';

export const getOffer = (state) => state[NameSpace.DATA].offer;
export const getAllOffers = (state) => state[NameSpace.DATA].allOffers;
export const getFetchDataStatus = (state) => state[NameSpace.DATA].fetchDataStatus;
