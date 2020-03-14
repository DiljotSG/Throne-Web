import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
  Tabs,
} from 'antd';
import { trim } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWashrooms } from '../actions/washroomActions';
import { getBuildings } from '../actions/buildingActions';

import { WashroomListItem } from '../components';

const { Title } = Typography;
const { TabPane } = Tabs;

class NearMe extends Component {
  componentDidMount() {
    this.getWashrooms(49.81050491333008, -97.13350677490234, 100, null, 1000);
    this.getBuildings();
  }

  getBuildings = () => {
    const { getBuildings } = this.props; // eslint-disable-line no-shadow

    getBuildings();
  }

  getWashrooms = (latitude, longitude, maxResults, amenities, radius) => {
    const { getWashrooms } = this.props;

    getWashrooms(latitude, longitude, maxResults, amenities, radius);
  }

  render() {
    const {
      history,
      washrooms,
      buildings,
      washroomsFetching,
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
            <List
              className="near-me-list"
              loading={buildingsFetching}
              bordered
              dataSource={buildings}
              renderItem={(item) => (
                <List.Item
                  className="near-me-list-item"
                  key={item.id}
                >
                  {item.title}
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab="Washrooms"
            key="washrooms"
          >
            <List
              className="near-me-list"
              loading={washroomsFetching}
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
    dispatch(getWashrooms(latitude, longitude, maxResults, amenities, radius))
  },
  getBuildings: () => dispatch(getBuildings()),
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
