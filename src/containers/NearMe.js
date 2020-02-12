import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  Icon,
  Button,
} from 'antd';

import { connect } from 'react-redux';
import { getWashrooms } from '../actions';

const { Title } = Typography;

class NearMe extends Component {
  getWashrooms = () => {
    const { getWashrooms } = this.props;

    getWashrooms();
  }

  render() {
    const { washrooms } = this.props;

    return (
      <>
        <Icon type="environment" className="icon-title" />
        <Title>Near Me</Title>
        <Button onClick={this.getWashrooms}>Get washrooms using redux</Button>
        <pre>
          { JSON.stringify(this.props) }
        </pre>
        <List
          bordered
          dataSource={washrooms}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { washrooms } = state.washroomReducer;

  return {
    washrooms,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getWashrooms: () => dispatch(getWashrooms()),
});

NearMe.propTypes = {
  getWashrooms: PropTypes.func.isRequired,
  washrooms: PropTypes.instanceOf(Array),
};

NearMe.defaultProps = {
  washrooms: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NearMe);
