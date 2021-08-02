import React from 'react';
import {useSelector} from 'react-redux';
import {getError} from '../../store/user/selectors.js';
import ToastError from '../toast-error/toast-error.jsx';


const loading = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginRight: '-50%',
  transform: `translate('${-50}%', '${-50}%')`,
  fontSize: '30px',
};

function LoadingScreen() {
  const error = useSelector(getError);

  return (
    <div>
      {error !== '' && <ToastError/>}
      <div style={loading}>
        Loading...
      </div>
    </div>
  );
}

export default LoadingScreen;
