import "@/components/ControlPanel.css"
import bomb from "@/assets/bomb.svg";
import {useEffect, useState} from "react";
import {TimerState} from "@/components/Minesweeper.tsx";

interface ControlPanelProps {
  timerState: TimerState;
  minesToFlag: number;
}

export const ControlPanel = ({timerState, minesToFlag}: Readonly<ControlPanelProps>) => {

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (timerState === 'running') {
      const intervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerState]);

  return (
      <div className="control-panel">
        <div>
          <img src={bomb} className="mini-logo" alt="bomb"/>
          <span className="mines-counter">&nbsp;{minesToFlag}</span>
        </div>
        <button className="reset">😀</button>
        <span className="timer">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
      </div>
  )
}
