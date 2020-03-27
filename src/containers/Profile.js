import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Spin, Icon, Row, Col, List, Empty, Skeleton, Button,
} from 'antd';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { getReviewsForUser } from '../actions/reviewActions';
import { getFavoritesForUser } from '../actions/washroomActions';
import { Reviews, WashroomListItem } from '../components';

const { Title } = Typography;

const renderWashrooms = ((userWashrooms) => {
  if (isEmpty(userWashrooms)) {
    return <Empty description="No favorite washrooms yet" />;
  }
  return (
    <List
      className="near-me-list"
      bordered
      dataSource={userWashrooms}
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
});

class Profile extends Component {
  componentDidMount() {
    const { user } = this.props;

    if (isEmpty(user)) {
      this.getCurrentUser();
    }

    this.getReviewsForUser();
    this.getFavoritesForUser();
  }

  getCurrentUser = () => {
    const { getCurrentUser } = this.props; // eslint-disable-line no-shadow
    getCurrentUser();
  }

  getReviewsForUser = () => {
    const { getReviewsForUser } = this.props; // eslint-disable-line no-shadow
    getReviewsForUser();
  }

  getFavoritesForUser = () => {
    const { getFavoritesForUser } = this.props; // eslint-disable-line no-shadow
    getFavoritesForUser();
  }

  render() {
    const {
      user,
      userFetching,
      reviews,
      reviewsFetching,
      userWashroomsFetching,
      userWashrooms,
    } = this.props;

    if (isEmpty(user) && userFetching) {
      return <Spin />;
    }
    return (
      <>
        <Row
          align="middle"
          gutter={[16, 24]}
        >
          <Col span={20}>
            <Icon
              type="user"
              className="icon-title"
            />
            <Title className="username">
              {user.username}
            </Title>
          </Col>
          <Col span={4} align="right">
            <Button
              size="large"
              type="default"
              shape="circle"
              icon="setting"
              href="/settings"
            />
          </Col>
        </Row>
        <Row
          align="middle"
          gutter={[16, 24]}
        >
          <Col lg={{ span: 10, push: 14 }}>
            <Title level={3}>
              Your favorites
            </Title>
            {
              userWashroomsFetching
                ? <Skeleton active title={false} />
                : renderWashrooms(userWashrooms)
            }
          </Col>
          <Col lg={{ span: 14, pull: 10 }}>
            <Reviews
              reviews={reviews}
              fetching={reviewsFetching}
              title="Your reviews"
              clickable
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    user,
    isFetching: userFetching,
  } = state.userReducer;

  const {
    reviews,
    isFetching: reviewsFetching,
  } = state.reviewReducer;

  const {
    userWashrooms,
    isFetching: userWashroomsFetching,
    status: userWashroomsStatus,
  } = state.washroomReducer;

  return {
    user,
    userFetching,
    reviews,
    reviewsFetching,
    userWashrooms,
    userWashroomsFetching,
    userWashroomsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  getReviewsForUser: () => dispatch(getReviewsForUser()),
  getFavoritesForUser: () => dispatch(getFavoritesForUser()),
});

Profile.propTypes = {
  userWashrooms: PropTypes.instanceOf(Array),
  getCurrentUser: PropTypes.func.isRequired,
  getReviewsForUser: PropTypes.func.isRequired,
  getFavoritesForUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    preferences: PropTypes.shape({
      gender: PropTypes.string,
      main_floor_access: PropTypes.number,
      wheelchair_accessible: PropTypes.number,
    }),
    profile_picture: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  userFetching: PropTypes.bool,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      created_at: PropTypes.string,
      washroom_id: PropTypes.number,
      id: PropTypes.number,
      ratings: PropTypes.shape({
        cleanliness: PropTypes.number,
        privacy: PropTypes.number,
        smell: PropTypes.number,
        toilet_paper_quality: PropTypes.number,
      }),
      user: PropTypes.shape({
        created_at: PropTypes.string,
        id: PropTypes.number,
        profile_picture: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  ).isRequired,
  reviewsFetching: PropTypes.bool,
  userWashroomsFetching: PropTypes.bool,
};

Profile.defaultProps = {
  userFetching: false,
  reviewsFetching: true,
  userWashroomsFetching: true,
  userWashrooms: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
