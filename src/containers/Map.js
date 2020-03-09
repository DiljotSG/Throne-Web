import React, { Component } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import {
  Typography,
} from 'antd';

import './Map.css';

const { Title } = Typography;

const mapDimensions = {
  width: '100%',
  height: `${window.innerHeight - 200}px`,
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...mapDimensions,
        latitude: 49.8080954,
        longitude: -97.1375209,
        zoom: 14,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    let { viewport } = { ...this.state };
    viewport = { ...viewport, ...mapDimensions };

    this.setState({ viewport });
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
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <GeolocateControl
            className="geolocate-control"
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
        </ReactMapGL>
      </>
    );
  }
}
export default Map;
