import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  disconnect,
  disconnectThunk,
  selectUser,
} from '../loginPage/loginSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { disconnectStatus } = useSelector((state) => state.login);

  useEffect(() => {
    if (disconnectStatus === 'succeeded') {
      navigate('/login');
    }
    console.log('disconnectStatus :', disconnectStatus);
  }, [disconnectStatus, navigate]);

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
        <div className="flex-row">
          <div className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <p>{user.body ? user.body.firstName : ''}</p>
          </div>
          <button
            className="main-nav-item nav-button-userProfile"
            onClick={() => {
              dispatch(disconnectThunk(disconnect));
            }}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            <p>
              {' '}
              {/* Ici l'opération ternaire nous permet d'attendre la récupèration de 
                    user.body et ainsi éviter les erreurs de rendu. */}
              {user.body
                ? `${user?.body.firstName} ${user?.body.lastName}`
                : ''}
            </p>
          </h1>
          <button className="edit-button">Edit Name</button>
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
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserProfilePage;
