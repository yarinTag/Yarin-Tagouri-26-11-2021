import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Import projects
import temperatureUnits from "../../constants/constants";
import { defaultParams } from "./weatherSlices";
import { DailyForecastsProps } from "../../types";

export const iconsUrl =
  "https://vortex.accuweather.com/adc2010/images/slate/icons";

export const featchWeatherIconUrl = (iconId: string) =>
  `${iconsUrl}/${iconId}.svg`;
export const changeToFahrenheit = (cel: number) => (cel * 9) / 5 + 32;

//Action
export const fetchFiveDaysOfDaily = createAsyncThunk(
  "dailyForecasts/fetch",
  async (payload: string, { rejectWithValue, getState, dispatch }) => {
    try {
      const params = {
        metric: true,
        ...defaultParams,
      };
      const locationKey = payload;
      const res = await axios
        .get(
          `${process.env.REACT_APP_ACCU_WEATHER_URL}forecasts/v1/daily/5day/${locationKey}`,
          { params }
        )
        .then((res) => {
          const daysOfForecastsData = res.data.DailyForecasts;
          const daysOfForecasts = daysOfForecastsData.map((day: any) => {
            const icon = day.Day.Icon;
            const minCel = day.Temperature.Minimum.Value;
            const maxCel = day.Temperature.Maximum.Value;
            const epochDate = day.EpochDate;
            const description = day.Day.IconPhrase;

            return {
              icon: featchWeatherIconUrl(icon),
              epochDate,
              description,
              minTemp: {
                [temperatureUnits.CELSIUS]: minCel,
                [temperatureUnits.FAHRENHEIT]: changeToFahrenheit(minCel),
              },
              maxTemp: {
                [temperatureUnits.CELSIUS]: maxCel,
                [temperatureUnits.FAHRENHEIT]: changeToFahrenheit(maxCel),
              },
            };
          });
          return daysOfForecasts;
        });
      return res;
    } catch (error: any) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

interface PropsDailyForecasts {
  dailyForecasts: DailyForecastsProps | null;
  dailyForecastsLoading: boolean;
  dailyForecastsOk: boolean;
  dailyForecastsError: any | null;
}
const initialState: PropsDailyForecasts = {
  dailyForecasts: null,
  dailyForecastsLoading: false,
  dailyForecastsOk: false,
  dailyForecastsError: null,
};
//Slice
const dailyForecastsSlice = createSlice({
  name: "dailyForecasts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Pending
    builder.addCase(fetchFiveDaysOfDaily.pending, (state, action) => {
      state.dailyForecastsLoading = true;
    });
    //Fulfilled
    builder.addCase(fetchFiveDaysOfDaily.fulfilled, (state, action) => {
      state.dailyForecasts = action?.payload;
      state.dailyForecastsLoading = false;
      state.dailyForecastsOk = true;
      state.dailyForecastsError = undefined;
    });
    //Rejected
    builder.addCase(fetchFiveDaysOfDaily.rejected, (state, action) => {
      state.dailyForecastsLoading = false;
      state.dailyForecasts = null;
      state.dailyForecastsOk = false;
      state.dailyForecastsError = action?.payload;
    });
  },
});

export default dailyForecastsSlice.reducer;
