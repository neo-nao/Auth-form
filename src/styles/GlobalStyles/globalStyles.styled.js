import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after{
  margin:0;
  padding:0;
  box-sizing:border-box;
  border:0;
  outline:0;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}

:root{
  --primary-font:'Montserrat',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --main-blue: #3561fe;
  --dark-blue: #222831;
  --light-dark-blue: #393E46;
  --main-blue-dark: #163abf;
  --secondary-blue: #00ADB5;
  --third-blue: #d4dbee;
  --light-blue: #f3f6ff;
  --main-gray: #999;
  --light-gray: #EEEEEE;
  --main-border-radius:1.25rem;
  --secondary-border-radius:1rem;
  --input-height:4rem;
  --button-height:3.75rem;
}

a{
  text-decoration:none;
  color: unset;
}

body,button,input{
    font-family: var(--primary-font);
    font-weight:500;
}

body{
  background-color:var(--third-blue);

  @media (max-width:450px){
    background-color:#fff;
  }
}
`;

export default GlobalStyles;
