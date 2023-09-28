import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoiceSlice'

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});

export default store;
