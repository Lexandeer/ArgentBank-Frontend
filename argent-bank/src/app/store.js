import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../pages/loginPage/loginSlice';

let initialState = {};

export const store = configureStore({
  preloadedState: initialState,
  reducer: combineReducers({
    login: loginSlice.reducer,
  }),
});
