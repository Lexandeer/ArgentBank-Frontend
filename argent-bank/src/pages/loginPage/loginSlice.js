import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

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
  initialState: {
    status: 'idle', //idle, loading, succeeded, failed
    error: null,
    token: null,
  },
  // Pour les actions Synchrones
  reducers: {
    Disconnect: (currentState) => {
      // On remet à zéro tout les states
      currentState.token = null; // réinitialise le token  à la déconnexion
      currentState.status = 'idle';
      currentState.error = null;
    },
  },
  // Pour les actions Asynchrones
  extraReducers: {
    [connectionThunk.pending]: (state) => {
      state.status = 'loading';
      state.error = null; // On s'assure que l'erreur précèdente est remise à zéro
    },
    [connectionThunk.fulfilled]: (state, action) => {
      state.status = 'succeded';
      state.token = action.payload; // On ajoute le token
    },
    [connectionThunk.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});
