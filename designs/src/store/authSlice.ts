import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  token: string | null;
  profile: Profile | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      localStorage.removeItem('token');
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, setProfile } = authSlice.actions;
export default authSlice.reducer;