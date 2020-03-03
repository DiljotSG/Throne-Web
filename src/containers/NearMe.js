import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
} from 'antd';
import { connect } from 'react-redux';
import { getWashrooms } from '../actions/washroomActions';
import WashroomListItem from '../components/WashroomListItem';


const { Title } = Typography;

class NearMe extends Component {
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
    const { washrooms, isFetching } = this.props;

    return (
      <>
        <Icon type="environment" className="icon-title" />
        <Title>Near Me</Title>
        <List
          className="near-me-list"
          loading={isFetching}
          bordered
          dataSource={washrooms}
          renderItem={(item) => (
            <List.Item
              className="washroom-list-item"
              key={item.id}
            >
              <WashroomListItem item={item} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { washrooms, isFetching, status } = state.washroomsReducer;

  return {
    status,
    isFetching,
    washrooms,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashrooms: () => dispatch(getWashrooms()),
});

NearMe.propTypes = {
  getWashrooms: PropTypes.func.isRequired,
  washrooms: PropTypes.instanceOf(Array),
  isFetching: PropTypes.bool,
};

NearMe.defaultProps = {
  washrooms: [],
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(NearMe);
