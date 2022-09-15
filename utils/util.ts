export const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {width: innerWidth, height: innerHeight};
  }