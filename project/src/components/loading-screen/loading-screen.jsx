import React from 'react';


const loading = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginRight: '-50%',
  transform: `translate('${-50}%', '${-50}%')`,
  fontSize: '30px',
};

function LoadingScreen() {
  return (
    <div style={loading}>Loading&#8230;</div>
  );
}

export default LoadingScreen;
