import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Action
export const addToFavorites = createAsyncThunk(
  "favoritesWeather/fetch",
  async (payload: any, { rejectWithValue, getState, dispatch }) => {
    try {
      if (localStorage.getItem("favorites") === null) {
        localStorage.setItem("favorites", JSON.stringify([payload]));
        return [...payload];
      } else {
        let favorites: any;
        if ((localStorage.getItem("favorites") || "[]") === "[]") {
          localStorage.removeItem("favorites");
          favorites = [payload];
          localStorage.setItem("favorites", JSON.stringify(favorites));
          return favorites;
        } else
          favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        const index = favorites.findIndex((f: any) => f.id === payload.id);
        const newFavorites = [...favorites];

        if (index >= 0) {
          newFavorites.splice(index, 1);
        } else {
          newFavorites.push(payload);
        }
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      }
    } catch (error: any) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

interface PropsFavoritesWeather {
  favoritesWeather: any;
  favoritesWeatherLoading: boolean;
  favoritesWeatherOk: boolean;
  favoritesWeatherError: any | null;
}
const initialState: PropsFavoritesWeather = {
  favoritesWeather: null,
  favoritesWeatherLoading: false,
  favoritesWeatherOk: false,
  favoritesWeatherError: null,
};
//Slice
const favoriteSlices = createSlice({
  name: "favoritesWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Pending
    builder.addCase(addToFavorites.pending, (state, action) => {
      state.favoritesWeatherLoading = true;
    });
    //Fulfilled
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.favoritesWeather = action?.payload;
      state.favoritesWeatherLoading = false;
      state.favoritesWeatherOk = true;
      state.favoritesWeatherError = undefined;
    });
    //Rejected
    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.favoritesWeatherLoading = false;
      state.favoritesWeather = null;
      state.favoritesWeatherOk = false;
      state.favoritesWeatherError = action?.payload;
    });
  },
});

export default favoriteSlices.reducer;
