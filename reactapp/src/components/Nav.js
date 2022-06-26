import React from 'react';
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Nav(props) {
  let handleLogout = () => {
    props.logoutUser();
  }

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to={'/source'}>
          <Icon type="home" />
            Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to={'/my-articles'}>
          <Icon type="read" />
            My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to={'/'}>
          <Icon type="logout" onClick={handleLogout} />
            Logout
          </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: function (user) {
      dispatch({ type: 'LOGIN_USER', payload: user });
    },
    logoutUser: function () {
      dispatch({ type: 'LOGOUT_USER' });
    }
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);