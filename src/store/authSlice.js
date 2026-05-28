import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser ? savedUser.username : null,
  isAdmin: savedUser ? savedUser.isAdmin : false,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {

      const response = await fetch(
        'https://e-commerce-production-68a9.up.railway.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      return {
        username: data.user.name,
        isAdmin: false
      };

    } catch (error) {

      return rejectWithValue(error.message);

    }
  }
);

export const loginAdmin = createAsyncThunk(

  'auth/loginAdmin',

  async ({ username, password }, { rejectWithValue }) => {

    try {

      const response = await fetch(

        'https://e-commerce-production-68a9.up.railway.app/admin/login',

        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username,
            password
          }),

        }

      );

      if (!response.ok) {

        throw new Error('Admin login failed');

      }

      const data = await response.json();

      return {

        username: data.username,

        isAdmin: true,

        token: data.token

      };

    } catch (error) {

      return rejectWithValue(error.message);

    }

  }

);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    googleLoginSuccess: (state, action) => {
      state.user = action.payload.username;
      state.isAdmin = false;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({
        username: action.payload.username,
        isAdmin: false
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username;
        state.isAdmin = false;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify({
          username: action.payload.username,
          isAdmin: false
        }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username;
        state.isAdmin = true;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify({
          username: action.payload.username,
          isAdmin: true
        }));
        localStorage.setItem(
          'token',
          action.payload.token
        );
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, googleLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
