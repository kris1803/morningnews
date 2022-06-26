import React, { useState } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ScreenHome(props) {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  let handleSubmitSignUp = async () => {
    let rawdata = await fetch('/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        'username=' + signUpUsername +
        '&password=' + signUpPassword +
        '&email=' + signUpEmail
    });
    let data = await rawdata.json();
    console.log(data)
    if (data.success === true) {
      console.log('setting is login to true')
      setIsLogin(true);
      for (let i = 0; i<data.user.articles.length; i++) {
        props.addToWishlist(data.user.articles[i]);
      }
    } else {
      console.log('setting is login to false')
      setIsLogin(false);
      alert(data.error);
    }
  };
  let handleSubmitSignIn = async () => {
    let rawdata = await fetch('/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        '&password=' + signInPassword +
        '&email=' + signInEmail
    });
    let data;
    if (!rawdata.ok) {
      data = { success: false, error: 'Not connected to server. try later.' };
    } else {
      console.log(rawdata)
      data = await rawdata.json();
    }
    
    console.log(data)
    if (data.success) {
      setIsLogin(true);
      let user = data.user;
      props.loginUser(user);
      for (let i =0; i< data.user.articles.length; i++) {
        props.addWishList(data.user.articles[i]);
      }
    } else {
      setIsLogin(false);
      alert(data.error);
    }

  }

  if (!isLogin) {
    return (
      <div className="Login-page" >

        {/* SIGN-IN */}
        <div className="Sign">

          <Input className="Login-input" placeholder="arthur@lacapsule.com" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />

          <Input.Password className="Login-input" placeholder="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />

          <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignIn()} >Sign-in</Button>

        </div>

        {/* SIGN-UP */}
        <div className="Sign">

          <Input className="Login-input" placeholder="Arthur G" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
          <Input className="Login-input" placeholder="email@mail.com" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />

          <Input.Password className="Login-input" placeholder="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
          <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignUp()} >Sign-up</Button>
        </div>
      </div>
    );
  } else {
    return (
      <Redirect to='/source' />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: function (user) {
      dispatch({ type: 'LOGIN_USER', payload: user });
    },
    logoutUser: function () {
      dispatch({ type: 'LOGOUT_USER' });
    },
    addWishList: function (article) {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: article });
    }
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenHome);