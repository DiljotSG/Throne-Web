import React, { Component } from 'react';
import {
  List, Rate, Spin, Row, Col, Divider, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { kebabCase, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getWashroom } from '../actions/washroomActions';
import { roundToHalf } from '../utils/NumUtils';
import {
  genderAsEmoji,
  genderAsString,
  amenityAsEmoji,
  amenityAsString
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

class WashroomDetails extends Component {
  componentDidMount() {
    const { match, washroom } = this.props;
    const { id } = match.params;
    if (isEmpty(washroom)) {
      this.getWashroom(id);
    }
  }

  getWashroom = (id) => {
    const { getWashroom } = this.props; // eslint-disable-line no-shadow
    getWashroom(id);
  }

  render() {
    let washroomItem;
    const { location, washroom } = this.props;

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
            <List.Item
              key={item}
            >
              {amenityAsString(item)} {amenityAsEmoji(item)}
            </List.Item>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { washroom, isFetching, status } = state.washroomReducer;
  return {
    status,
    isFetching,
    washroom,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashroom: (id) => dispatch(getWashroom(id)),
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: {},
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(WashroomDetails);
