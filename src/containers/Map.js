import React, { Component } from 'react';
import ReactMapGL, { GeolocateControl, Popup, Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
  Typography,
  Button,
  Spin,
  Rate,
  Row,
  Col,
  Icon,
} from 'antd';
import { getBuildings } from '../actions/buildingActions';
import { roundToHalf } from '../utils/NumUtils';
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
        selected: {},
      },
    };
  }

  componentDidMount() {
    const { buildings } = this.props;
    window.addEventListener('resize', this.handleResize);

    if (buildings.length === 0) {
      this.getBuildings();
    }
  }

  getBuildings = () => {
    const { getBuildings } = this.props; // eslint-disable-line no-shadow

    getBuildings();
  }

  handleResize = () => {
    let { viewport } = { ...this.state };
    viewport = { ...viewport, ...mapDimensions };

    this.setState({ viewport });
  }

  displayMarkers = (buildings) => {
    const { viewport } = { ...this.state };
    if (viewport.zoom > 14) {
      return (
        buildings.map((building) => (
          <Marker
            key={building.id}
            latitude={building.location.latitude}
            longitude={building.location.longitude}
            offsetLeft={-12}
          >
            <Button
              type="link"
              shape="circle"
              size="small"
              onClick={() => this.setState({ selected: building })}
            >
              {this.displayIcon(building)}
            </Button>
          </Marker>
        ))
      );
    }
    return null;
  }


  markerState = () => {
    const { viewport } = { ...this.state };
    return {
      'font-size': `${(viewport.zoom - 13) * 8}px`,
    };
  }

  displayIcon = (building) => {
    let icon = '👑';
    if (building.overall_rating <= 0) {
      icon = '🏢';
    } else if (building.overall_rating <= 1.5) {
      icon = '💀';
    } else if (building.overall_rating <= 2.5) {
      icon = '💩';
    } else if (building.overall_rating <= 4.0) {
      icon = '🧻';
    }
    return (
      <span
        style={this.markerState()}
        role="img"
        aria-label={building.title}
      >
        {icon}
      </span>
    );
  }

  render() {
    const { viewport, selected } = this.state;
    const { buildings, buildingsFetching } = this.props;
    if (buildingsFetching || !buildings) {
      return (<Spin />);
    }
    return (
      <>
        <Title>Map</Title>
        <ReactMapGL
          {...viewport} // eslint-disable-line react/jsx-props-no-spreading
          onViewportChange={(newView) => this.setState({ viewport: newView })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {this.displayMarkers(buildings)}
          {selected ? (
            <Popup
              key={selected.id}
              latitude={selected.location.latitude}
              longitude={selected.location.longitude}
              onClose={() => this.setState({ selected: null })}
              closeOnClick={false}
            >
              <h4>
                {selected.title}
              </h4>
              <Row className="pop-up">
                <Col span={8}>
                  <Rate
                    disabled
                    value={roundToHalf(selected.overall_rating)}
                    allowHalf
                    className="pop-up-rating"
                  />
                </Col>
                <Col offset={8} span={8} className="show-more">
                  <NavLink
                    to={{
                      pathname: '',
                    }}
                  >
                    <Icon
                      className="info-icon"
                      type="info-circle"
                    />
                  </NavLink>
                </Col>
              </Row>
            </Popup>
          ) : null}
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
const mapStateToProps = (state) => {
  const {
    buildings, isFetching:
    buildingsFetching,
    status: buildingsStatus,
  } = state.buildingReducer;

  return {
    buildings,
    buildingsFetching,
    buildingsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBuildings: () => dispatch(getBuildings()),
});

Map.propTypes = {
  buildings: PropTypes.instanceOf(Array),
  getBuildings: PropTypes.func.isRequired,
  buildingsFetching: PropTypes.bool,
};

Map.defaultProps = {
  buildings: [],
  buildingsFetching: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
