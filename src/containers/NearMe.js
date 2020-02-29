import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Typography,
  List,
  Icon,
} from 'antd';
import { connect } from 'react-redux';
import { getWashrooms } from '../actions/washroomActions';
import { StarRating } from '../components';


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
        <pre>
          {JSON.stringify(this.props)}
        </pre>
        <List
          loading={isFetching}
          bordered
          dataSource={washrooms}
          renderItem={(item) => (
            <List.Item
              key={item.id}
            >
              <NavLink
                to={{
                  pathname: `/washrooms/${item.id}`,
                }}
                className="LinkStyle"
              >
                <div>
                  {item.title}
                  <StarRating
                    rating={item.overall_rating}
                  />
                </div>
              </NavLink>
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
