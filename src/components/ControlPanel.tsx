import "@/components/ControlPanel.css"
import bomb from "@/assets/bomb.svg";
import {useEffect, useState} from "react";
import {GameState} from "@/components/Minesweeper.tsx";

interface ControlPanelProps {
  gameState: GameState;
  minesToFlag: number;
  changeGameState: (gameState: GameState) => void;
}

export const ControlPanel = ({gameState, minesToFlag, changeGameState}: Readonly<ControlPanelProps>) => {

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameState === 'running') {
      const intervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [gameState]);

  const reset = () => {
    changeGameState('initial');
    setTime(0);
  }

  const stateEmoji = gameState === 'won' ? '🥳 ' : gameState === 'lost' ? '🙁 '
          : gameState === 'running' ? '😍 ': '😀 ';

  return (
      <div className="control-panel">
        <div>
          <img src={bomb} className="mini-logo" alt="bomb"/>
          <span className="mines-counter">&nbsp;{minesToFlag}</span>
        </div>
        <button className="reset" onClick={reset}>{stateEmoji}</button>
        <span className="timer">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
      </div>
  )
}
