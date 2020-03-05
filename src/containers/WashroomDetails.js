import React, { Component } from 'react';
import {
  List, Rate, Spin, Row, Col, Divider,
} from 'antd';
import { startCase, round } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWashroom } from '../actions/washroomActions';
import './WashroomDetails.css';

class WashroomDetails extends Component {
  componentDidMount() {
    const { match, washroom } = this.props;
    const { id } = match.params;
    if (washroom.id !== id) {
      this.getWashroom(id);
    }
  }

  getWashroom = (id) => {
    const { getWashroom } = this.props; // eslint-disable-line no-shadow
    getWashroom(id);
  }

  render() {
    let washroomItem;
    const { location, isFetching, washroom } = this.props;
    try {
      washroomItem = location.state.washroom;
    } catch (TypeError) {
      washroomItem = washroom;
      if (isFetching) {
        return (<Spin />);
      }
    }
    const ratings = washroomItem.average_ratings;

    return (
      <>
        <Row>
          <Col span={18}>
            <h2>{washroomItem.title}</h2>
          </Col>
          <Col span={6} className="rating-value">
            <h2>{washroomItem.is_favorite ? '👑' : ''}</h2>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <h3>
              {`Floor ${washroomItem.floor} | ${startCase(washroomItem.gender)}`}
            </h3>
          </Col>
          <Col flex="auto">
            <Divider />
          </Col>
        </Row>
        <Row>
          <Col span={12}><b>Overall Rating</b></Col>
          <Col span={12} className="rating-value">
            <Rate
              disabled
              value={washroomItem.overall_rating}
              allowHalf
              className="overall-rate"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>Cleanliness</Col>
          <Col span={12} className="rating-value">
            <Rate
              disabled
              value={ratings ? round(ratings.cleanliness, 1) : 0}
              allowHalf
              className="rate"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>Privacy</Col>
          <Col span={12} className="rating-value">
            <Rate
              disabled
              value={ratings ? round(ratings.privacy, 1) : 0}
              allowHalf
              className="rate"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>Paper Quality</Col>
          <Col span={12} className="rating-value">
            <Rate
              disabled
              value={ratings ? round(ratings.toilet_paper_quality, 1) : 0}
              allowHalf
              className="rate"
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>Smell</Col>
          <Col span={12} className="rating-value">
            <Rate
              disabled
              value={ratings ? round(ratings.smell, 1) : 0}
              allowHalf
              className="rate"
            />
          </Col>
        </Row>
        <List
          header={<b>Amenities</b>}
          size="small"
          dataSource={washroomItem.amenities}
          renderItem={(item) => (
            <List.Item
              key={item}
            >
              {startCase(item)}
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
    title: PropTypes.string,
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

  }),
  isFetching: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: PropTypes.object,
    }),
  }),
};

WashroomDetails.defaultProps = {
  washroom: null,
  isFetching: false,
  location: PropTypes.shape({
    state: PropTypes.shape({
      washroom: {},
    }),
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(WashroomDetails);
