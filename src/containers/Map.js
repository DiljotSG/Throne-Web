import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import {
  Typography,
} from 'antd';

const { Title } = Typography;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '100%',
        height: '400px',
        latitude: 49.8080954,
        longitude: -97.1375209,
        zoom: 14,
      },
    };
  }

  render() {
    const { viewport } = this.state;
    return (
      <>
        <Title>Map</Title>
        <ReactMapGL
          {...viewport} // eslint-disable-line react/jsx-props-no-spreading
          onViewportChange={(newView) => this.setState({ viewport: newView })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        />
      </>
    );
  }
}
export default Map;
