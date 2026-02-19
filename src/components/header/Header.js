import React from 'react'
import resumeSvg from '../../assets/resumeimg.png'
import { useDarkMode } from '../../DarkModeContext'
import { Moon, Sun } from 'lucide-react'
import "./Header_module.css"

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <header className='container'>
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun /> : <Moon />}
      </button>
      <div className="hero-content">
        <p className="heading">
          A <span>Resume</span> that stands out!
        </p>
        <p className="subtext">
          Make your own resume. <span>It's free</span>
        </p>
      </div>
      <div className="hero-image">
        <img src={resumeSvg} alt="Resume Builder illustration" />
      </div>
    </header>
  )
}

export default Header;
