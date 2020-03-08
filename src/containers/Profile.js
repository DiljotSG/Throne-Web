import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Spin, Icon } from 'antd';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';

const { Title } = Typography;

class Profile extends Component {
  componentDidMount() {
    const { user } = this.props;

    if (isEmpty(user)) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = () => {
    const { getCurrentUser } = this.props; // eslint-disable-line no-shadow

    getCurrentUser();
  }

  render() {
    const { user, isFetching } = this.props;

    if (isEmpty(user) && isFetching) {
      return <Spin />;
    }
    return (
      <>
        <Icon type="user" className="icon-title" />
        <Title>
          {user.username}
        </Title>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, isFetching } = state.userReducer;

  return { user, isFetching };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

Profile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
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
  isFetching: PropTypes.bool,
};

Profile.defaultProps = {
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
