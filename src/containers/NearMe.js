import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
  Button,
  Slider,
  Tabs,
  notification,
  Empty,
  Skeleton,
  Row,
  Select,
  Col,
  Card,
} from 'antd';
import { trim, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWashrooms } from '../actions/washroomActions';
import { getBuildings } from '../actions/buildingActions';

import { amenityAsEmoji, amenityAsString, displayDistance } from '../utils/DisplayUtils';

import { WashroomListItem, BuildingListItem } from '../components';

import { ALL_AMENITIES } from '../constants/WashroomAmenityTypes';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const MAX_RADIUS = 30;

const renderBuildings = ((buildings) => {
  if (isEmpty(buildings)) {
    return <Empty description="No buildings near" />;
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
});

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
        maxResults: 1000,
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
        const { currLatitude, currLongitude } = location;

        this.setState({ locationEnabled: true });
        getBuildings(currLatitude, currLongitude, maxResults, amenities, radius);
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
        getWashrooms(
          location.coords.latitude,
          location.coords.longitude,
          maxResults,
          amenities,
          radius,
        );
      }, () => {
        // Get buildings with default location at UofM
        getWashrooms(
          latitude,
          longitude,
          maxResults,
          amenities,
          radius,
        );
        renderNoLocationWarning();
      });
    } else {
      // `navigator.geolocation` is null in the test cases
      // We call getWashrooms for the test cases without a location
      getWashrooms(null, null, maxResults, amenities, radius);
    }
  }

  handleSelectChange = (selected) => {
    const { filter } = this.state;
    this.setState({
      filterChanged: true,
      filter: {
        ...filter,
        amenities: selected,
      },
    });
  };

  handleRadiusChange = (radius) => {
    const { filter } = this.state;
    this.setState({
      filterChanged: true,
      filter: {
        ...filter,
        radius,
      },
    });
  };

  renderFilters = () => {
    const { washroomsFetching } = this.props;
    const { filter, filterChanged, locationEnabled } = this.state;

    return (
      <>
        <Title level={3}>Filter Washrooms</Title>
        <Text strong>Amenities</Text>
        <Select
          className="filter-amenity-select"
          mode="multiple"
          allowClear
          onChange={this.handleSelectChange}
        >
          {ALL_AMENITIES.map((amenity) => (
            <Option key={amenity}>{`${amenityAsString(amenity)} ${amenityAsEmoji(amenity)}`}</Option>
          ))}
        </Select>

        <Text strong>Radius</Text>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={18}>
            <Slider
              disabled={!locationEnabled}
              min={0}
              max={MAX_RADIUS}
              step={0.5}
              onChange={this.handleRadiusChange}
              value={typeof filter.radius === 'number' ? filter.radius : 0}
              tipFormatter={(value) => (
                locationEnabled ? displayDistance(value) : 'You must enable location to use this feature.'
              )}
            />
          </Col>
          <Col
            span={6}
            className="filter-radius-text"
          >
            <Text strong>
              {displayDistance(filter.radius)}
            </Text>
          </Col>
        </Row>
        <Button
          key="submit"
          disabled={!filterChanged}
          type="primary"
          loading={filterChanged && washroomsFetching}
          onClick={() => {
            this.getWashrooms();
            this.setState({ filterChanged: false });
          }}
        >
          {filterChanged ? 'Apply Filters' : 'No changes to apply'}
        </Button>
      </>
    );
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

  render() {
    const {
      history,
      washrooms,
      washroomsFetching,
      buildings,
      buildingsFetching,
    } = this.props;

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
            {
            buildingsFetching
              ? <Skeleton active title={false} />
              : renderBuildings(buildings)
            }
          </TabPane>
          <TabPane
            tab="Washrooms"
            key="washrooms"
          >
            <Row gutter={[16, 16]} align="middle">
              <Col lg={{ push: 16, span: 8 }}>
                <Card disabled={washroomsFetching}>
                  {this.renderFilters()}
                </Card>
              </Col>
              <Col lg={{ pull: 8, span: 16 }}>
                { this.renderWashrooms(washrooms) }
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
