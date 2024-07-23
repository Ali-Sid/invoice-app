import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
  },
  reducers: {
    addInvoice: (state, action) => {
      const newInvoices = action.payload;
      newInvoices.forEach((newInvoice) => {
        const exists = state.invoices.some((inv) => inv.id === newInvoice.id);
        if (!exists) {
          state.invoices.push(newInvoice);
        }
      });
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
    },
    editInvoice: (state, action) => {
      const updatedInvoice = action.payload;
      const index = state.invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
      if (index !== -1) {
        // Using Object.assign to merge the updatedInvoice with the existing invoice at the found index
        state.invoices[index] = Object.assign({}, state.invoices[index], updatedInvoice);
      }
    },
  },
});

export const { addInvoice, deleteInvoice, editInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
