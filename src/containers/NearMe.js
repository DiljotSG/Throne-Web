import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
  Button,
  Slider,
  InputNumber,
  Modal,
  Checkbox,
  Tabs,
  notification,
  Empty,
  Skeleton,
  Row,
  Select,
  Col,
  Card,
} from 'antd';
import { trim, isEmpty, startCase } from 'lodash';
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
    const washroomAmenityFilterOptions = ALL_AMENITIES.map((amenity) => (
      { label: `${amenityAsString(amenity)} ${amenityAsEmoji(amenity)}`, value: amenity }
    ));

    this.state = {
      modalVisible: false,
      washroomAmenityFilterOptions,
      indeterminate: false,
      checkAll: false,
      filter: {
        amenities: [],
        maxResults: 1000,
        radius: 50000,
        latitude: 49.8080954,
        longitude: -97.1375209,
      },
    };
  }

  componentDidMount() {
    this.getWashrooms();
    this.getBuildings();
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  filterCancel = () => {
    this.setState({ modalVisible: false });
  }

  getBuildings = () => {
    const { getBuildings } = this.props; // eslint-disable-line no-shadow
    const { filter } = this.state;
    const {
      amenities, maxResults, radius, latitude, longitude,
    } = filter;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        getBuildings(
          location.coords.latitude,
          location.coords.longitude,
          maxResults,
          amenities,
          radius,
        );
      }, () => {
        // Get buildings with default location at UofM
        getBuildings(
          latitude,
          longitude,
          maxResults,
          amenities,
          radius,
        );
      });
    } else {
      // `navigator.geolocation` is null in the test cases
      // We call getBuildings for the test cases without a location
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
      filter: {
        ...filter,
        amenities: selected,
      },
    });
  };

  onRadiusChange = (radius) => {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        radius,
      },
    });
  };

  renderWashrooms = () => {
    const { washrooms } = this.props;

    if (isEmpty(washrooms)) {
      return <Empty description="No washrooms near" />;
    }

    return (
      <>
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
      </>
    );
  };

  render() {
    const {
      history,
      washrooms,
      buildings,
      washroomsFetching,
      buildingsFetching,
    } = this.props;

    const { filter } = this.state;

    return (
      <>
        <Row justify="space-around" align="middle">
          <Col sm={12}>
            <Icon type="environment" className="icon-title" />
            <Title>Near Me</Title>
          </Col>
          <Col sm={12}>
            <Title level={3}>Filter Washrooms</Title>
            <Text strong>Amenities</Text>
            <Select
              className="filter-amenity-select"
              mode="multiple"
              onChange={this.handleSelectChange}
            >
              {ALL_AMENITIES.map((amenity) => (
                <Option key={amenity}>{`${amenityAsString(amenity)} ${amenityAsEmoji(amenity)}`}</Option>
              ))}
            </Select>

            <Text strong>Radius</Text>
            <Row align="middle">
              <Col span={12}>
                <Slider
                  min={1}
                  max={5000}
                  onChange={this.onRadiusChange}
                  value={typeof filter.radius === 'number' ? filter.radius : 0}
                  tipFormatter={(value) => displayDistance(value)}
                />
              </Col>
              <Col span={4}>
                <Text strong>
                  {displayDistance(filter.radius)}
                </Text>
              </Col>
            </Row>
            <Button key="submit" type="primary" loading={washroomsFetching} onClick={this.getWashrooms}>
              Apply Filters
            </Button>
          </Col>
        </Row>

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
            {
            washroomsFetching
              ? <Skeleton active title={false} />
              : this.renderWashrooms(washrooms)
            }
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
