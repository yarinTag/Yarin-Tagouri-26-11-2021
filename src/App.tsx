import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "styled-components";

import {
  createTheme,
  ThemeProvider as MuiProvider,
} from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import { useSelector } from "react-redux";
import GlobalStyle from "./shared/Style";

function App() {
  const { themeControl } = useSelector((state: any) => state.themeSlices);
  const theme = createTheme({
    palette: {
      mode: themeControl ? "dark" : "light",
    },
  });
  return (
    <MuiProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <Layout />
      </ThemeProvider>
    </MuiProvider>
  );
}

export default App;
