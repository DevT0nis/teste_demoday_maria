import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

export default GlobalStyle;
