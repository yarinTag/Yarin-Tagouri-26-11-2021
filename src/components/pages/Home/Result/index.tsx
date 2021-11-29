import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { CircularProgress, Container, Typography } from "@mui/material";
import { LoadingWrapper } from "./Result.style";

interface ResultProps {
  loading: boolean;
  notFound: string;
  locationFound?: boolean;
  children?: React.ReactNode;
}
const Result: FC<ResultProps> = ({
  loading,
  notFound,
  children,
  locationFound,
}) => {
  const { currentWeatherOk } = useSelector((state: any) => state.currentSlices);
  const { dailyForecastsOk } = useSelector(
    (state: any) => state.dailyForecastsSliceSlices
  );
  useEffect(() => {}, [dailyForecastsOk, currentWeatherOk]);
  return (
    <>
      <Container sx={{ width: "100%", margin: "25px 0px" }}>
        {locationFound && !loading && children}

        {!locationFound && !loading && (
          <Typography variant="h6" color="textSecondary">
            {notFound}
          </Typography>
        )}

        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      </Container>
    </>
  );
};

export default Result;
