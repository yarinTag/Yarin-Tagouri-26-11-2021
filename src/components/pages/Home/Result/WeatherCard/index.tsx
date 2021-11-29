import { FC } from "react";

//Imports Projects
import Current from "./Current";
import Daily from "./Daily";
import {
  AutoWeatherProps,
  CurrentWeatherProps,
  DailyForecastsProps,
} from "../../../../../types";
import { Card, CardContent, Grid } from "@mui/material";

interface WeatherCardProps {
  dailyForecasts: DailyForecastsProps | any;
  weather: AutoWeatherProps;
  currentWeather: CurrentWeatherProps;
}
const WeatherCard: FC<WeatherCardProps> = ({
  dailyForecasts,
  currentWeather,
  weather,
}) => {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Current weather={weather} currentWeather={currentWeather} />

          <Daily dailyForecasts={dailyForecasts} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
