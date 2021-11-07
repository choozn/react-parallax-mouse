import React from 'react';
interface Props {
    children: JSX.Element[] | JSX.Element;
    resetOnLeave?: boolean;
    useWindowMouseEvents?: boolean;
    inverted?: boolean;
    containerStyles?: React.CSSProperties;
    className?: string;
}
declare const MouseParallaxContainer: ({ children, resetOnLeave, useWindowMouseEvents, inverted, containerStyles, className }: Props) => JSX.Element;
export default MouseParallaxContainer;
