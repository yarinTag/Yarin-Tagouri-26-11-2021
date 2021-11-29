import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import paths from "../../constants/constants";
import FavoritesPage from "../pages/Favorites";
import HomePage from "../pages/Home";
import Header from "./Header";

const Layout = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path={paths.HOME} element={<HomePage />} />

        <Route path={paths.FAVORITES} element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default Layout;
