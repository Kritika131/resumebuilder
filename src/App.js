import React from "react"
import "./App.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import './responsiveness.css'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Body />
      <footer className="app-footer">
        <p>Built with <span className="heart">&#9829;</span> | Resume Builder</p>
      </footer>
    </div>
  )
}

export default App;
