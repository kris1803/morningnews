import React, { useCallback, useMemo } from 'react';
import { HomeOutlined, LogoutOutlined, ReadOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Nav(props) {
  let handleLogout = useCallback(() => {
    props.logoutUser();
  }, [props]);

  const items = useMemo(() => {
    return [
      {
        label: <Link to={'/source'}>
          <HomeOutlined style={{ marginRight: 7 }} />
          Sources
        </Link>,
        key: 'sources',
      },
      {
        key: 'my-articles',
        label: <Link to={'/my-articles'}>
          <ReadOutlined style={{ marginRight: 7 }} />
          My Articles
        </Link>,
      },
      {
        key: 'logout',
        label: <Link to={'/'} onClick={handleLogout} >
          <LogoutOutlined style={{ marginRight: 7 }} />
          Logout
        </Link>,
      }
    ]
  }, [handleLogout])

  return (
    <nav >
      <Menu style={{ textAlign: 'center' }} direction='rtl' mode="horizontal" theme="dark" items={items} />
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