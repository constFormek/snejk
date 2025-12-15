import { useEffect, useRef, useState } from "react";

type directions = "up" | "down" | "left" | "right";

function App() {
  const [headCoords, setHeadCoords] = useState({
    x: 5,
    y: 10,
  });
  const [direction, setDirection] = useState<directions>("up");
  const [bodyArr, setBodyArr] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 11 },
    { x: 5, y: 12 },
    { x: 5, y: 13 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const directionRef = useRef(direction);
  const headRef = useRef(headCoords);
  const bodyArrRef = useRef(bodyArr);

  const directionTest = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const move = () => {
    const trueDirection = directionTest[directionRef.current];
    const newHeadCoords = {
      x: headRef.current.x + trueDirection.x,
      y: headRef.current.y + trueDirection.y,
    };
    if (newHeadCoords.x >= 20) return;
    if (newHeadCoords.y >= 20) return;
    if (newHeadCoords.x < 0) return;
    if (newHeadCoords.y < 0) return;

    let newBodyArr: { x: number; y: number }[] = [];
    newBodyArr.push(Object.assign({}, headRef.current));
    for (let i = 0; i < bodyArrRef.current.length - 1; i++) {
      newBodyArr.push(bodyArrRef.current[i]);
    }
    setBodyArr(newBodyArr);

    headCoords.x = newHeadCoords.x;
    headCoords.y = newHeadCoords.y;

    console.log(bodyArrRef.current)
    console.log(headRef.current);
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("keydown", (e) => {
        console.log(e.key);
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
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    headRef.current = headCoords;
  }, [headCoords]);

  useEffect(() => {
    bodyArrRef.current = bodyArr;
  }, [bodyArr]);

  let ctx: CanvasRenderingContext2D | null;
  if (canvasRef.current) {
    if (canvasRef.current.getContext("2d")) {
      ctx = canvasRef.current.getContext("2d");
    }
  }
  const drawCanvas = () => {
    if (!ctx) return;
    ctx.reset();

    ctx.fillStyle = "white";
    ctx.fillRect(headRef.current.x * 40, headRef.current.y * 40, 40, 40);

    ctx.fillStyle = "rgb(255 255 255 / 75%)";
    bodyArrRef.current.forEach((cell) => {
      ctx?.fillRect(cell.x * 40, cell.y * 40, 40, 40);
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
      if (canvasRef.current.getContext("2d")) {
        ctx = canvasRef.current.getContext("2d");
      }
    }
    const interval = setInterval(() => {
      drawCanvas();
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <canvas
      autoFocus
      tabIndex={0}
      id="canvas"
      width={800}
      height={800}
      ref={canvasRef}
    />
  );
}

export default App;
