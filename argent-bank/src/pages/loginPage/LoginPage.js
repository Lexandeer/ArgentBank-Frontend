import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectConnectionStatus } from './loginSlice';
import { connectionThunk } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const connectionStatus = useSelector(selectConnectionStatus);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const loginInput = {
      email: userName,
      password: passWord,
    };
    dispatch(connectionThunk(loginInput));
  };

  useEffect(() => {
    if (connectionStatus === 'succeeded') {
      setPassWord('');
      setUserName('');
      navigate('/user/profile');
    }
  }, [connectionStatus, navigate]);

  const errorMessage = 'Mot de passe éroné';
  const emptyInput = 'Le champs est vide';

  return (
    <div>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.jpeg"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <p className="main-nav-item-text">Sign In</p>
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {(connectionStatus === 'failed') & !userName ? (
                <p>{emptyInput} </p>
              ) : (
                ''
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
              {(connectionStatus === 'failed') & (passWord !== '') ? (
                <p>{errorMessage}</p>
              ) : (
                ''
              )}
              {(connectionStatus === 'failed') & !passWord ? (
                <p>{emptyInput}</p>
              ) : (
                ''
              )}
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
          {connectionStatus === 'loading' && <span className="loader"></span>}
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
