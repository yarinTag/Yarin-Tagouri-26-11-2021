import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";

//Imports Projects
import TemperComp from "../TemperComp";
import paths from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { fetchCurrentWeather } from "../../redux/slices/currentSlices";
import { fetchFiveDaysOfDaily } from "../../redux/slices/dailyForecastsSliceSlices";
import { fetchAutoCompleteLocations } from "../../redux/slices/weatherSlices";

interface FavoriteProps {
  favo: any;
}
const FavoriteCard: FC<FavoriteProps> = ({ favo }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(fetchAutoCompleteLocations(favo.location));
    dispatch(fetchCurrentWeather(favo.id));
    dispatch(fetchFiveDaysOfDaily(favo.id));
    navigate(paths.HOME, favo);
  };
  return (
    <div>
      <Card onClick={onPress}>
        <CardHeader title={favo.location} subheader={favo.description} />
        <CardContent>
          <TemperComp temper={favo.temp.celsius} />
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={favo.icon}
          alt="Live from space album cover"
        />
      </Card>
    </div>
  );
};

export default FavoriteCard;
