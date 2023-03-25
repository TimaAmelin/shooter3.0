import { useRef, useEffect } from 'react';
import { gameStart } from '../../gameFunctions/main';

import './Canvas.css';

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (!context) return;
            gameStart(context, canvas);
        }       
    },[]);

    return <canvas className="canvas" ref={canvasRef} height={height} width={width} />;
};

export default Canvas;