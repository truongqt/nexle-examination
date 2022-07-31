import { Dimensions, Platform } from 'react-native';

const designWidth = 375;

let device = {
  w: Dimensions.get('window').width,
  h: Dimensions.get('window').height,
  designWidth: designWidth,
  s: Dimensions.get('window').width / designWidth,
};
const screenHeight = Dimensions.get('window').height;
const scale = (size: number) => {
  return Math.round(size * device.s);
};

const isIos = () => {
  return Platform.OS == 'ios';
};

export {
  device,
  scale,
  isIos,
  screenHeight,
};
