import {user} from './user.js';
import {ActionType} from '../action.js';
import {AuthorizationStatuses} from '../../const.js';

describe('Reducer: user', () => {
  const state = {
    authorizationStatus: AuthorizationStatuses.UNKNOWN,
    email: '',
    avatar: '',
    error: '',
  };

  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatuses.UNKNOWN,
        email: '',
        avatar: '',
        error: '',
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
        avatar: '',
        error: '',
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
        avatar: '',
        error: '',
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
        avatar: '',
        error: '',
      });
  });

  it('should get avatar user in store', () => {
    const takeAvatarAction = {
      type: ActionType.TAKE_AVATAR,
      payload: 'https://7.react.pages.academy/static/avatar/2.jpg',
    };

    expect(user(state, takeAvatarAction))
      .toEqual({
        authorizationStatus: AuthorizationStatuses.UNKNOWN,
        email: '',
        avatar: 'https://7.react.pages.academy/static/avatar/2.jpg',
        error: '',
      });
  });


});
