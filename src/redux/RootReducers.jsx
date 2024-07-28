import { combineReducers } from '@reduxjs/toolkit';
import InvoiceSlice from './InvoiceSlice';
import ProfileSlice from './ProfileSlice';

const rootReducer = combineReducers({
 invoices: InvoiceSlice,
 profile: ProfileSlice,
 // other reducers go here
});

export default rootReducer;
