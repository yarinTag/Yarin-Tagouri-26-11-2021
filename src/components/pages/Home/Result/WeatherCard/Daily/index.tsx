import { FC } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";

//Imports Projects
import DailyItem from "./DailyItem";
import { DailyForecastsProps } from "../../../../../../types";

const Daily: FC<DailyForecastsProps | any> = ({ dailyForecasts }) => {
  const { weather } = useSelector((state: any) => state.weatherReducer);

  return (
    <>
      {dailyForecasts && weather[0] ? (
        <Container>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {dailyForecasts.map((day: any) => (
              <DailyItem key={day.epochDate} day={day} />
            ))}
          </Grid>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default Daily;
