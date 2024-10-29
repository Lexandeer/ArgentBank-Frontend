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
      // connectionThunk renvoie au reducer la réponse de l'API(le token) sous forme d'actionPayload.
      return data; // resolve(),
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
    userList: [],
  },
  // Pour les actions Synchrones
  reducers: {
    Disconnect: (currentState) => {
      // On remet à zéro tout les states
      currentState.token = null; // réinitialise le token  à la déconnexion
      currentState.status = 'idle';
      currentState.error = null;
    },
    setUserList: (currentState, action) => {
      currentState.userList = action.payload;
    },
    setError: (currentState, action) => {
      currentState.error = action.payload;
    },
  },
  // Pour les actions Asynchrones
  extraReducers: (builder) => {
    builder
      .addCase(connectionThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(connectionThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(connectionThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
