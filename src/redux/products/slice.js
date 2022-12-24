import {
  addEatedProduct,
  getProductsByDate,
  getProductsByTitle,
  removeEatedProduct,
} from './operations';
import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import moment from 'moment';

const productsInitState = {
  eatedProducts: [],
  selectedProduct: [],
  date: moment(new Date()).format('YYYY-MM-DD'),
  isLoading: false,
  error: null,
};

const requestActions = [
  getProductsByDate,
  getProductsByTitle,
  addEatedProduct,
  removeEatedProduct,
];
const isPendingActions = isPending(...requestActions);
const isFulfilledActions = isFulfilled(...requestActions);
const isRejectedActions = isRejected(...requestActions);

const productsSlice = createSlice({
  name: 'products',
  initialState: productsInitState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },

  extraReducers: buider =>
    buider
      .addCase(getProductsByDate.fulfilled, (state, action) => {
        state.eatedProducts = action.payload;
      })
      .addCase(getProductsByTitle.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(addEatedProduct.fulfilled, (state, action) => {
        state.eatedProducts.push(action.payload);
      })
      .addCase(removeEatedProduct.fulfilled, (state, action) => {
        const index = state.eatedProducts.findIndex(
          ep => ep._id === action.payload
        );
        state.eatedProducts.splice(index, 1);
      })
      .addMatcher(isAnyOf(isFulfilledActions), state => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(isPendingActions), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(isRejectedActions), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setDate } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;