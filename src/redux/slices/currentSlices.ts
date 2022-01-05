import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { CurrentWeatherProps } from "../../types";
import { featchWeatherIconUrl } from "./dailyForecastsSliceSlices";
import { defaultParams } from "./weatherSlices";
import temperatureUnits from "../../constants/constants";

//Action
export const fetchCurrentWeather = createAsyncThunk(
  "currentWeather/fetch",
  async (payload: string | null, { rejectWithValue, getState, dispatch }) => {
    if (payload === null) return null;
    else
      try {
        const params = {
          q: payload,
          ...defaultParams,
        };
        const locationKey = payload;
        const res = await axios
          .get(
            `${process.env.REACT_APP_ACCU_WEATHER_URL}currentconditions/v1/${locationKey}`,
            { params }
          )
          .then((res) => {
            const currentWeatherData = res.data[0];
            return {
              icon: featchWeatherIconUrl(currentWeatherData.WeatherIcon),
              epochDate: currentWeatherData.EpochTime,
              description: currentWeatherData.WeatherText,
              temp: {
                [temperatureUnits.CELSIUS]:
                  currentWeatherData.Temperature.Metric.Value,
                [temperatureUnits.FAHRENHEIT]:
                  currentWeatherData.Temperature.Imperial.Value,
              },
            };
          });
        return res;
      } catch (error: any) {
        if (!error?.response) {
          toast.error("Unable to reach server . . .", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
  }
);

interface PropsCurrentWeather {
  currentWeather: CurrentWeatherProps | null | any;
  currentWeatherLoading: boolean;
  currentWeatherOk: boolean;
  currentWeatherError: any | null;
}
const initialState: PropsCurrentWeather = {
  currentWeather: null,
  currentWeatherLoading: false,
  currentWeatherOk: false,
  currentWeatherError: null,
};
//Slice
const currentSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Pending
    builder.addCase(fetchCurrentWeather.pending, (state, action) => {
      state.currentWeatherLoading = true;
    });
    //Fulfilled
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.currentWeather = action?.payload;
      state.currentWeatherLoading = false;
      state.currentWeatherOk = true;
      state.currentWeatherError = undefined;
    });
    //Rejected
    builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
      state.currentWeatherLoading = false;
      state.currentWeather = null;
      state.currentWeatherOk = false;
      state.currentWeatherError = action?.payload;
    });
  },
});

export default currentSlice.reducer;
