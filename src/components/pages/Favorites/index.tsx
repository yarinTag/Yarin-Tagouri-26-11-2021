import { FC } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";

import Result from "../Home/Result";
import FavoriteCard from "../../../shared/FavoriteCard";

const FavoritesPage: FC = () => {
  const { favoritesWeatherLoading } = useSelector(
    (state: any) => state.favoriteSlices
  );
  const favorites: any = JSON.parse(localStorage.getItem("favorites") || "[]");
  return (
    <>
      <Result
        loading={favoritesWeatherLoading}
        notFound={"Not favorites added"}
        locationFound={favorites !== []}
      >
        <Container>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {favorites.map((favo: any) => (
              <Grid item xs={12} md={3} lg={2} key={favo.id}>
                <FavoriteCard favo={favo} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Result>
    </>
  );
};

export default FavoritesPage;
