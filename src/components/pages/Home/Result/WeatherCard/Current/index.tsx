import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

//Imports Projects
import IconComp from "../../../../../../shared/IconComp";
import { addToFavorites } from "../../../../../../redux/slices/favoriteSlices";
import { CurrentDetails, StyledWTemper } from "./Current.style";

const Current: FC = () => {
  const dispatch = useDispatch();
  const { currentWeather } = useSelector((state: any) => state.currentSlices);
  const { weather } = useSelector((state: any) => state.weatherReducer);
  const { favoritesWeather } = useSelector(
    (state: any) => state.favoriteSlices
  );

  function handleChange() {
    const favorites = {
      id: weather[0].Key,
      location: weather[0].LocalizedName,
      description: currentWeather.description,
      icon: currentWeather.icon,
      temp: currentWeather.temp,
    };
    dispatch(addToFavorites(favorites));
  }
  function isInFavorites() {
    if (favoritesWeather) {
      const added = favoritesWeather.findIndex(
        (f: any) => f.id === weather[0].Key
      );
      if (added > 0) return true;
      else return false;
    } else if ((localStorage.getItem("favorites") || "[]") === "[]")
      return true;
    else {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      console.log("here");

      const added = favorites.findIndex((f: any) => f.id === weather[0].Key);
      if (added > 0) return true;
      else return false;
    }
  }
  function getTextHover(added: boolean): string {
    let title: string;
    if (added) title = "Remove from favorites";
    else title = "Add to favorites";
    return title;
  }

  return (
    <>
      {currentWeather && weather[0] ? (
        <>
          <CardHeader
            title={weather ? weather[0].LocalizedName : null}
            subheader={
              weather
                ? weather[0].Country.LocalizedName + "," + weather[0].Country.ID
                : null
            }
            action={
              <Tooltip title={getTextHover(isInFavorites())}>
                <Button
                  aria-label="add to favorites"
                  onClick={handleChange}
                  sx={{ color: isInFavorites() ? "red" : "gray" }}
                >
                  <FavoriteIcon />
                </Button>
              </Tooltip>
            }
          />
          <div>
            <CardMedia>
              <CurrentDetails>
                <Typography variant="h3">
                  {currentWeather ? currentWeather.description : null}
                </Typography>

                <IconComp src={currentWeather ? currentWeather.icon : null} />

                <StyledWTemper
                  temper={currentWeather ? currentWeather.temp.celsius : null}
                />
              </CurrentDetails>
            </CardMedia>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Current;
