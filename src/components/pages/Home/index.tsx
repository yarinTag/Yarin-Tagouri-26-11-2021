import { FC } from "react";
import { useSelector } from "react-redux";

//import projects
import Result from "./Result";
import SearchComp from "./SearchComp";
import { StyledHome } from "./Home.style";
import WeatherCard from "./Result/WeatherCard";

const HomePage: FC = () => {
  const { weather, loading } = useSelector(
    (state: any) => state.weatherReducer
  );
  const { dailyForecasts } = useSelector(
    (state: any) => state.dailyForecastsSliceSlices
  );

  return (
    <StyledHome>
      <SearchComp />
      <Result
        loading={loading}
        notFound={"No location selected"}
        locationFound={weather !== null}
      >
        <WeatherCard dailyForecasts={dailyForecasts} />
      </Result>
    </StyledHome>
  );
};

export default HomePage;
