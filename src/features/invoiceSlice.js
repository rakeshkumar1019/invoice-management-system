// invoiceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: [
    {
      "id": "INV-23e64d25",
      "showModal": true,
      "info": {
          "isOpen": true,
          "currency": "₿",
          "currentDate": "",
          "invoiceNumber": "INV-23e64d25",
          "dateOfIssue": "2023-09-11",
          "billTo": "Rakesh ",
          "billToEmail": "r@gmail.com",
          "billToAddress": "hyd",
          "billFrom": "bbb",
          "billFromEmail": "b@g.com",
          "billFromAddress": "Delhi",
          "notes": "Notes-",
          "total": 3.5,
          "subTotal": "3.04",
          "taxRate": "20",
          "taxAmmount": "0.61",
          "discountRate": "5",
          "discountAmmount": "0.15",
          "items": [
              {
                  "id": "INV-4f13d2b5",
                  "name": "one",
                  "description": "oned",
                  "price": "1.00",
                  "quantity": 1
              },
              {
                  "id": "INV-b952ae96",
                  "name": "two",
                  "price": "1.02",
                  "description": "twod",
                  "quantity": "2"
              }
          ]
      },
      "items": [
          {
              "id": "INV-4f13d2b5",
              "name": "one",
              "description": "oned",
              "price": "1.00",
              "quantity": 1
          },
          {
              "id": "INV-b952ae96",
              "name": "two",
              "price": "1.02",
              "description": "twod",
              "quantity": "2"
          }
      ],
      "currency": "₿",
      "subTotal": "3.04",
      "taxAmmount": "0.61",
      "discountAmmount": "0.15",
      "total": 3.5
  }
  ],
  reducers: {
    addInvoice: (state, action) => {
         return [...state,action.payload]
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
    copyInvoice:(state,action)=>{
      const { id,invoice } = action.payload;
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
