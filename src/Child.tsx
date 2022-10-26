import React, { useCallback } from 'react';
import { animated } from 'react-spring';
import { useParallaxOffset } from './Context';
import { SpringPosition } from './interfaces';

interface Props {
  factorX?: number;
  factorY?: number;
  inverted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
}

const MouseParallaxChild = ({ factorX = 1, factorY = 1, inverted = false, className, style, children }: Props) => {
  const offset = useParallaxOffset();
  const calculateChildOffset = useCallback(
    (offset: SpringPosition) => {
      const calcX = (x: number) => x * factorX * (inverted ? -1 : 1);
      const calcY = (y: number) => y * factorY * (inverted ? -1 : 1);
      return { x: offset.x.to(calcX), y: offset.y.to(calcY) };
    },
    [factorX, factorY]
  );

  return (
    <>
      <animated.div {...(className && { className })} {...(style && { styles: style })} style={calculateChildOffset(offset)}>
        {children}
      </animated.div>
    </>
  );
};

export { MouseParallaxChild };
