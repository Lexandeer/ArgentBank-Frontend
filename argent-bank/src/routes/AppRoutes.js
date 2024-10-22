import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/homePage/HomePage'
import LoginPage from '../pages/loginPage/LoginPage'
import UserProfilePage from '../pages/userProfilePage/UseProfilePage'
import "../App.css"

const AppRoutes = () =>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/user' element={<UserProfilePage />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;