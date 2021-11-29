import { FC } from "react";

//Imports Projects
import Current from "./Current";
import Daily from "./Daily";
import { DailyForecastsProps } from "../../../../../types";
import { Card, CardContent, Grid } from "@mui/material";

const WeatherCard: FC<DailyForecastsProps | any> = ({ dailyForecasts }) => {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Current />

          <Daily dailyForecasts={dailyForecasts} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
