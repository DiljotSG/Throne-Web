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
import { buildingPinEmoji } from '../utils/DisplayUtils';
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

  renderMapMarkers = (buildings) => {
    const { viewport } = { ...this.state };
    if (viewport.zoom > 13) {
      return (
        buildings.map((building) => (
          <Marker
            key={building.id}
            latitude={building.location.latitude}
            longitude={building.location.longitude}
            offsetLeft={(viewport.zoom - 12) * -5}
          >
            <Button
              type="link"
              className="marker-button"
              onClick={() => this.setState({ selected: building })}
            >
              <span
                style={this.markerState()}
                role="img"
                aria-label={building.title}
              >
                {buildingPinEmoji(building.overall_rating)}
              </span>
            </Button>
          </Marker>
        ))
      );
    }
    return null;
  }

  renderMapPopups = (selected) => {
    if (!selected) {
      return null;
    }
    return (
      <Popup
        key={selected.id}
        latitude={selected.location.latitude}
        longitude={selected.location.longitude}
        onClose={() => this.setState({ selected: null })}
        closeOnClick={false}
      >
        <Title
          className="pop-up-title"
        >
          {selected.title}
        </Title>
        <Row className="pop-up">
          <Col span={8}>
            <Rate
              disabled
              value={roundToHalf(selected.overall_rating)}
              allowHalf
              className="pop-up-rating"
            />
          </Col>
          <Col offset={8} span={8} className="pop-up-info-icon-container">
            <NavLink
              to={{
                pathname: '',
                pathname: `buildings/${selected.id}`,
              }}
            >
              <Icon
                className="pop-up-info-icon"
                type="info-circle"
              />
            </NavLink>
          </Col>
        </Row>
      </Popup>
    );
  };


  markerState = () => {
    const { viewport } = { ...this.state };
    const markerHeight = `${(viewport.zoom - 12) * 10}px`;
    return {
      'font-size': markerHeight,
      'line-height': markerHeight,
    };
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
          {this.renderMapMarkers(buildings)}
          {this.renderMapPopups(selected)}
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
    buildings,
    isFetching: buildingsFetching,
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
