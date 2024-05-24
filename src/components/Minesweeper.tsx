import '@/components/Minesweeper.css'
import {ControlPanel} from "@/components/ControlPanel.tsx";
import {Field} from "@/components/Field.tsx";
import bomb from '@/assets/bomb.svg'
import {useState} from "react";
import {FieldModel, initializeMineField, MINE_COUNT} from "@/model/fieldModel.ts";

export type GameState = 'initial' | 'won' | 'running' | 'lost';

export const Minesweeper = () =>{
  const [field, setField] = useState<FieldModel>(initializeMineField());
  const [gameState, setGameState] = useState<GameState>('initial')
  const [minesToFlag, setMinesToFlag] = useState(MINE_COUNT);

  const changeGameState = (newState: GameState) => {
    newState === 'initial' && resetGameState()
    setGameState(newState);
  }

  const changeMinesToFlag = (change: number) => {
    setMinesToFlag(minesToFlag + change);
  }

  const resetGameState = () => {
    setField(initializeMineField());
    setMinesToFlag(MINE_COUNT);
  }

  return (
    <div className="Minesweeper">
      <header className="Minesweeper-header">
        <h2>Minesweeper&nbsp;&nbsp;</h2>
        <img src={bomb} className="Minesweeper-logo" alt="bomb"/>
      </header>
      <ControlPanel gameState={gameState} minesToFlag={minesToFlag} changeGameState={changeGameState}/>
      <Field
          field={field} setField={setField}
          gameState={gameState} changeGameState={changeGameState}
          minesToFlag={minesToFlag} changeFlagged={changeMinesToFlag}
      />
    </div>
  )
}
