import { FC } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import { isEmpty } from "lodash";

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
        locationFound={!isEmpty(favorites)}
      >
        <Container>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {favorites.map((favo: any) => (
              <FavoriteCard favo={favo} key={favo.id} />
            ))}
          </Grid>
        </Container>
      </Result>
    </>
  );
};

export default FavoritesPage;
