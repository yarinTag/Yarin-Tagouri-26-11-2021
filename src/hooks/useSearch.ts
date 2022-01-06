import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "../redux/slices/currentSlices";
import { fetchFiveDaysOfDaily } from "../redux/slices/dailyForecastsSliceSlices";
import { addToFavorites } from "../redux/slices/favoriteSlices";
import { fetchAutoCompleteLocations } from "../redux/slices/weatherSlices";
import { FavoriteWeatherProps } from "../types";

const useSearch = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  const { weather, loading } = useSelector(
    (state: any) => state.weatherReducer
  );
  const { dailyForecasts } = useSelector(
    (state: any) => state.dailyForecastsSliceSlices
  );
  const { currentWeather } = useSelector((state: any) => state.currentSlices);

  const onInputChange = useCallback(() => {
    if (term.length >= 2) {
      dispatch(fetchAutoCompleteLocations(term));
    }
  }, [term, dispatch]);

  const handleSelect = (event: React.SyntheticEvent, option: any) => {
    if (option !== null) {
      setTerm(option?.LocalizedName);
      if (option?.Key) {
        dispatch(fetchCurrentWeather(option?.Key));
        dispatch(fetchFiveDaysOfDaily(option?.Key));
      }
    } else {
      dispatch(fetchAutoCompleteLocations(null));
      dispatch(fetchCurrentWeather(null));
      dispatch(fetchFiveDaysOfDaily(null));
    }
  };

  useEffect(() => {
    dispatch(fetchAutoCompleteLocations("Tel Aviv"));
    dispatch(fetchCurrentWeather("215854"));
    dispatch(fetchFiveDaysOfDaily("215854"));
    if (!localStorage.getItem("favorites")) {
      const favo: FavoriteWeatherProps = {
        description: "Cloudy",
        icon: "https://vortex.accuweather.com/adc2010/images/slate/icons/7.svg",
        id: "215854",
        location: "Tel Aviv",
        temp: { celsius: 20.6, fahrenheit: 69 },
      };
      dispatch(addToFavorites(favo));
    }
  }, [dispatch]);

  useEffect(() => {
    const timeOutId = setTimeout(() => onInputChange(), 500);

    return () => clearTimeout(timeOutId);
  }, [term, onInputChange]);

  return {
    weather,
    loading,
    setTerm,
    handleSelect,
    dailyForecasts,
    currentWeather,
  };
};

export default useSearch;
