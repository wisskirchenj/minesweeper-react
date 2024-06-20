import "@/components/ControlPanel.css"
import bomb from "@/assets/bomb.svg";
import React, {useEffect, useRef, useState} from "react";
import {GameState} from "@/components/Minesweeper.tsx";

interface ControlPanelProps {
  gameState: GameState,
  minesToFlag: number,
  changeGameState: (gameState: GameState) => void,
  setMines: (value: number) => void
}

export const ControlPanel = ({gameState, minesToFlag, changeGameState, setMines}: Readonly<ControlPanelProps>) => {

  const [time, setTime] = useState(0);
  const [mineInput, setMineInput] = useState(minesToFlag.toString());
  const mineInputRef = useRef(mineInput);

  useEffect(() => {
    if (gameState === 'running') {
      const intervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [gameState]);

  useEffect(() => {
    if (minesToFlag.toString() !== mineInputRef.current) {
      setMineInput(minesToFlag.toString());
    }
  }, [minesToFlag]);

  const handleMinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setMineInput(newValue);
    mineInputRef.current = newValue;
    !isNaN(parseInt(newValue)) && setMines(parseInt(newValue));
  }

  const reset = () => {
    changeGameState('initial');
    setTime(0);
  }

  const stateEmoji = gameState === 'won' ? '🥳 ' : gameState === 'lost' ? '🙁 '
      : gameState === 'running' ? '😍 ' : '😀 ';

  return (
      <div className="control-panel">
        <div>
          <img src={bomb} className="mini-logo" alt="bomb"/>
          <input id="mineInput" value={mineInput} disabled={gameState === "running"}
                 onChange={handleMinesChange}></input>
        </div>
        <button className="reset" onClick={reset}>{stateEmoji}</button>
        <span className="timer">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
      </div>
  )
}
