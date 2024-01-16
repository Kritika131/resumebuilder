import React from "react"
import "./App.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import './responsiveness.css'

const App = ()=>{
  return (
    <div className="App">
    
    <Header/>
    
    <Body/>
  
    </div>
  )
}

export default App;