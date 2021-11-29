import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";

//Imports projects
import { StyledSearchComp } from "./SearchComp.style";
import { fetchCurrentWeather } from "../../../../redux/slices/currentSlices";
import { fetchFiveDaysOfDaily } from "../../../../redux/slices/dailyForecastsSliceSlices";
import { fetchAutoCompleteLocations } from "../../../../redux/slices/weatherSlices";

const SearchComp: FC = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const { weather, loading } = useSelector(
    (state: any) => state.weatherReducer
  );

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    if (value.length > 1) dispatch(fetchAutoCompleteLocations(value));
  };
  const handleSelect = (event: React.SyntheticEvent, option: any) => {
    dispatch(fetchAutoCompleteLocations(option?.LocalizedName));
    if (option?.Key) {
      dispatch(fetchCurrentWeather(option?.Key));
      dispatch(fetchFiveDaysOfDaily(option?.Key));
    }
  };

  useEffect(() => {
    if (weather) {
      setOptions(weather);
    }
  }, [weather]);

  return (
    <>
      <StyledSearchComp>
        <Autocomplete
          options={options}
          getOptionLabel={(option: any) =>
            `${option.AdministrativeArea?.ID}, ${option.AdministrativeArea.LocalizedName}, ${option.Country?.ID}`
          }
          fullWidth
          loading={loading}
          onInputChange={handleChange}
          onChange={handleSelect}
          isOptionEqualToValue={(option: {}, value: {}) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Type for location"
              placeholder="Location"
            />
          )}
        />
      </StyledSearchComp>
    </>
  );
};

export default SearchComp;
