import { darkModeSelector } from '@theme/Theme.selector';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const initialStyles = {
  width: '200vw',
  height: '200vh',
  transform: 'translate(-50vw, -100vh)',
  backgroundBlendMode: '',
};
const backgroundResetStyles = {
  width: '100vw',
  height: '100vh',
  transform: 'unset',
  backgroundBlendMode: '',
};

type TargetBackgroundStyles = typeof initialStyles | typeof backgroundResetStyles;

const backgroundRadialGradientElement = document.getElementById(
  'background-radial-gradient',
);
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key as keyof typeof backgroundResetStyles] =
        value;
    }
  });

export default function GradientBG(): null {
  const darkMode = useSelector(darkModeSelector);
  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) return;
    setBackground(backgroundResetStyles);
    const lightGradient =
      'radial-gradient(150% 100% at 50% 100%, #4E504E 0%, #1E2121 50%, #191919 100%)';
    const darkGradient =
      'radial-gradient(150% 100% at 50% 100%, #4E504E 0%, #1E2121 50%, #191919 100%)';
    backgroundRadialGradientElement.style.background = darkMode
      ? darkGradient
      : lightGradient;
  }, [darkMode]);
  return null;
}
