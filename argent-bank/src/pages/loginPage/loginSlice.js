import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setUserNameThunk, connectionThunk } from '../../api/api';

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
    setUserNameStatus: 'idle',
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
    resetSetUserNameStatus: (currentState) => {
      currentState.setUserNameStatus = 'idle';
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
        state.token = action.payload.body.token;
      })
      .addCase(connectionThunk.rejected, (state, action) => {
        state.connectionStatus = 'failed';
      })
      .addCase(disconnectThunk.fulfilled, (state) => {
        state.disconnectStatus = 'succeeded';
      })
      .addCase(setUserNameThunk.fulfilled, (state, action) => {
        state.userName = action.payload.body.userName;
        state.setUserNameStatus = 'succeeded';
      })
      .addCase(setUserNameThunk.rejected, (state) => {
        state.setUserNameStatus = 'failed';
      });
  },
});

export const { setUser, setError, disconnect, resetSetUserNameStatus } =
  loginSlice.actions;
export const selectUser = (state) => state.login.user;
export const selectToken = (state) => state.login.token;
export const selectConnectionStatus = (state) => state.login.connectionStatus;
export const selectSetUserNameStatus = (state) => state.login.setUserNameStatus;
