import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        font-family: 'Noto Sans KR';
        margin: 0;
        padding: 0;
        /* text-align: center; */
        box-sizing: border-box;
    }
  body {
    background-color: #121212;
    box-sizing: border-box;
  }
`;
export default GlobalStyles;
