import { createSlice } from '@reduxjs/toolkit';
const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      return [...state, action.payload]
    },
    editInvoice: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((invoice) => invoice.id === id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      const { id } = action.payload;
      return state.filter((invoice) => invoice.id !== id);
    },
    copyInvoice: (state, action) => {
      const { id, invoice } = action.payload;
      const indexOfMatchingInvoice = state.findIndex((item) => item.id === id);
      if (indexOfMatchingInvoice !== -1) {
        const newState = [...state];
        newState.splice(indexOfMatchingInvoice + 1, 0, invoice);
        return newState;
      }
      return [...state, invoice];
    },
  },
});

export const { addInvoice, editInvoice, deleteInvoice, copyInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
