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
  Collapse,
} from 'antd';
import { trim, isEmpty, startCase } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWashrooms } from '../actions/washroomActions';
import { getBuildings } from '../actions/buildingActions';

import { WashroomListItem, BuildingListItem, Filters } from '../components';

import {
  MAX_RADIUS, MAX_RESULTS_BUILDINGS, MAX_RESULTS_WASHROOMS, LATITUDE, LONGITUDE,
} from '../constants/Defaults';
import { APP_NAME } from '../constants/Globals';
import { getTerminology, isMobile } from '../utils/DisplayUtils';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

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
        maxResultsBuildings: MAX_RESULTS_BUILDINGS,
        maxResultsWashrooms: MAX_RESULTS_WASHROOMS,
        radius: MAX_RADIUS,
        latitude: LATITUDE,
        longitude: LONGITUDE,
        displayEmptyBuildings: false,
      },
    };
  }

  componentDidMount() {
    document.title = `${APP_NAME} - Near Me`;
    this.getWashrooms();
    this.getBuildings();
  }

  getBuildings = () => {
    const { getBuildings } = this.props; // eslint-disable-line no-shadow
    const { filter } = this.state;
    const {
      amenities, maxResultsBuildings: maxResults, radius, latitude, longitude,
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
      amenities, maxResultsWashrooms: maxResults, radius, latitude, longitude,
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

  handleFilterChange = (key, value, requiresFetch = true) => {
    const { filter } = this.state;
    this.setState({
      filterChanged: requiresFetch,
      filter: {
        ...filter,
        [key]: value,
      },
    });
  };

  renderWashrooms = () => {
    const { washrooms, washroomsFetching } = this.props;

    if (isEmpty(washrooms) && !washroomsFetching) {
      const description = `No ${getTerminology()}s near`;
      return <Empty description={description} />;
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
    const { buildingsFetching } = this.props;
    let { buildings } = this.props;
    const { filter } = this.state;

    if (isEmpty(buildings) && !buildingsFetching) {
      return <Empty description="No buildings near" />;
    }

    if (buildingsFetching) {
      return <Skeleton active title={false} />;
    }

    if (!filter.displayEmptyBuildings) {
      buildings = buildings.filter((building) => (
        building.washroom_count > 0
      ));
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
                <Collapse
                  defaultActiveKey={isMobile(window.innerWidth) ? '' : 'filters'}
                  disabled={buildingsFetching}
                >
                  <Panel
                    key="filters"
                    header="Filters"
                    extra={
                      <Icon type="filter" />
                    }
                  >
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
                  </Panel>
                </Collapse>
              </Col>
              <Col lg={{ pull: 8, span: 16 }}>
                { this.renderBuildings() }
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={startCase(`${getTerminology()}s`)}
            key="washrooms"
          >
            <Row gutter={[16, 16]} align="middle">
              <Col lg={{ push: 16, span: 8 }}>
                <Collapse
                  defaultActiveKey={isMobile(window.innerWidth) ? '' : 'filters'}
                  disabled={washroomsFetching}
                >
                  <Panel
                    key="filters"
                    header="Filters"
                    extra={
                      <Icon type="filter" />
                    }
                  >
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
                  </Panel>
                </Collapse>
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
