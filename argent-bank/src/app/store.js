import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../pages/loginPage/loginSlice';
import { thunk } from 'redux-thunk';

let initialState = {};

export const store = configureStore({
  preloadedState: initialState,
  reducers: combineReducers({
    login: loginSlice,
  }),
});
