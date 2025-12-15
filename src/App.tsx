import { useEffect, useRef, useState } from "react";

type directions = "up" | "down" | "left" | "right";

function App() {
   const [headCoords, setHeadCoords] = useState({
    x: 10,
    y: 10,
  });
  const [direction, setDirection] = useState<directions>("up");
  const [bodyArr, setBodyArr] = useState<{x: number, y: number}[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const directionRef = useRef(direction);
  const headRef = useRef(headCoords);
  
  const cells: number[][] = [];

  for (let i = 0; i < 20; i++) {
      cells.push(new Array<number>());
      for (let j = 0; j < 20; j++) {
        cells[i][j] = -1;
      }
    }

    const directionTest = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };

    const move = () => {
      console.log(directionRef.current);
      const trueDirection = directionTest[directionRef.current];
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (cells[i][j] == 0) {
            console.log(i, j, trueDirection);
          }
        }
      }
      console.log(cells);
    };

    cells[headCoords.x][headCoords.y] = 0;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("keydown", (e) => {
        console.log(e.key)
        switch (e.key) {
          case "w":
          case "ArrowUp":
            setDirection("up");
            break;
          case "s":
          case "ArrowDown":
            setDirection("down");
            break;
          case "a":
          case "ArrowLeft":
            setDirection("left");
            break;
          case "d":
          case "ArrowRight":
            setDirection("right");
            break;
        }
      });
    }

  const interval = setInterval(() => {
    move();
  }, 1000);
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction])

  return <canvas tabIndex={0} id="canvas" width={800} height={800} ref={canvasRef} />;
}

export default App;
