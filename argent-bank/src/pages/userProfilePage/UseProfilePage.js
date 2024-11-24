import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  disconnect,
  resetSetUserNameStatus,
  disconnectThunk,
  selectUser,
  selectToken,
  selectSetUserNameStatus,
} from '../loginPage/loginSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUserInfoThunk, setUserNameThunk } from '../../api/api';

const UserProfilePage = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const setUserNameStatus = useSelector(selectSetUserNameStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { disconnectStatus } = useSelector((state) => state.login);

  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(setUserNameThunk({ token, userName }));
    setIsVisible(false);
  };

  useEffect(() => {
    if (setUserNameStatus === 'succeeded') {
      setUserName('');
      dispatch(getUserInfoThunk(token));
    }
    dispatch(resetSetUserNameStatus());
  }, [setUserNameStatus, dispatch, token]);

  useEffect(() => {
    if (disconnectStatus === 'succeeded') {
      navigate('/login');
    }
  }, [disconnectStatus, navigate]);
  return (
    <div>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="../img/argentBankLogo.jpeg"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="flex-row">
          <div className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <p className="main-nav-item-text">
              {user.body ? user.body?.userName : ''}
            </p>
          </div>
          <button
            className="main-nav-item nav-button-userProfile"
            onClick={() => {
              dispatch(disconnectThunk(disconnect));
            }}
          >
            <i className="fa fa-sign-out"></i>
            <p className="main-nav-item-text">Sign Out</p>
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            <p>
              {/* Ici l'opération ternaire nous permet d'attendre la récupèration de 
                    user.body et ainsi éviter les erreurs de rendu. */}
              {user.body ? `${user.body.firstName} ${user.body.lastName}` : ''}
            </p>
          </h1>
          {isVisible === false && (
            <button
              className="edit-button"
              onClick={() => {
                setIsVisible(true);
              }}
            >
              Edit Name
            </button>
          )}
          <div
            className={isVisible ? 'form-wrapper-flex' : 'form-wrapper-none'}
          >
            <form className="user-form" onSubmit={handleSubmit}>
              <legend className="user-form-title">Edit user info</legend>
              <div className="user-form-inputs">
                <div className="user-form-input">
                  <label htmlFor="userName">User name:</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="user-form-input">
                  <label htmlFor="firstName">First name:</label>
                  <input
                    className="input-readOnly"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder={user.body ? user.body.firstName : ''}
                    readOnly
                  ></input>
                </div>
                <div className="user-form-input">
                  <label htmlFor="lastName">Last name:</label>
                  <input
                    className="input-readOnly"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={user.body ? user.body.lastName : ''}
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="user-form-buttons">
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsVisible(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfilePage;
