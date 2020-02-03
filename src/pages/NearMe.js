import React from 'react';
import PropTypes from 'prop-types';

const NearMe = (props) => {
  const { locations } = props;
  return (
    <>
      <h1>Near Me</h1>
      { locations.length > 0 ? locations.map((location) => (<li key={location}>{location}</li>)) : 'Loading locations....' }
    </>
  );
};

NearMe.propTypes = {
  locations: PropTypes.instanceOf(Array),
};

NearMe.defaultProps = {
  locations: [],
};


export default NearMe;
