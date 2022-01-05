import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import projects
import Result from "./Result";
import SearchComp from "./SearchComp";
import WeatherCard from "./Result/WeatherCard";
import { StyledHome } from "./Home.style";
import useSearch from "../../../hooks/useSearch";

const HomePage: FC = () => {
  const dispatch = useDispatch();

  const { weather, loading, dailyForecasts, currentWeather } = useSearch();

  // useEffect(() => {
  //   dispatch(fetchAutoCompleteLocations("Tel Aviv"));
  //   dispatch(fetchCurrentWeather("215854"));
  //   dispatch(fetchFiveDaysOfDaily("215854"));
  //   if (!localStorage.getItem("favorites")) {
  //     const favo: FavoriteWeatherProps = {
  //       description: "Cloudy",
  //       icon: "https://vortex.accuweather.com/adc2010/images/slate/icons/7.svg",
  //       id: "215854",
  //       location: "Tel Aviv",
  //       temp: { celsius: 20.6, fahrenheit: 69 },
  //     };
  //     dispatch(addToFavorites(favo));
  //   }
  // }, []);
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
