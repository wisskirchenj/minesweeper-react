import '@/components/Minesweeper.css'
import {ControlPanel} from "@/components/ControlPanel.tsx";
import {Field} from "@/components/Field.tsx";
import bomb from '@/assets/bomb.svg'

export function Minesweeper() {
  return (
    <div className="Minesweeper">
      <header className="Minesweeper-header">
        <h2>Minesweeper&nbsp;&nbsp;</h2>
        <img src={bomb} className="Minesweeper-logo" alt="bomb"/>
      </header>
      <ControlPanel/>
      <Field/>
    </div>
  )
}
