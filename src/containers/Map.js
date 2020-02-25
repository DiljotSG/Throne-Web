import React, { Component, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import {
  Typography,
  Icon,
  Button
} from 'antd';
import data from './buildings.json'
import { connect } from 'react-redux';
import { getWashrooms } from '../actions/washroomActions';
const { Title } = Typography;


class Map extends Component {

  state = {
    viewport: {
      width: '100%',
      height: '400px',
      latitude: 49.8080954,
      longitude: -97.1375209,
      zoom: 14
    },
    selected: null
  };



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
    return (
      <>
        <Title>Map</Title>
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {buildings.map((building) => (
            <Marker key={building.id}
              latitude={building.location.latitude}
              longitude={building.location.longitude}
              onClick={(event) => this.setState({ selected: building })}
            >
              <Button
                type="link"
                shape="circle"
                size="small"

                onClick={(event) => this.setState({ selected: building })}
              >
                🧻
              </Button>
            </Marker>

          ))}
          {this.state.selected ? (
            <Popup
              key={this.state.selected.id}
              latitude={this.state.selected.location.latitude}
              longitude={this.state.selected.location.longitude}
              onClose={(event) => this.setState({ selected: null })}
            >
              <div>
                <h4>{this.state.selected.title}</h4>
                <p>OverallRating: {this.state.selected.overall_rating}</p>
              </div>

            </Popup>
          ) : null}
        </ReactMapGL>
      </>
    )
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
