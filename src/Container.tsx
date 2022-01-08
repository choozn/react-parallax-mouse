import React, { useCallback, useEffect, useState } from 'react';
import { Motion, spring } from 'react-motion';

interface Props {
    children: JSX.Element[] | JSX.Element;
    resetOnLeave?: boolean;
    useWindowMouseEvents?: boolean;
    inverted?: boolean;
    containerStyles?: React.CSSProperties;
    className?: string;
    globalFactorX?: number;
    globalFactorY?: number;
    disableCSSTransition?: boolean;
    enabled?: boolean;
}

// Helper function to check if a variable is a function
const isFunction: (value: any) => boolean = value => value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function);

const MouseParallaxContainer = ({ children, resetOnLeave, useWindowMouseEvents, inverted, containerStyles, className, globalFactorX = 1, globalFactorY = 1, disableCSSTransition, enabled = true }: Props) => {

    // Convert one-child cases into one dimensional array to map over
    if (!Array.isArray(children))
        children = [children];

    const [offset, setOffset] = useState<[number, number]>([0, 0]);
    // Container reference with callback to use it inside of useEffect
    const [containerRef, setContainerRef] = useState<{ current: HTMLDivElement | null }>({ current: null });
    const containerRefWithCallback = useCallback(node => { if (node !== null) { setContainerRef({ current: node }); } }, []);

    const getMousePosition = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {

        var rect = (containerRef.current) ? containerRef.current.getBoundingClientRect() : { left: 0, top: 0 };
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

    }, [containerRef])

    const mouseMovementHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
        if (containerRef.current) {
            var containerHeight = containerRef.current.clientHeight;
            var containerWidth = containerRef.current.clientWidth;
            var mousePosition = getMousePosition(e);
            var relativeToCenter: [number, number] = [
                containerWidth / 2 - mousePosition.x,
                containerHeight / 2 - mousePosition.y
            ];
            setOffset(relativeToCenter);
        }
    }, [containerRef, getMousePosition, inverted]);

    // Use window event handler when useWindowMouseEvents is enabled
    useEffect(() => {
        if (useWindowMouseEvents && enabled && containerRef.current) {
            window.addEventListener('mousemove', mouseMovementHandler, false);
            if (resetOnLeave)
                window.addEventListener('mouseout', () => setOffset([0, 0]), false);
        }
        return () => {
            window.removeEventListener('mousemove', mouseMovementHandler);
            if (resetOnLeave)
                window.removeEventListener('mouseout', () => setOffset([0, 0]), false);
        }
    }, [containerRef, mouseMovementHandler, resetOnLeave, useWindowMouseEvents, enabled]);

    return (
        <>
            <div
                className={(className) && className}
                id="mouse-parallax-container"
                style={{ overflow: 'hidden', position: 'relative', ...containerStyles }}
                ref={containerRefWithCallback}
                onMouseMove={(enabled && !useWindowMouseEvents) ? mouseMovementHandler : () => { }}
                onMouseLeave={(enabled && !useWindowMouseEvents && resetOnLeave) ? (() => setOffset([0, 0])) : () => { }}
            >
                {
                    (children.map((child, index) => (
                        (child) && (

                            // Using react-motion to smooth the transition
                            <Motion key={child.key || index} style={
                                (enabled) ?
                                    {
                                        x: spring(
                                            offset[0]
                                            * (child.props.factorX || 0)
                                            * globalFactorX
                                            * ((child.props.inverted) ? -1 : 1)
                                            * ((inverted) ? -1 : 1)
                                            , child.props.springConfig
                                        ),

                                        y: spring(
                                            offset[1]
                                            * (child.props.factorY || 0)
                                            * globalFactorY
                                            * ((child.props.inverted) ? -1 : 1)
                                            * ((inverted) ? -1 : 1)
                                            , child.props.springConfig
                                        )
                                    }
                                    :
                                    { x: 0, y: 0 }
                            }>

                                {springOffset => {

                                    // updateStyles Injection
                                    var [transition, transform, rest] = ["", "", {}];

                                    if (child.props.updateStyles) {
                                        if (isFunction(child.props.updateStyles))
                                            // Middleware Function
                                            ({ transition="", transform="", ...rest } = child.props.updateStyles(
                                                {
                                                    "container": (containerRef.current) ? { x: containerRef.current.clientWidth, y: containerRef.current.clientHeight } : { x: 0, y: 0 },
                                                    "px": springOffset,
                                                    "percentage": (containerRef.current) ? { x: springOffset.x / containerRef.current.clientWidth * 2 * 100, y: springOffset.y / containerRef.current.clientHeight * 2 * 100 } : { x: 0, y: 0 }
                                                }
                                            ));
                                        else
                                            // Extract modified properties from styles
                                            ({ transition="", transform="", ...rest } = child.props.updateStyles);
                                    }

                                    // Combine changes of the properties with additional styles from updateStyles
                                    let transitionStyle = `${(!disableCSSTransition) && "transform 1e-7s linear"}${(transition) && ", "}${transition}`;
                                    let transformStyle = `translateX(${springOffset.x}px) translateY(${springOffset.y}px) ${transform}`;

                                    // Combine all styles into one style object; Reduce unnecessary CSS styles
                                    let childStyle = {
                                        ...((child.props.factorX || child.props.factorY) ? {
                                            willChange: "transform",
                                            transition: transitionStyle, WebkitTransition: transitionStyle, msTransition: transitionStyle,
                                            transform: transformStyle, WebkitTransform: transformStyle, msTransform: transformStyle
                                        } : (child.props.updateStyles) ? {
                                            transition: transition, WebkitTransition: transition, msTransition: transition,
                                            transform: transform, WebkitTransform: transform, msTransform: transform,
                                        } : {}),
                                        ...rest
                                    }

                                    // Render child in container if needed
                                    return (

                                        ((child.props.factorX || child.props.factorY) || (child.props.className || child.props.updateStyles) && child.type.name === "MouseParallaxChild")
                                            ?
                                            <div
                                                className={(child.props.className) && child.props.className}
                                                style={childStyle}
                                            >
                                                {child}
                                            </div>
                                            :
                                            <>
                                                {child}
                                            </>

                                    )

                                }}

                            </Motion>

                        )
                    )))
                }
            </div>
        </>
    );

}

export default MouseParallaxContainer;