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

 class NearMe extends Component  {
   constructor() {
     super();
   }

   getWashrooms = (event) => {
    this.props.getWashrooms();
   }

   render() {
    return (
      <>
        <Icon type="environment" className="icon-title" />
        <Title>Near Me</Title>
        <Button onClick={this.getWashrooms}>Test redux action</Button>
        <pre>
          { JSON.stringify(this.props) }
        </pre>
        <List
          bordered
          dataSource={this.props.simpleReducer.locations}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </>
    );
   }
};

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getWashrooms: () => dispatch(getWashrooms())
})

NearMe.propTypes = {
  locations: PropTypes.instanceOf(Array),
};

NearMe.defaultProps = {
  locations: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NearMe);
