import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://creepy-tan-parrot.cyclic.app/';

export const fetchDiet = createAsyncThunk(
  'diet/getDiet',
  async ({ bodyData, token }, thunkAPI) => {
    try {
      const response = await axios.post('api/diet/personal', bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const requestActions = [fetchDiet];
const isPendingActions = isPending(...requestActions);
const isFulfilledActions = isFulfilled(...requestActions);
const isRejectedActions = isRejected(...requestActions);

export const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    items: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: buider =>
    buider
      .addCase(fetchDiet.fulfilled, (state, action) => {
        state.items = action.payload;
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