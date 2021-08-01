import {user} from './user.js';
import {ActionType} from '../action.js';
import {AuthorizationStatus} from '../../const.js';

describe('Reducer: user', () => {
  const state = {
    authorizationStatus: AuthorizationStatus.UNKNOWN,
    email: '',
    avatar: '',
    error: '',
  };

  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        email: '',
        avatar: '',
        error: '',
      });
  });

  it('should check require authorization status', () => {
    const requireAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(user(state, requireAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
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
        authorizationStatus: AuthorizationStatus.NO_AUTH,
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
        authorizationStatus: AuthorizationStatus.UNKNOWN,
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
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        email: '',
        avatar: 'https://7.react.pages.academy/static/avatar/2.jpg',
        error: '',
      });
  });


});
