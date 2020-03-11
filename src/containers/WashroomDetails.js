import React, { Component } from 'react';
import {
  List, Rate, Spin, Row, Col, Divider, Typography, Comment, Avatar, Skeleton, Card,
} from 'antd';
import PropTypes from 'prop-types';
import { kebabCase, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getWashroom } from '../actions/washroomActions';
import { getReviewsForWashroom } from '../actions/reviewActions';
import { roundToHalf } from '../utils/NumUtils';
import {
  genderAsEmoji,
  genderAsString,
  amenityAsEmoji,
  amenityAsString,
  ratingAsEmoji,
} from '../utils/DisplayUtils';
import './WashroomDetails.css';

const { Title, Text } = Typography;

const renderRating = (title, value, overall = false) => (
  <Row>
    <Col span={12}>{title}</Col>
    <Col span={12} className="rate-value">
      <Rate
        disabled
        value={roundToHalf(value)}
        allowHalf
        className={`rate rate-${kebabCase(title)} rate-${overall ? 'overall' : 'average'}`}
      />
    </Col>
  </Row>
);

const renderReviews = (reviews, isFetching) => (
  <Card className="washroom-reviews">
    <Title level={3}>
      Reviews
    </Title>
    {isFetching
      ? <Skeleton active title={false} />

      : reviews.map((item) => (
        <Comment
          className="washroom-review"
          key={item.created_at}
          author={item.user.username}
          avatar={(
            <Avatar>
              {item.user.username.charAt(0).toUpperCase()}
            </Avatar>
            )}
          datetime={item.created_at}
          content={(
            <Row>
              <Col sm={14} md={16} className="washroom-review-comment">
                {item.comment}
              </Col>
              <Col sm={10} md={8} className="washroom-review-rating">
                { Object.entries(item.ratings).map(([type, value], i) => (
                  <React.Fragment key={type}>
                    {i > 0 ? <Divider type="vertical" /> : ''}
                    {ratingAsEmoji(type)}
                    {value}
                  </React.Fragment>
                ))}
              </Col>
            </Row>
          )}
        />
      ))}
  </Card>
);

class WashroomDetails extends Component {
  componentDidMount() {
    const { match, washroom, reviews } = this.props;
    const { id } = match.params;
    if (isEmpty(washroom)) {
      this.getWashroom(id);
    }

    if (isEmpty(reviews)) {
      this.getReviewsForWashroom(id);
    }
  }

  getWashroom = (id) => {
    const { getWashroom } = this.props; // eslint-disable-line no-shadow
    getWashroom(id);
  }

  getReviewsForWashroom = (id) => {
    const { getReviewsForWashroom } = this.props; // eslint-disable-line no-shadow
    getReviewsForWashroom(id);
  }

  render() {
    let washroomItem;
    const {
      location, washroom, reviews, reviewsFetching,
    } = this.props;

    try {
      washroomItem = location.state.washroom;
    } catch (TypeError) {
      washroomItem = washroom;
    }

    if (isEmpty(washroomItem)) {
      return (<Spin />);
    }

    return (
      <>
        <Title className="details-title" level={2}>
          {`${washroomItem.building_title} ${washroomItem.is_favorite ? '👑' : ''}`}
        </Title>
        <Title className="details-gender" level={4}>
          {`${genderAsEmoji(washroomItem.gender)} ${genderAsString(washroomItem.gender)}`}
        </Title>
        <Text className="details-floor-comment" strong>
          {`Floor ${washroomItem.floor} | ${washroomItem.comment}`}
        </Text>
        <Row>
          <Col flex="auto">
            <Divider />
          </Col>
        </Row>
        {renderRating('Overall', washroomItem.overall_rating, true)}
        {renderRating('Cleanliness', washroomItem.average_ratings.cleanliness)}
        {renderRating('Privacy', washroomItem.average_ratings.privacy)}
        {renderRating('Paper Quality', washroomItem.average_ratings.toilet_paper_quality)}
        {renderRating('Smell', washroomItem.average_ratings.smell)}
        <List
          header={<b>Amenities</b>}
          size="small"
          dataSource={washroomItem.amenities}
          renderItem={(item) => (
            <List.Item key={item}>
              {amenityAsString(String(item))}
              {' '}
              {amenityAsEmoji(String(item))}
            </List.Item>
          )}
        />
        { renderReviews(reviews, reviewsFetching) }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { washroom, isFetching, status } = state.washroomReducer;
  const {
    reviews,
    isFetching: reviewsFetching,
    status: reviewsStatus,
  } = state.reviewReducer;
  return {
    status,
    isFetching,
    washroom,
    reviews,
    reviewsFetching,
    reviewsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashroom: (id) => dispatch(getWashroom(id)),
  getReviewsForWashroom: (id) => dispatch(getReviewsForWashroom(id)),
});

WashroomDetails.propTypes = {
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
  }).isRequired,
  getReviewsForWashroom: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      created_at: PropTypes.string,
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
  reviewsFetching: false,
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: {},
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(WashroomDetails);
