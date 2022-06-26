import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './login.module.css';

function ScreenLogin(props) {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  let handleSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      let rawdata = await fetch('/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signUpUsername,
          password: signUpPassword,
          email: signUpEmail
        })
      });
      let data = await rawdata.json();
      if (data.success) {
        setIsLogin(true);
        for (let i = 0; i < data.user.articles.length; i++) {
          props.addToWishlist(data.user.articles[i]);
        }
      } else {
        console.log('setting is login to false')
        setIsLogin(false);
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
      alert('Server connection error. Try later.')
    }
  };
  let handleSubmitSignIn = async (event) => {
    event.preventDefault();
    try {
      let rawdata = await fetch('/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: signInEmail, password: signInPassword })
      });
      let data;
      if (!rawdata.ok) {
        data = { success: false, error: 'Not connected to server. try later.' };
      } else {
        //console.log(rawdata)
        data = await rawdata.json();
      }
      //console.log(data)
      if (data.success) {
        setIsLogin(true);
        let user = data.user;
        props.loginUser(user);
        for (let i = 0; i < data.user.articles.length; i++) {
          props.addWishList(data.user.articles[i]);
        }
      } else {
        setIsLogin(false);
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
      alert('Server connection error.')
    }
  }

  if (!isLogin) {
    return (
      <div className={styles['login-page']} >
        <h2 style={{ fontSize: 22, color: '#000', backgroundColor: '#fff', padding: 10, borderRadius: 10 }} >Welcome to MorgningNews</h2>
        {/* SIGN-IN */}
        <div className={styles['form-container']}>
          <form className={styles.sign}>

            <Input className={styles['login-input']} placeholder="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />

            <Input.Password className={styles['login-input']} placeholder="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />

            <Button style={{ width: '80px' }} type="primary" onClick={handleSubmitSignIn} >Sign-in</Button>

          </form>

          {/* SIGN-UP */}
          <form className={styles.sign}>

            <Input className={styles['login-input']} placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
            <Input className={styles['login-input']} placeholder="email@mail.com" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />

            <Input.Password className={styles['login-input']} placeholder="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
            <Button style={{ width: '80px' }} type="primary" onClick={handleSubmitSignUp} >Sign-up</Button>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScreenLogin);