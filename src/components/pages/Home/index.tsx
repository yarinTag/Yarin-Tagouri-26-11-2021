import { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import projects
import Result from "./Result";
import SearchComp from "./SearchComp";
import WeatherCard from "./Result/WeatherCard";
import { StyledHome } from "./Home.style";
import useSearch from "../../../hooks/useSearch";

const HomePage: FC = () => {
  const { weather, loading, dailyForecasts, currentWeather } = useSearch();

  return (
    <StyledHome>
      <SearchComp />
      <Result
        loading={loading}
        notFound={"No location selected"}
        locationFound={weather !== null && currentWeather !== null}
      >
        <WeatherCard
          dailyForecasts={dailyForecasts}
          weather={weather}
          currentWeather={currentWeather}
        />
      </Result>
      <ToastContainer />
    </StyledHome>
  );
};

export default HomePage;
