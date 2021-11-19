import React from 'react';
import { SpringHelperConfig } from 'react-motion';
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
declare const MouseParallaxChild: ({ children }: Props) => JSX.Element;
export default MouseParallaxChild;
