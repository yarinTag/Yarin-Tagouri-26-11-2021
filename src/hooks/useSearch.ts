import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "../redux/slices/currentSlices";
import { fetchFiveDaysOfDaily } from "../redux/slices/dailyForecastsSliceSlices";
import { fetchAutoCompleteLocations } from "../redux/slices/weatherSlices";

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

  const onInputChange = () => {
    if (term.length >= 2) {
      dispatch(fetchAutoCompleteLocations(term));
    }
  };

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
    const timeOutId = setTimeout(() => onInputChange(), 500);

    return () => clearTimeout(timeOutId);
  }, [term]);

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
