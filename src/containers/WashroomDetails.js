import React, { Component } from 'react';
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl';
import {
  Spin, Row, Col, Divider, Typography, Skeleton, Card, Button, Icon,
} from 'antd';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getWashroom, favoriteWashroom, unfavoriteWashroom } from '../actions/washroomActions';
import { getReviewsForWashroom, createReview } from '../actions/reviewActions';
import { ERROR_REVIEW_EMPTY_RATINGS } from '../constants/Messages';
import {
  WashroomRatings, Reviews, ReviewForm, AmenityList,
} from '../components';

import { genderAsEmoji, genderAsString } from '../utils/DisplayUtils';
import './WashroomDetails.css';

const { Title, Text } = Typography;

const mapDimensions = {
  width: '100%',
  height: '300px',
};

class WashroomDetails extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        ...mapDimensions,
        latitude: 49.8080954,
        longitude: -97.1375209,
        zoom: 14,
      },
      review: {
        comment: '',
        ratings: {
          cleanliness: 0,
          privacy: 0,
          toilet_paper_quality: 0,
          smell: 0,
        },
      },
      attemptedSubmit: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const { match } = this.props;
    const { id } = match.params;
    this.getWashroom(id);
    this.getReviewsForWashroom(id);
  }

  getWashroom = (id) => {
    const { getWashroom } = this.props; // eslint-disable-line no-shadow
    getWashroom(id);
  }

  getReviewsForWashroom = (id) => {
    const { getReviewsForWashroom } = this.props; // eslint-disable-line no-shadow
    getReviewsForWashroom(id);
  }

  createReview = (id) => {
    const { createReview } = this.props; // eslint-disable-line no-shadow
    const { review } = this.state;

    createReview(id, review);
  }

  handleCommentChange = (event) => {
    const { review } = this.state;

    this.setState(
      {
        review: {
          ...review,
          comment: event.target.value,
        },
      },
      this.validate,
    );
  };

  handleRatingChange = (type, value) => {
    const { review } = this.state;

    this.setState(
      {
        review: {
          ...review,
          ratings: {
            ...review.ratings,
            [type]: value,
          },
        },
      },
      this.validate,
    );
  }

  validate = () => {
    const { review } = this.state;
    const errors = [];

    if (Object.values(review.ratings).includes(0)) {
      errors.push(ERROR_REVIEW_EMPTY_RATINGS);
    }

    this.setState({
      errors,
    });
  }

  handleSubmit = async () => {
    await this.validate();

    const { errors } = this.state;
    const { washroom } = this.props;

    this.setState({ attemptedSubmit: true });

    if (isEmpty(errors)) {
      this.createReview(washroom.id);
      this.setState({ attemptedSubmit: false });
    }
  }

  toggleFavorite = () => {
    const {
      favoriteWashroom, // eslint-disable-line no-shadow
      unfavoriteWashroom, // eslint-disable-line no-shadow
      washroom,
    } = this.props;

    if (!washroom.is_favorite) {
      favoriteWashroom(washroom.id);
    } else {
      unfavoriteWashroom(washroom.id);
    }
  }

  handleResize = () => {
    let { viewport } = { ...this.state };
    viewport = { ...viewport, ...mapDimensions };

    this.setState({ viewport });
  }

  render() {
    const {
      washroom,
      washroomFetching,
      settingFavorite,
      reviews,
      reviewsFetching,
      creatingReview,
      createStatus,
    } = this.props;

    const {
      review, errors, attemptedSubmit, viewport,
    } = this.state;

    if (washroomFetching || isEmpty(washroom)) {
      return (<Spin />);
    }

    return (
      <>
        <Row>
          <Col span={20}>
            <Title className="details-title" level={2}>
              {washroom.building_title}
            </Title>
            <Title className="details-gender" level={4}>
              {`${genderAsEmoji(washroom.gender)} ${genderAsString(washroom.gender)}`}
            </Title>
            <Text className="details-floor-comment" strong>
              {`Floor ${washroom.floor}`}
              {washroom.comment ? ` | ${washroom.comment}` : ''}
            </Text>
          </Col>
          <Col
            span={4}
            className="washroom-favorite-button"
          >
            <Button
              type={washroom.is_favorite ? 'primary' : ''}
              shape="circle"
              size="large"
              loading={settingFavorite}
              className={`washroom-favorite-button-${washroom.is_favorite ? 'selected' : 'unselected'}`}
              onClick={() => (this.toggleFavorite())}
            >
              {!settingFavorite
                ? (
                  <Icon
                    type="heart"
                    theme={washroom.is_favorite ? 'filled' : 'outlined'}
                  />
                ) : ''}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <Divider />
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle">
          <Col sm={24} md={16}>
            <Card>
              <WashroomRatings
                overallRating={washroom.overall_rating}
                averageRatings={washroom.average_ratings}
              />
            </Card>
            <Card
              className="map-container"
            >
              <ReactMapGL
                {...viewport} // eslint-disable-line react/jsx-props-no-spreading
                onViewportChange={(newView) => this.setState({ viewport: newView })}
                onLoad={() => this.setState({
                  viewport: {
                    ...mapDimensions,
                    latitude: washroom.location.latitude,
                    longitude: washroom.location.longitude,
                    zoom: 18,
                  },
                })}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
              >
                <Marker
                  latitude={washroom.location.latitude}
                  longitude={washroom.location.longitude}
                  offsetLeft={-16}
                  offsetTop={-30}
                >
                  <span
                    className="washroom-marker"
                    aria-label="Washroom location"
                    role="img"
                  >
                    📍
                  </span>
                </Marker>
                <Popup
                  latitude={washroom.location.latitude}
                  longitude={washroom.location.longitude}
                  closeButton={false}
                  offsetTop={-32}
                >
                  {`Floor ${washroom.floor}`}
                  {washroom.comment && ` | ${washroom.comment}`}
                </Popup>
                <GeolocateControl
                  className="geolocate-control"
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation
                />
              </ReactMapGL>
            </Card>
          </Col>
          <Col sm={24} md={8}>
            <AmenityList amenities={washroom.amenities} />
          </Col>
          <Col span={24}>
            <Card>
              <ReviewForm
                review={review}
                onSubmit={this.handleSubmit}
                submitting={creatingReview}
                commentChange={this.handleCommentChange}
                errors={errors}
                ratingChange={this.handleRatingChange}
                created={createStatus === 201}
                attemptedSubmit={attemptedSubmit}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card className="washroom-reviews">
              <Title level={3}>
                Reviews
              </Title>
              {reviewsFetching
                ? <Skeleton active title={false} />
                : <Reviews reviews={reviews} />}
            </Card>
          </Col>
        </Row>
        <Button
          href="https://umanitoba.ca/campus/physical_plant/adminss/request/request.php"
          rel="noopener noreferrer"
          target="_blank"
          icon="warning"
        >
          Report Maintenance Issue
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    washroom,
    isFetching: washroomFetching,
    settingFavorite,
    status: washroomStatus,
  } = state.washroomReducer;
  const {
    reviews,
    creatingReview,
    isFetching: reviewsFetching,
    status: reviewsStatus,
    createStatus,
  } = state.reviewReducer;
  return {
    washroom,
    washroomFetching,
    settingFavorite,
    washroomStatus,
    reviews,
    creatingReview,
    reviewsFetching,
    reviewsStatus,
    createStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashroom: (id) => dispatch(getWashroom(id)),
  getReviewsForWashroom: (id) => dispatch(getReviewsForWashroom(id)),
  favoriteWashroom: (id) => dispatch(favoriteWashroom(id)),
  unfavoriteWashroom: (id) => dispatch(unfavoriteWashroom(id)),
  createReview: (id, review) => dispatch(createReview(id, review)),
});

WashroomDetails.propTypes = {
  favoriteWashroom: PropTypes.func.isRequired,
  unfavoriteWashroom: PropTypes.func.isRequired,
  getWashroom: PropTypes.func.isRequired,
  washroom: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    gender: PropTypes.string,
    floor: PropTypes.number,
    overall_rating: PropTypes.number,
    average_ratings: PropTypes.shape({
      smell: PropTypes.number,
      privacy: PropTypes.number,
      cleanliness: PropTypes.number,
      toilet_paper_quality: PropTypes.number,
    }),
    amenities: PropTypes.instanceOf(Array),
    is_favorite: PropTypes.bool,
    building_title: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
  washroomFetching: PropTypes.bool,
  settingFavorite: PropTypes.bool,
  getReviewsForWashroom: PropTypes.func.isRequired,
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
  createReview: PropTypes.func.isRequired,
  creatingReview: PropTypes.bool,
  createStatus: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: PropTypes.object,
    }),
  }),
};

WashroomDetails.defaultProps = {
  washroomFetching: false,
  settingFavorite: false,
  reviewsFetching: false,
  creatingReview: false,
  createStatus: 0,
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: {},
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(WashroomDetails);
