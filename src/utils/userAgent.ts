import { UAParser } from 'ua-parser-js';

const parser = new UAParser(window.navigator.userAgent);
const { type } = parser.getDevice();

export const userAgent = parser.getResult();

export const isMobile = type === 'mobile' || type === 'tablet';

export const isIOS = () => {
  const userAgent = navigator.userAgent;

  let isIOS = false;
  if (/android/i.test(userAgent)) {
    isIOS = false;
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    isIOS = true;
  }

  return isIOS;
};
