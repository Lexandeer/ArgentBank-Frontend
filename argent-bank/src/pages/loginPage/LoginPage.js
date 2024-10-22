import React from 'react'
import {Link} from 'react-router-dom'

const LoginPage = () => {
     return (
        <div>
        <nav class="main-nav">
      <a class="main-nav-logo" href="./index.html">
        <img
          class="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </a>
      <div>
      <Link  to='/login' className="main-nav-item" >
        <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
    <main class="main bg-dark">
      <section class="sign-in-content">
        <i class="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div class="input-wrapper">
            <label for="username">Username</label
            ><input type="text" id="username" />
          </div>
          <div class="input-wrapper">
            <label for="password">Password</label
            ><input type="password" id="password" />
          </div>
          <div class="input-remember">
            <input type="checkbox" id="remember-me" /><label for="remember-me"
              >Remember me</label
            >
          </div>
          <Link to='/user' class="sign-in-button"></Link> {/* <- link pour travailler sur user (à supprimer plus tard)*/}
       <button class="sign-in-button">Sign In</button> 
        </form>
      </section>
    </main>
    <footer class="footer">
      <p class="footer-text">Copyright 2020 Argent Bank</p>
    </footer>
        </div>
     )
}

export default LoginPage

