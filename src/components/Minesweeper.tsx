import '@/components/Minesweeper.css'
import {ControlPanel} from "@/components/ControlPanel.tsx";
import {Field} from "@/components/Field.tsx";
import bomb from '@/assets/bomb.svg'
import {useState} from "react";
import {MINE_COUNT} from "@/model/fieldModel.ts";

export type TimerState = 'initial' | 'stopped' | 'running';

export const Minesweeper = () =>{
  const [timerState, setTimerState] = useState<TimerState>('initial')
  const [minesToFlag, setMinesToFlag] = useState(MINE_COUNT);

  const toggleTimerState = () => {
    // needs prev state retrieval, since it may be changed twice in one render cycle
    setTimerState(timerState => timerState === 'running' ? 'stopped' : 'running');
  }

  const changeMinesToFlag = (change: number) => {
    setMinesToFlag(minesToFlag + change);
  }

  return (
    <div className="Minesweeper">
      <header className="Minesweeper-header">
        <h2>Minesweeper&nbsp;&nbsp;</h2>
        <img src={bomb} className="Minesweeper-logo" alt="bomb"/>
      </header>
      <ControlPanel timerState={timerState} minesToFlag={minesToFlag}/>
      <Field
          timerState={timerState} toggleTimer={toggleTimerState}
          minesToFlag={minesToFlag} changeFlagged={changeMinesToFlag}
      />
    </div>
  )
}
