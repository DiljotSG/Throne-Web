import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import { getWashrooms } from '../actions/washroomActions';
import data from './buildings.json';

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
      selected: null,
    };
  }

  componentDidMount() {
    const { washrooms } = this.props;

    if (washrooms.length === 0) {
      this.getWashrooms();
    }
  }

  getWashrooms = () => {
    const { getWashrooms } = this.props;

    getWashrooms();
  }

  render() {
    const { buildings } = data;
    const { viewport, selected } = this.state;
    return (
      <>
        <Title>Map</Title>
        <ReactMapGL
          {...viewport}
          onViewportChange={(newView) => this.setState({ viewport: newView })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {buildings.map((building) => (
            <Marker
              key={building.id}
              latitude={building.location.latitude}
              longitude={building.location.longitude}
              onClick={() => this.setState({ selected: building })}
            >
              <Button
                type="link"
                shape="circle"
                size="small"

                onClick={() => this.setState({ selected: building })}
              >
                <span role="img">🧻</span>
              </Button>
            </Marker>

          ))}
          {selected ? (
            <Popup
              key={selected.id}
              latitude={selected.location.latitude}
              longitude={selected.location.longitude}
              onClose={() => this.setState({ selected: null })}
            >
              <div>
                <h4>
                  {selected.title}
                </h4>
                <p>
                  OverallRating:
                  {selected.overall_rating}
                </p>
              </div>

            </Popup>
          ) : null}
        </ReactMapGL>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { washrooms, isFetching, status } = state.washroomReducer;

  return {
    status,
    isFetching,
    washrooms,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashrooms: () => dispatch(getWashrooms()),
});

Map.propTypes = {
  getWashrooms: PropTypes.func.isRequired,
  washrooms: PropTypes.instanceOf(Array),
  isFetching: PropTypes.bool,
};

Map.defaultProps = {
  washrooms: [],
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
