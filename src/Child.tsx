import React from 'react';
import { SpringHelperConfig } from 'react-motion-prefixed';
import { Middleware } from './interfaces';

interface Props {
  factorX?: number;
  factorY?: number;
  springConfig?: SpringHelperConfig;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  updateStyles?: Middleware | React.CSSProperties;
  inverted?: boolean;
}

const MouseParallaxChild = ({ children }: Props) => <> {children} </>;

export default MouseParallaxChild;
