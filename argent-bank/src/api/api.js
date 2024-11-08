import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setError } from '../pages/loginPage/loginSlice';

export const getUserListThunk = createAsyncThunk(
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
      console.log('token récupérer dans la requête GET:', action);
      dispatch(setError(errorData));
      throw new Error(errorData.message || 'erreur de récupèration');
    }
  },
);
