import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getError} from '../../store/user/selectors.js';
import {pushError} from '../../store/action.js';

const ToastContainer = {
  position: 'fixed',
  zIndex: '1000',
  top: '0',
  left: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: '0.4em',
  paddingLeft: '0.4em',
  width: '100%',
  height: '0',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  lineHeight: '1.5',
  boxSizing: 'border-box',
};

const ToastItem = {
  display: 'inline-flex',
  marginBottom: '0.4em',
  padding: '0.4em',
  border: 'solid 1px #900',
  borderRadius: '0.2em',
  backgroundColor: '#fee',
  color: '#900',
};

function ToastError() {
  const SHOW_TIME = 5000;
  const errorMessage = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(pushError('')), SHOW_TIME);
  }, [dispatch]);


  return (
    <div style={ToastContainer}>
      <span style={ToastItem}>{errorMessage}</span>
    </div>
  );
}

export default ToastError;
