import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
  Tabs,
  notification,
  Empty,
  Skeleton,
  Row,
  Col,
  Card,
} from 'antd';
import { trim, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWashrooms } from '../actions/washroomActions';
import { getBuildings } from '../actions/buildingActions';

import { WashroomListItem, BuildingListItem, Filters } from '../components';

import { MAX_RADIUS, MAX_RESULTS } from '../constants/Defaults';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const renderNoLocationWarning = () => {
  notification.warning({
    message: 'Location Permission Not Granted',
    description: (
      <>
        <Text>Unable to access device location. Using default location: </Text>
        <Text strong>University of Manitoba</Text>
        .
      </>
    ),
  });
};

class NearMe extends Component {
  constructor() {
    super();

    this.state = {
      filterChanged: false,
      filter: {
        amenities: [],
        maxResults: MAX_RESULTS,
        radius: MAX_RADIUS,
        latitude: 49.8080954,
        longitude: -97.1375209,
      },
    };
  }

  componentDidMount() {
    this.getWashrooms();
    this.getBuildings();
  }

  getBuildings = () => {
    const { getBuildings } = this.props; // eslint-disable-line no-shadow
    const { filter } = this.state;
    const {
      amenities, maxResults, radius, latitude, longitude,
    } = filter;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude: currentLatitude, longitude: currentLongitude } = location.coords;

        this.setState({ locationEnabled: true });
        getBuildings(currentLatitude, currentLongitude, maxResults, amenities, radius);
      }, () => {
        // Get buildings with default location at UofM
        this.setState({ locationEnabled: false });
        getBuildings(latitude, longitude, maxResults, amenities, radius);
      });
    } else {
      // `navigator.geolocation` is null in the test cases
      // We call getBuildings for the test cases without a location
      this.setState({ locationEnabled: false });
      getBuildings(null, null, maxResults, amenities, radius);
      renderNoLocationWarning();
    }
  }

  getWashrooms = () => {
    const { getWashrooms } = this.props; // eslint-disable-line no-shadow
    const { filter } = this.state;
    const {
      amenities, maxResults, radius, latitude, longitude,
    } = filter;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude: currentLatitude, longitude: currentLongitude } = location.coords;

        this.setState({ locationEnabled: true });
        getWashrooms(currentLatitude, currentLongitude, maxResults, amenities, radius);
      }, () => {
        // Get buildings with default location at UofM
        this.setState({ locationEnabled: false });
        getWashrooms(latitude, longitude, maxResults, amenities, radius);
        renderNoLocationWarning();
      });
    } else {
      // `navigator.geolocation` is null in the test cases
      // We call getWashrooms for the test cases without a location
      getWashrooms(null, null, maxResults, amenities, radius);
    }
  }

  handleFilterChange = (key, value) => {
    const { filter } = this.state;
    this.setState({
      filterChanged: true,
      filter: {
        ...filter,
        [key]: value,
      },
    });
  };

  renderWashrooms = () => {
    const { washrooms, washroomsFetching } = this.props;

    if (isEmpty(washrooms) && !washroomsFetching) {
      return <Empty description="No washrooms near" />;
    }

    if (washroomsFetching) {
      return <Skeleton active title={false} />;
    }

    return (
      <List
        className="near-me-list"
        bordered
        dataSource={washrooms}
        renderItem={(item) => (
          <List.Item
            className="near-me-list-item"
            key={item.id}
          >
            <WashroomListItem item={item} />
          </List.Item>
        )}
      />
    );
  };

  renderBuildings = () => {
    const { buildings, buildingsFetching } = this.props;

    if (isEmpty(buildings) && !buildingsFetching) {
      return <Empty description="No buildings near" />;
    }

    if (buildingsFetching) {
      return <Skeleton active title={false} />;
    }

    return (
      <List
        className="near-me-list"
        bordered
        dataSource={buildings}
        renderItem={(item) => (
          <List.Item
            className="near-me-list-item"
            key={item.id}
          >
            <BuildingListItem item={item} />
          </List.Item>
        )}
      />
    );
  };

  render() {
    const {
      history,
      washroomsFetching,
      buildingsFetching,
    } = this.props;

    const { filter, filterChanged, locationEnabled } = this.state;

    return (
      <>
        <Icon type="environment" className="icon-title" />
        <Title>Near Me</Title>

        <Tabs
          defaultActiveKey={trim(history.location.pathname, '/')}
          size="large"
          animated={false}
          onChange={(activeKey) => { history.push(`/${activeKey}`); }}
        >
          <TabPane
            tab="Buildings"
            key="buildings"
          >
            <Row gutter={[16, 16]} align="middle">
              <Col lg={{ push: 16, span: 8 }}>
                <Card disabled={buildingsFetching}>
                  <Filters
                    building
                    filter={filter}
                    filterChanged={filterChanged}
                    locationEnabled={locationEnabled}
                    onChange={this.handleFilterChange}
                    submitting={filterChanged && buildingsFetching}
                    onSubmit={() => {
                      this.getBuildings();
                      this.setState({ filterChanged: false });
                    }}
                  />
                </Card>
              </Col>
              <Col lg={{ pull: 8, span: 16 }}>
                { this.renderBuildings() }
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab="Washrooms"
            key="washrooms"
          >
            <Row gutter={[16, 16]} align="middle">
              <Col lg={{ push: 16, span: 8 }}>
                <Card disabled={washroomsFetching}>
                  <Filters
                    filter={filter}
                    filterChanged={filterChanged}
                    locationEnabled={locationEnabled}
                    onChange={this.handleFilterChange}
                    submitting={filterChanged && washroomsFetching}
                    onSubmit={() => {
                      this.getWashrooms();
                      this.setState({ filterChanged: false });
                    }}
                  />
                </Card>
              </Col>
              <Col lg={{ pull: 8, span: 16 }}>
                { this.renderWashrooms() }
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    washrooms, isFetching:
    washroomsFetching,
    status: washroomsStatus,
  } = state.washroomReducer;

  const {
    buildings, isFetching:
    buildingsFetching,
    status: buildingsStatus,
  } = state.buildingReducer;

  return {
    washrooms,
    washroomsFetching,
    washroomsStatus,
    buildings,
    buildingsFetching,
    buildingsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashrooms: (latitude, longitude, maxResults, amenities, radius) => {
    dispatch(getWashrooms(latitude, longitude, maxResults, amenities, radius));
  },
  getBuildings: (latitude, longitude, maxResults, amenities, radius) => {
    dispatch(getBuildings(latitude, longitude, maxResults, amenities, radius));
  },
});

NearMe.propTypes = {
  washrooms: PropTypes.instanceOf(Array),
  buildings: PropTypes.instanceOf(Array),
  getWashrooms: PropTypes.func.isRequired,
  getBuildings: PropTypes.func.isRequired,
  washroomsFetching: PropTypes.bool,
  buildingsFetching: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

NearMe.defaultProps = {
  washrooms: [],
  buildings: [],
  washroomsFetching: false,
  buildingsFetching: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NearMe));
