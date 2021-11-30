import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body,
  html,
  #root {
    min-width: ${window.innerWidth};
    over-flow: hidden;
  }
`;

export default GlobalStyle;
