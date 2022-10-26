import { createContext, useContext } from "react";
import { defaultSpringValue } from "./defaults";
import { SpringPosition } from "./interfaces";

// Parallax Context
export const OffsetContext = createContext<SpringPosition>(defaultSpringValue);
export const useParallaxOffset = () => useContext(OffsetContext);
