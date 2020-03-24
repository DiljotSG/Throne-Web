import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Spin, Icon, Row, Col, Card,
} from 'antd';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import { getReviewsForUser } from '../actions/reviewActions';
import { Reviews } from '../components';

const { Title } = Typography;

class Profile extends Component {
  componentDidMount() {
    const { user } = this.props;

    if (isEmpty(user)) {
      this.getCurrentUser();
    }

    this.getReviewsForUser();
  }

  getCurrentUser = () => {
    const { getCurrentUser } = this.props; // eslint-disable-line no-shadow

    getCurrentUser();
  }

  getReviewsForUser = () => {
    const { getReviewsForUser } = this.props; // eslint-disable-line no-shadow

    getReviewsForUser();
  }

  render() {
    const {
      user, userFetching, reviews, reviewsFetching,
    } = this.props;

    if (isEmpty(user) && userFetching) {
      return <Spin />;
    }
    return (
      <>
        <Icon type="user" className="icon-title" />
        <Title className="username">
          {user.username}
        </Title>
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <Card>
              <Reviews
                reviews={reviews}
                fetching={reviewsFetching}
                title="Your reviews"
                clickable
              />
            </Card>
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

  return {
    user,
    userFetching,
    reviews,
    reviewsFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  getReviewsForUser: () => dispatch(getReviewsForUser()),
});

Profile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getReviewsForUser: PropTypes.func.isRequired,
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
};

Profile.defaultProps = {
  userFetching: false,
  reviewsFetching: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
