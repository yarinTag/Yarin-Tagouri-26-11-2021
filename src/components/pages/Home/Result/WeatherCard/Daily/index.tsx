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
          <Grid container spacing={3} columns={{ lg: 10, xl: 10, xs: 10 }}>
            {dailyForecasts.map((day: any, key: number) => (
              <Grid item xs={12} md={3} lg={2} key={key}>
                <DailyItem key={day.epochDate} day={day} />
              </Grid>
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
