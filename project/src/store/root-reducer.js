import {combineReducers} from 'redux';
import {data} from './data/data.js';
import {navigation} from './navigation/navigation.js';
import {user} from './user/user.js';

export const NameSpace = {
  DATA: 'DATA',
  NAVIGATION: 'NAVIGATION',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.NAVIGATION]: navigation,
  [NameSpace.USER]: user,
});
