import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setError } from '../pages/loginPage/loginSlice';

export const getUserInfoThunk = createAsyncThunk(
  'user/getUserListThunk',
  async (action, { dispatch }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        // Ici, on passe action.token et pas action.payload,
        // car on veut récupérer uniquement la valeur de l'objet token
        authorization: `Bearer ${action}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('users:', data);
      dispatch(setUser(data));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData));
      throw new Error(errorData.message || 'erreur de récupèration');
    }
  },
);

export const setUserNameThunk = createAsyncThunk(
  'userName/setUserName',
  async ({ token, userName }, { dispatch }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData));
      throw new Error(
        errorData.message || 'erreur pour la modification du pseudo',
      );
    }
  },
);
