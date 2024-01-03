import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      // state.push({ id: state.length + 1 });
      state.push(action.payload)
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
