import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AutoWeatherProps } from "../../types";

export const defaultParams = {
  apikey: "AD9i2mfrpq0S2tAFi8o5JtLbWjp2q9bC",
  language: "en-us",
};

//Action
export const fetchAutoCompleteLocations = createAsyncThunk(
  "weather/fetch",
  async (payload: string, { rejectWithValue, getState, dispatch }) => {
    try {
      const params = {
        q: payload,
        ...defaultParams,
      };
      const res = await axios.get(
        `${process.env.REACT_APP_ACCU_WEATHER_URL}locations/v1/cities/autocomplete`,
        { params }
      );
      return res.data;
    } catch (error: any) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

interface PropsAutocomplete {
  weather: AutoWeatherProps | AutoWeatherProps[] | null;
  loading: boolean;
  error: any | null;
}
const initialState: PropsAutocomplete = {
  weather: null,
  loading: false,
  error: null,
};
//Slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Pending
    builder.addCase(fetchAutoCompleteLocations.pending, (state, action) => {
      state.loading = true;
    });
    //Fulfilled
    builder.addCase(fetchAutoCompleteLocations.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    //Rejected
    builder.addCase(fetchAutoCompleteLocations.rejected, (state, action) => {
      state.loading = false;
      state.weather = null;
      state.error = action?.payload;
    });
  },
});

export default weatherSlice.reducer;
