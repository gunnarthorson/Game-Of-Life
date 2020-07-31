import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { templates } from './Cells';
import Sliders from './Slider';

const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function Grid() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const [gen, setGen] = useState(0);
  const [value, setValue] = useState(300);

  const genRef = useRef();
  genRef.current = gen;

  const runningRef = useRef(running);
  runningRef.current = running;

  const speedRef = useRef(value);
  speedRef.current = value;

  function handleChange(e) {
    setValue(parseInt(e.target.ariaValueNow, 10));
  }


  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGen((genRef.current += 1));
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speedRef.current);
  }, []);

  return (
    <>
    <div className="buttons">
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        Random
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        Clear
      </button>
      <select
            onChange={(e) => {
              e.preventDefault();
              setGen(0);
              setGrid(templates[e.target.value]);
            }}
          >
<option>Select a Template</option>
            <option>pulsar</option>
            <option>figure8</option>
            <option>clover</option>
          </select>
          <Sliders handleChange={handleChange}/>
          </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "skyblue" : undefined,
                border: "solid 1.2px skyblue"
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid;


