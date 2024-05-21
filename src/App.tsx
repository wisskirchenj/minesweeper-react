import './App.css'
import {Minesweeper} from "@/components/Minesweeper.tsx";

function App() {

  return (
      <div className="app">
        <div className="game-container">
          <Minesweeper/>
        </div>
      </div>
  )
}

export default App
