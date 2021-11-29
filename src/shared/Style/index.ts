import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body,
  html,
  #root {
    // height: 100%;
    // width: 100%;
    min-width: ${window.innerWidth};
    over-flow: hidden;
  }
`;

export default GlobalStyle;
