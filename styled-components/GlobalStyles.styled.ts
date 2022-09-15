import { createGlobalStyle } from 'styled-components'
import { device } from '../utils/devices'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GandhiSerifBold';
    src: url('/fonts/GandhiSerif-Bold.otf');
  }
  @font-face {
    font-family: 'GandhiSerifBoldItalic';
    src: url('/fonts/GandhiSerif-BoldItalic.otf');
  }
  @font-face {
    font-family: 'GandhiSerifItalic';
    src: url('/fonts/GandhiSerif-Italic.otf');
  }
  @font-face {
    font-family: 'GandhiSerifRegular';
    src: url('/fonts/GandhiSerif-Regular.otf');
  }


  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.backgrounds.primary};
    background-size: 600% 600%;
    overflow: hidden;
    padding: 0;
    margin: 0;
    font-family: Lato;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }
  @media ${device.laptop} {
    overflow: hidden;
  }
  @media ${device.laptopL} {
    overflow: hidden;
  }
  @media ${device.desktop} {
    overflow: hidden;
  }
  @media ${device.desktopL} {
    overflow: hidden;
  }
@media screen and (max-width: 1024px) {
  html,
  body {
    overflow-y: auto;
  }

  .circle-one {
    display: none;
  }

  .circle-two {
    display: none;
  }
}

.circle-one {
  background-color: ${({ theme }) => theme.colors.spheres};
  height: 20vh;
  width: 20vw;
  border-radius: 80%;
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0.13;
  filter: blur(157px);
  animation: AnimationName 50s ease-in-out infinite;
  z-index: 0;
}

.circle-two {
  background-color: ${({ theme }) => theme.colors.spheres};
  height: 20vh;
  width: 20vw;
  top: 0;
  right: 0;  
  opacity: 0.13;
  filter: blur(157px);
  border-radius: 80%;
  position: absolute;
  animation: CircleTwo 60s ease-in-out infinite;
  z-index: 0;
}

@-webkit-keyframes AnimationName {
  0% {
    top: 0%;
    left: 0%;
  }

  25% {
    left: 90%;
    top: 0;
  }

  50% {
    left: 90%;
    top: 90%;
  }

  75% {
    left: 0;
    top: 90%;
  }

  100% {
    top: 0%;
    left: 0%;
  }
}

@-moz-keyframes AnimationName {
  0% {
    top: 0%;
    left: 0%;
  }

  25% {
    left: 90%;
    top: 0;
  }

  50% {
    left: 90%;
    top: 90%;
  }

  75% {
    left: 0;
    top: 90%;
  }

  100% {
    top: 0%;
    left: 0%;
  }
}

@keyframes AnimationName {
  0% {
    top: 0%;
    left: 0%;
  }

  25% {
    left: 90%;
    top: 0;
  }

  50% {
    left: 90%;
    top: 90%;
  }

  75% {
    left: 0;
    top: 90%;
  }

  100% {
    top: 0%;
    left: 0%;
  }
}


@-webkit-keyframes CircleTwo {
  0% {
    top: 90%;
    left: 0;
  }

  25% {
    left: 90%;
    top: 90%;
  }

  50% {
    left: 90%;
    top: 0;
  }

  75% {
    left: 0;
    top: 90%;
  }

  100% {
    left: 0;
    top: 90%;
  }
}

@-moz-keyframes CircleTwo {
  0% {
    top: 90%;
    left: 0;
  }

  25% {
    top: 0%;
    left: 0%;
  }

  50% {
    left: 90%;
    top: 0;
  }

  75% {
    left: 90%;
    top: 90%;
  }

  100% {
    left: 0;
    top: 90%;
  }
}

@keyframes CircleTwo {
  0% {
    top: 90%;
    left: 0;
  }

  25% {
    top: 0%;
    left: 0%;
  }

  50% {
    left: 90%;
    top: 0;
  }

  75% {
    left: 90%;
    top: 90%;
  }

  100% {
    left: 0;
    top: 90%;
  }
}


@-webkit-keyframes BackgroundSphere {
  0% {
    top: 10%;
    left: 0;
  }

  25% {
    top: 10%;
    left: 50%;
  }

  50% {
    top: 50%;
    left: 50%;
  }

  75% {
    top: 50%;
    left: 0;
  }

  100% {
    top: 10%;
    left: 0;
  }
}

@-moz-keyframes BackgroundSphere {
  0% {
    top: 10%;
    left: 0;
  }

  25% {
    top: 10%;
    left: 50%;
  }

  50% {
    top: 50%;
    left: 50%;
  }

  75% {
    top: 50%;
    left: 0;
  }

  100% {
    top: 10%;
    left: 0;
  }
}

@keyframes BackgroundSphere {
  0% {
    top: 10%;
    left: 0;
  }

  25% {
    top: 10%;
    left: 50%;
  }

  50% {
    top: 50%;
    left: 50%;
  }

  75% {
    top: 50%;
    left: 0;
  }

  100% {
    top: 10%;
    left: 0;
  }
}


`

export default GlobalStyle