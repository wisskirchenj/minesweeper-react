import './App.css'
import bomb from './assets/bomb.svg'

function App() {

  return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={bomb} className="App-logo" alt="logo"/>
            <p>
              Minesweeper is loading...
            </p>
          </header>
        </div>
      </>
  )
}

export default App
