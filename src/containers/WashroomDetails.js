import React, { Component } from 'react';
import {
  List, Spin, Row, Col, Divider, Typography, Comment, Avatar, Skeleton,
  Card, Empty, Button, Icon, Form, Input,
} from 'antd';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getWashroom, favoriteWashroom, unfavoriteWashroom } from '../actions/washroomActions';
import { getReviewsForWashroom, createReview } from '../actions/reviewActions';
import { WashroomRatings } from '../components';

import {
  genderAsEmoji,
  genderAsString,
  amenityAsEmoji,
  amenityAsString,
  ratingAsEmoji,
} from '../utils/DisplayUtils';
import './WashroomDetails.css';

const { TextArea } = Input;

const { Title, Text } = Typography;

const renderAmenities = (amenities) => (
  <Card>
    <List
      header={<b>Amenities</b>}
      size="small"
      dataSource={amenities}
      renderItem={(item) => (
        <List.Item key={item}>
          {amenityAsString(String(item))}
          {' '}
          {amenityAsEmoji(String(item))}
        </List.Item>
      )}
    />
  </Card>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} value={value} onChange={onChange} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

const renderReviews = (reviews) => {
  if (isEmpty(reviews)) {
    return <Empty description="No reviews yet." />;
  }

  return (
    reviews.map((item) => (
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
    )));
};

class WashroomDetails extends Component {
  constructor() {
    super();
    this.state = {
      reviewValue: '',
    };
  }

  componentDidMount() {
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

  createReview = (id, comment) => {
    const { createReview } = this.props; // eslint-disable-line no-shadow
    const review = {
      comment,
      ratings: {
        smell: 5,
        toilet_paper_quality: 5,
        cleanliness: 5,
        privacy: 5,
      },
    };
    createReview(id, review);
  }

  handleChange = e => {
    this.setState({
      reviewValue: e.target.value,
    });
  };

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

  render() {
    const {
      washroom,
      washroomFetching,
      settingFavorite,
      reviews,
      reviewsFetching,
      creatingReview,
    } = this.props;

    // const { reviewValue } = this.state;

    if (washroomFetching || isEmpty(washroom)) {
      return (<Spin />);
    }

    // console.log(reviews);

    return (
      <>
        <Row>
          <Col span={12}>
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
            span={12}
            className="favorite-button"
          >
            <Button
              type={washroom.is_favorite ? 'primary' : ''}
              shape="circle"
              loading={settingFavorite}
              className={washroom.is_favorite ? 'favorite-button-selected' : 'favorite-button-unselected'}
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
          <Col sm={24} md={14}>
            {renderAmenities(washroom.amenities)}
          </Col>
          <Col sm={24} md={10}>
            <Card>
              <WashroomRatings
                washroom={washroom}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Comment
              avatar={<Avatar />}
              content={(
                <Editor
                  onSubmit={() => { this.createReview(washroom.id, this.state.reviewValue); }}
                  submitting={creatingReview}
                  onChange={this.handleChange}
                  value={this.state.reviewValue}
                />
              )}
            />
            <Card className="washroom-reviews">
              <Title level={3}>
                Reviews
              </Title>
              { reviewsFetching ? <Skeleton active title={false} /> : renderReviews(reviews) }
            </Card>
          </Col>
        </Row>
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
  creatingReview: PropTypes.bool,
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: {},
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(WashroomDetails);
