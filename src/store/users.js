import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'users',
  initialState: {
    email: '',
    //name: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    // action => action handler
  },
});

export const {  } = slice.actions;

export const userSelector = state => state.user;

export default slice.reducer;
