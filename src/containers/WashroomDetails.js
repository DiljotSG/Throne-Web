import React, { Component } from 'react';
import {
  Typography, List,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StarRating } from '../components';
import { getWashroom } from '../actions/washroomActions';
import './WashroomDetails.css';

const { Title } = Typography;

class WashroomDetails extends Component {
  componentDidMount() {
    const { match } = this.props;
    const id = eval(match.params.id);// eslint-disable-line no-eval
    const { washroom } = this.props;
    if (washroom.id !== id) {
      this.getWashroom(id);
    }
  }

  getWashroom = (id) => {
    const { getWashroom } = this.props; // eslint-disable-line no-shadow
    getWashroom(id);
  }

  formatGender = (input) => {
    if (input) return `${input.charAt(0).toUpperCase() + input.slice(1)}'s`;
    return '';
  }


  render() {
    const { washroom, isFetching } = this.props;
    const ratings = washroom.average_ratings;
    if (isFetching) {
      return (<div />);
    }

    return (
      <>
        <Title>{washroom.title}</Title>
        <div>
          <h3>
            {`Floor ${washroom.floor} | ${this.formatGender(washroom.gender)}`}
          </h3>
          <div className="in-line">
            <div className="rating-title"><b>Overall</b></div>
            <div className="rating-value">
              <StarRating
                rating={washroom.overall_rating}
              />
            </div>
          </div>
          <div className="in-line">
            <div className="rating-title">Cleanliness</div>
            <div className="rating-value">
              {ratings ? ratings.cleanliness : ''}
            </div>
          </div>
          <div className="in-line">
            <div className="rating-title">Privacy</div>
            <div className="rating-value">
              {ratings ? ratings.privacy : ''}
            </div>
          </div>
          <div className="in-line">
            <div className="rating-title">Paper Quality</div>
            <div className="rating-value">
              {ratings ? ratings.toilet_paper_quality : ''}
            </div>
          </div>
          <div className="in-line">
            <div className="rating-title">Smell</div>
            <div className="rating-value">
              {ratings ? ratings.smell : ''}
            </div>
          </div>
          <div className="amenities-div">
            <List
              header={<b>Amenities</b>}
              loading={isFetching}
              bordered
              size="small"
              dataSource={washroom.amenities}
              renderItem={(item) => (
                <List.Item
                  key={item}
                >
                  {item}
                </List.Item>
              )}
            />
          </div>
          <div />
        </div>
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
  washroom: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

WashroomDetails.defaultProps = {
  washroom: null,
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(WashroomDetails);
