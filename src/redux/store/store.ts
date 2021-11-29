import { configureStore } from "@reduxjs/toolkit";
import currentSlices from "../slices/currentSlices";
import dailyForecastsSliceSlices from "../slices/dailyForecastsSliceSlices";
import weatherReducer from "../slices/weatherSlices";
import favoriteSlices from "../slices/favoriteSlices";
import themeSlices from "../slices/themeSlices";

const store = configureStore({
  reducer: {
    weatherReducer,
    dailyForecastsSliceSlices,
    currentSlices,
    favoriteSlices,
    themeSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
