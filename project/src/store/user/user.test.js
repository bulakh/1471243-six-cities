import {user} from './user.js';
import {ActionType} from '../action.js';
import {AuthorizationStatuses} from '../../const.js';

describe('Reducer: user', () => {
  const state = {
    authorizationStatus: AuthorizationStatuses.UNKNOWN,
    email: '',
  };

  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatuses.UNKNOWN,
        email: '',
      });
  });

  it('should check require authorization status', () => {
    const requireAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatuses.AUTH,
    };

    expect(user(state, requireAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatuses.AUTH,
        email: '',
      });
  });

  it('should logout from user account', () => {
    const logoutAction = {
      type: ActionType.LOGOUT,
    };

    expect(user(state, logoutAction))
      .toEqual({
        authorizationStatus: AuthorizationStatuses.NO_AUTH,
        email: '',
      });
  });

  it('should get email user in store', () => {
    const takeEmailAction = {
      type: ActionType.TAKE_EMAIL,
      payload: 'foma@mail.com',
    };

    expect(user(state, takeEmailAction))
      .toEqual({
        authorizationStatus: AuthorizationStatuses.UNKNOWN,
        email: 'foma@mail.com',
      });
  });


});
