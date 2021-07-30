import {NameSpace} from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getEmail = (state) => state[NameSpace.USER].email;
export const getAvatar = (state) => state[NameSpace.USER].avatar;
export const getError = (state) => state[NameSpace.USER].error;
