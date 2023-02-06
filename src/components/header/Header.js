import React from 'react'
import resumeSvg from '../../assets/resume.svg'
import "./Header_module.css"

const Header = () => {
  return (
    <>
    <div className='container'>
      <div className="left">
        <p className="heading">A <span>Resume</span> that stands out!</p>
        <p className="heading">Make your own resume. <span>It's free</span></p>
      </div>
      <div className="right">
        <img src={resumeSvg} alt="Resume" />
      </div>
    </div>
    </>
  )
}

export default Header;