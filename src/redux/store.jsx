import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './InvoiceSlice';

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});

export default store;
