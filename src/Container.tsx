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
}

// Helper Function to check if a Variable is a Function
const isFunction: (value: any) => boolean = value => value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function);

const MouseParallaxContainer = ({ children, resetOnLeave, useWindowMouseEvents, inverted, containerStyles, className, globalFactorX = 1, globalFactorY = 1 }: Props) => {

    // Convert one Child cases into one dimensional Array to map over
    if (!Array.isArray(children))
        children = [children];

    const [offset, setOffset] = useState([0, 0]);
    // Container Reference with Callback to use it inside of useEffect
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
            var relativeToCenter = [
                containerWidth / 2 - mousePosition.x,
                containerHeight / 2 - mousePosition.y
            ];
            if (inverted) relativeToCenter = [relativeToCenter[0] * -1, relativeToCenter[1] * -1];
            setOffset(relativeToCenter);
        }
    }, [containerRef, getMousePosition, inverted]);

    useEffect(() => {
        if (useWindowMouseEvents && containerRef.current) {
            window.addEventListener('mousemove', mouseMovementHandler, false);
            if (resetOnLeave)
                window.addEventListener('mouseout', () => setOffset([0, 0]), false);
        }
        return () => {
            window.removeEventListener('mousemove', mouseMovementHandler, false);
            if (resetOnLeave)
                window.removeEventListener('mouseout', () => setOffset([0, 0]), false);
        }
    }, [containerRef, mouseMovementHandler, resetOnLeave, useWindowMouseEvents]);

    return (
        <>
            <div
                className={(className) && className}
                id="mouse-parallax-container"
                style={{ overflow: 'hidden', position: 'relative', ...containerStyles }}
                ref={containerRefWithCallback}
                onMouseMove={(!useWindowMouseEvents) ? mouseMovementHandler : () => { }}
                onMouseLeave={(resetOnLeave && !useWindowMouseEvents) ? (() => setOffset([0, 0])) : () => null}
            >
                {children.map(
                    (child, index) => (
                        (child) && (

                            <Motion key={child.key || index} style={{
                                x: spring(offset[0], child.props.springConfig),
                                y: spring(offset[1], child.props.springConfig),
                            }}>
                                {animationOffset => {

                                    // Update Style Injection
                                    var [transition, transform, rest] = ["", "", {}];

                                    if (child.props.updateStyles) {
                                        if (isFunction(child.props.updateStyles))
                                            // Middleware Function
                                            ({ transition="", transform="", ...rest } = child.props.updateStyles(
                                                {
                                                    "container": (containerRef.current) ? { x: containerRef.current.clientWidth, y: containerRef.current.clientHeight } : { x: 0, y: 0 },
                                                    "px": animationOffset,
                                                    "percentage": (containerRef.current) ? { x: animationOffset.x / containerRef.current.clientWidth * 2 * 100, y: animationOffset.y / containerRef.current.clientHeight * 2 * 100 } : { x: 0, y: 0 }
                                                }
                                            ));
                                        else
                                            // CSS Style Object
                                            ({ transition="", transform="", ...rest } = child.props.updateStyles);
                                    }

                                    // Apply Styles to each Child
                                    return (
                                        <div
                                            className={(child.props.className) && child.props.className}
                                            style={
                                                {
                                                    willChange: "transform",
                                                    transition: `transform 1e-7s linear${(transition) && ", "}${transition}`,
                                                    transform: `translateX(${(animationOffset.x * (child.props.factorX || 0)) * globalFactorX}px) translateY(${(animationOffset.y * (child.props.factorY || 0)) * globalFactorY}px)${transform}`,
                                                    ...rest,
                                                }
                                            }>
                                            {child}
                                        </div>
                                    )

                                }}
                            </Motion>

                        )
                    )
                )}

            </div>
        </>
    );

}

export default MouseParallaxContainer;