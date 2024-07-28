import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  businessName: '',
  email: '',
  phoneNumber: '',
  address: '',
  gstRegisteredNumber: '',
  pan: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;