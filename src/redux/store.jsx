import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './InvoiceSlice';
import ProfileSlice from './ProfileSlice';

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    profile: ProfileSlice,
  },
});

export default store;
