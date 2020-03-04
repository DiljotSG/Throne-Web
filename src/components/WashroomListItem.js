import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './WashroomListItem.css';
import { Rate, Col, Row } from 'antd';
import { startCase } from 'lodash';

const WashroomListItem = ({ item }) => (
  <NavLink
    to={{
      pathname: `/washrooms/${item.id}`,
      state: { washroom: item },
    }
    }
    className="link-style"
  >
    <Row className="row">
      <Col flex="auto" className="left-side">
        {item.title}
        <div className="in-line">
          <Rate
            disabled
            value={item.overall_rating}
            allowHalf
            className="rating"
          />
          <span className="in-line-text">
            {`Floor ${item.floor}`}
          </span>
          <span className="in-line-text">
            {startCase(item.gender)}
            &apos;s
        </span>
          {item.is_favorite ? <span aria-label="Favorite" role="img" className="in-line-text"> 👑</span> : null}
        </div>
      </Col>
      <Col flex="80px" className="right-side">
        Distance
        <h4>19m</h4>
      </Col>
    </Row>
  </NavLink >
);

WashroomListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    overall_rating: PropTypes.number.isRequired,
    floor: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    is_favorite: PropTypes.bool.isRequired,
  }),
};

WashroomListItem.defaultProps = {
  item: {},
};

export default WashroomListItem;
