import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    /** reset.css */
    ${reset}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: "Noto Sans KR", sans-serif !important;
    }
    
    body {
        overflow-x: hidden;
    };

    a {
        text-decoration: none;
    }

`;

export default GlobalStyle;
