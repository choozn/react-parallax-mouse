export interface UpdateStyleProps {
    container: { x: number, y: number },
    px: { x: number, y: number },
    percentage: { x: number, y: number };
}

export type Middleware = ((offsetOfMouseToCenter: UpdateStyleProps) => React.CSSProperties);