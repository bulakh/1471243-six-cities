import React, {useState} from 'react';

// eslint-disable-next-line react/display-name
export const withToggle = (Component) => (props) => {
  const [isActive, setActive] = useState(false);

  const handleActiveChange = () => setActive(!isActive);
  return (
    <Component
      {...props}
      isActive={isActive}
      onActiveChange={handleActiveChange}
    />
  );
};
