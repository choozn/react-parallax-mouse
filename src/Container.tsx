import React, { useCallback, useEffect, useState } from "react";
import { SpringConfig, useSpring } from "react-spring";
import { OffsetContext } from "./Context";
import { defaultSpring } from "./defaults";
import { Position } from "./interfaces";

interface Props {
  globalFactorX?: number;
  globalFactorY?: number;
  resetOnLeave?: boolean;
  useWindowMouseEvents?: boolean;
  inverted?: boolean;
  springConfig?: SpringConfig;
  enabled?: boolean;
  containerStyle?: React.CSSProperties;
  className?: string;
  children: JSX.Element[] | JSX.Element;
}

const MouseParallaxContainer = ({
  globalFactorX = 1,
  globalFactorY = 1,
  resetOnLeave,
  useWindowMouseEvents,
  inverted,
  springConfig,
  enabled = true,
  containerStyle,
  className,
  children,
}: Props) => {
  const [offset, offsetApi] = useSpring(() => ({
    ...defaultSpring,
    ...(springConfig ? { config: springConfig } : {}),
  }));
  const resetOffset = () => offsetApi.start(defaultSpring);

  const [containerRef, setContainerRef] = useState<{
    current: HTMLDivElement | null;
  }>({ current: null });
  const containerRefWithCallback = useCallback((node: any) => {
    if (node !== null) {
      setContainerRef({ current: node });
    }
  }, []);

  const getMousePosition = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
    ): Position => {
      const rect = containerRef.current
        ? containerRef.current.getBoundingClientRect()
        : { left: 0, top: 0 };
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    },
    [containerRef]
  );

  const mouseMovementHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const containerWidth = containerRef.current.clientWidth;
        const mousePosition = getMousePosition(event);
        const offsetRelativeToCenter: Position = {
          x:
            (containerWidth / 2 - mousePosition.x) *
            globalFactorX *
            (inverted ? -1 : 1),
          y:
            (containerHeight / 2 - mousePosition.y) *
            globalFactorY *
            (inverted ? -1 : 1),
        };
        offsetApi.start(offsetRelativeToCenter);
      }
    },
    [containerRef, getMousePosition, inverted]
  );

  // Use window event handler when useWindowMouseEvents is enabled
  useEffect(() => {
    if (enabled && useWindowMouseEvents && containerRef.current) {
      window.addEventListener("mousemove", mouseMovementHandler, false);
      if (resetOnLeave) {
        window.addEventListener("mouseout", resetOffset, false);
      }
    }
    return () => {
      if (enabled && useWindowMouseEvents && containerRef.current) {
        window.removeEventListener("mousemove", mouseMovementHandler, false);
        if (resetOnLeave) {
          window.removeEventListener("mouseout", resetOffset, false);
        }
      }
    };
  }, [
    containerRef,
    mouseMovementHandler,
    resetOnLeave,
    useWindowMouseEvents,
    enabled,
  ]);

  return (
    <OffsetContext.Provider value={offset}>
      <div
        className={className && className}
        id="mouse-parallax-container"
        style={{ overflow: "hidden", position: "relative", ...containerStyle }}
        ref={containerRefWithCallback}
        onMouseMove={
          enabled && !useWindowMouseEvents
            ? mouseMovementHandler
            : () => undefined
        }
        onMouseLeave={
          enabled && !useWindowMouseEvents && resetOnLeave
            ? () => offsetApi.start(defaultSpring)
            : () => undefined
        }
      >
        {children}
      </div>
    </OffsetContext.Provider>
  );
};

export { MouseParallaxContainer };
