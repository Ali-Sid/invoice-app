import { combineReducers } from '@reduxjs/toolkit';
import InvoiceSlice from './InvoiceSlice';

const rootReducer = combineReducers({
 invoices: InvoiceSlice,
 // other reducers go here
});

export default rootReducer;
