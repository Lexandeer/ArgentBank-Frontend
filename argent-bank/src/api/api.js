import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserList, setError } from '../pages/loginPage/loginSlice';

export const getUserListThunk = createAsyncThunk(
  'user/getUserListThunk',
  async (_, { dispatch }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUserList(data));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData));
      throw new Error(errorData.message || 'erreur de récupèration');
    }
  },
);
