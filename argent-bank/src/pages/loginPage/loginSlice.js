import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserListThunk } from '../../api/api';

export const connectionThunk = createAsyncThunk(
  'login/connectionThunk',
  async (action, { dispatch }) => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        //On specifie que les données sont au format json
        'Content-type': 'application/json',
      },
      body: JSON.stringify(action),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('token envoyé par la requête POST:', data);
      dispatch(getUserListThunk(data.body.token)); // Je précise le contenu de l'action
      // connectionThunk renvoie au reducer la réponse de l'API(le token) sous forme d'actionPayload.
      return data; // resolve(),
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'erreur de connexion '); // reject()
    }
  },
);

// Mon thunk disconnectThunk sert à encapsuler mon action Disconnect et s'assurer
// qu'elle se finalise avant de navigate('/login)
export const disconnectThunk = createAsyncThunk(
  'logout/disconnectThunk',
  async (action, { dispatch }) => {
    dispatch(action()); // l'action passer est disconnect
    return true; //Indique au reducer que l'action est fulfilled
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    connectionStatus: 'idle', //idle, loading, succeeded, failed
    disconnectStatus: 'idle',
    error: null,
    token: null,
    user: {},
  },
  // Pour les actions Synchrones
  reducers: {
    disconnect: (currentState) => {
      // On remet à zéro tout les states
      currentState.token = null; // réinitialise le token  à la déconnexion
      currentState.connectionStatus = 'idle';
      currentState.error = null;
      currentState.user = {};
    },
    setUser: (currentState, action) => {
      currentState.user = action.payload;
    },
    setError: (currentState, action) => {
      currentState.error = action.payload;
    },
  },
  // Pour les actions Asynchrones
  extraReducers: (builder) => {
    builder
      .addCase(connectionThunk.pending, (state) => {
        state.connectionStatus = 'loading';
      })
      .addCase(connectionThunk.fulfilled, (state, action) => {
        state.connectionStatus = 'succeeded';
        state.disconnectStatus = 'idle';
        state.token = action.payload;
      })
      .addCase(connectionThunk.rejected, (state, action) => {
        state.connectionStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(disconnectThunk.fulfilled, (state) => {
        state.disconnectStatus = 'succeeded';
      });
  },
});

export const { setUser, setError, disconnect } = loginSlice.actions;
export const selectUser = (state) => state.login.user;
