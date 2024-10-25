import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const connectionThunk = createAsyncThunk(
  'login/connectionThunk',
  async (action) => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        //On specifie que les données sont au format json
        'Content-type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // resolve()
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'erreur de connexion '); // reject()
    }
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  // Pour les actions Synchrones
  reducers: {
    Disconnect: (currentState, action) => {
      const tokenState = [...currentState, action.payload];
      return tokenState;
    },
  },
  // Pour les actions Asynchrones
  extraReducers: {
    [connectionThunk.pending]: (state) => {
      state.status = 'loading';
    },
    [connectionThunk.fulfilled]: (state, action) => {
      state.status = 'succeded';
      state.localStorage = action.payload; // On ajoute le token
    },
    [connectionThunk.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});
