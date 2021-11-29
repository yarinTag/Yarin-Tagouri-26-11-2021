import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Action
export const themeColor = createAsyncThunk(
  "themeControl/fetch",
  async (payload: boolean, { rejectWithValue, getState, dispatch }) => {
    try {
      if (payload) return payload;
    } catch (error: any) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

interface PropsFavoritesWeather {
  themeControl: boolean | any;
  themeControlLoading: boolean;
  themeControlError: any | null;
}
const initialState: PropsFavoritesWeather = {
  themeControl: false,
  themeControlLoading: false,
  themeControlError: null,
};
//Slice
const themeSlices = createSlice({
  name: "themeControl",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Pending
    builder.addCase(themeColor.pending, (state, action) => {
      state.themeControlLoading = true;
    });
    //Fulfilled
    builder.addCase(themeColor.fulfilled, (state, action) => {
      state.themeControl = action?.payload;
      state.themeControlLoading = false;
      state.themeControlError = undefined;
    });
    //Rejected
    builder.addCase(themeColor.rejected, (state, action) => {
      state.themeControlLoading = false;
      state.themeControl = false;
      state.themeControlError = action?.payload;
    });
  },
});

export default themeSlices.reducer;
