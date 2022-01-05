import { FC } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

//Imports projects
import { StyledSearchComp } from "./SearchComp.style";
import useSearch from "../../../../hooks/useSearch";

const SearchComp: FC = () => {
  const { weather, loading, setTerm, handleSelect } = useSearch();

  return (
    <>
      <StyledSearchComp>
        <Autocomplete
          options={weather}
          getOptionLabel={(option: any) =>
            `${option.AdministrativeArea?.ID}, ${option.AdministrativeArea.LocalizedName}, ${option.Country?.ID}`
          }
          fullWidth
          loading={loading}
          onInputChange={(event, value) => setTerm(value)}
          onChange={(event, option) => handleSelect(event, option)}
          isOptionEqualToValue={(option: {}, value: {}) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Type for location"
              placeholder="Location"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </StyledSearchComp>
    </>
  );
};

export default SearchComp;
