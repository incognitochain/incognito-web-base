import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useEffect } from 'react';
import { useDarkModeManager } from 'state/user/hooks';

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

const backgroundRadialGradientElement = document.getElementById('background-radial-gradient');
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key as keyof typeof backgroundResetStyles] = value;
    }
  });

export default function RadialGradientByChainUpdater(): null {
  const { chainId } = useActiveWeb3React();
  const [darkMode] = useDarkModeManager();
  useEffect(() => {
    if (!backgroundRadialGradientElement) return;
    setBackground(backgroundResetStyles);
    const lightGradient = 'radial-gradient(150% 100% at 50% 100%, #4E504E 0%, #1E2121 50%, #191919 100%)';
    const darkGradient = 'radial-gradient(150% 100% at 50% 100%, #1A1A1A 0%, #1A1A1A 50%, #1A1A1A 100%)';
    backgroundRadialGradientElement.style.background = darkMode ? darkGradient : lightGradient;
  }, [darkMode, chainId]);
  return null;
}
