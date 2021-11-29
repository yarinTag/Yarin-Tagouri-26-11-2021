import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";

//Imports Projects
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
    <Grid item>
      <Card onClick={onPress}>
        <CardContent sx={{ minWidth: 200 }}>
          <CardHeader
            title={favo.location}
            subheader={favo.description}
            sx={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}
          />
          <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
            {favo.temp.celsius} °
          </Typography>
          <CardMedia component="img" sx={{ width: 150 }} image={favo.icon} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default FavoriteCard;
