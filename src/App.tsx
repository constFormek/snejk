function App() {
  const cells = [];
  for (let i = 0; i < 20; i++) {
    cells.push(new Array());
    for (let j = 0; j < 20; j++) {
      cells[i][j] = <div data-x={i} data-y={j}></div>;
    }
  }

  return (
    <div className='gird'>
      {cells}
    </div>
  )
}

export default App
