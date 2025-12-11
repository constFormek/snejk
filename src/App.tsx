import { use, useEffect, useRef, useState } from "react";

type directions = 
| "up"
| "down"
| "left"
| "right";

function App() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cells = [];
  const [direction, setDirection] = useState<directions>("up");
  const [headCoords, setHeadCoords] = useState({
    x: 10,
    y: 10,
  });

  for (let i = 0; i < 20; i++) {
    cells.push(new Array());
    for (let j = 0; j < 20; j++) {
      cells[i][j] = <div className="cell" key={`${i}${j}`} data-x={i} data-y={j}></div>;
    }
  }

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.addEventListener("keydown", (e) => {
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
      })
    }

    const move = () => {

    }

    setInterval(() => {
      
    }, 500);
  }, []);

  return (
    <div className='gird' ref={gridRef}>
      {cells}
    </div>
  )
}

export default App
