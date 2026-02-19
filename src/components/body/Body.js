import React, { useEffect, useRef, useState } from 'react'
import "./Body_module.css"
import { ArrowDown } from "lucide-react";
import ReactToPrint from 'react-to-print';
import Editor from '../editor/Editor';
import Resume from '../Resume/Resume';
import ResumeModern from '../Resume/ResumeModern';
import ResumeMinimal from '../Resume/ResumeMinimal';

const templates = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

const getDefaultResumeInfo = (sections) => ({
      [sections.basicInfo]:{
        id:sections.basicInfo,
        sectionTitle:sections.basicInfo,
        detail:{},
      },
      [sections.workExp]:{
        id:sections.workExp,
        sectionTitle:sections.workExp,
        details:[],
      },
      [sections.project]:{
        id:sections.project,
        sectionTitle:sections.project,
        details:[],
      },
      [sections.education]:{
        id:sections.education,
        sectionTitle:sections.education,
        details:[],
      },
      [sections.achievements]:{
        id:sections.achievements,
        sectionTitle:sections.achievements,
        points:[],
      },
      [sections.summary]:{
        id:sections.summary,
        sectionTitle:sections.summary,
        detail:"",
      },
      [sections.other]:{
        id:sections.other,
        sectionTitle:sections.other,
        detail:"",
      },
});

const loadSavedData = (sections) => {
  try {
    const saved = localStorage.getItem("resumeData");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // ignore corrupted data
  }
  return getDefaultResumeInfo(sections);
};

const Body = () => {
    const colors = ["#0d9488","#2563eb","#7c3aed","#dc2626","#ea580c","#16a34a","#64748b"];
    const sections = {
      basicInfo:"Basic Info",
      workExp:"Work Experience",
      project:"Projects",
      education:"Education",
      achievements:"Achievements",
      summary:"Summary",
      other:"Other", };
    const resumeRef=useRef()
    const [activeColor,setActiveColor] =useState(colors[0]);
    const [activeTemplate, setActiveTemplate] = useState("classic");
    const [resumeInformation,setResumeInformation] = useState(()=> loadSavedData(sections));

    useEffect(()=>{
      localStorage.setItem("resumeData", JSON.stringify(resumeInformation));
    },[resumeInformation])

    const renderResume = () => {
      const commonProps = {
        ref: resumeRef,
        sections: sections,
        information: resumeInformation,
        activeColor: activeColor,
      };
      switch(activeTemplate) {
        case "modern": return <ResumeModern {...commonProps} />;
        case "minimal": return <ResumeMinimal {...commonProps} />;
        default: return <Resume {...commonProps} />;
      }
    };

  return (
    <div className='containers'>
        <p className="heading">Resume Builder</p>
        <div className="toolbar">
            <div className="toolbar-group">
              <span className="toolbar-label">Accent Color</span>
              <div className="colors">
              { colors.map((item)=>(
                  <span key={item} style={{backgroundColor:item}}
                    className={`color ${activeColor===item ? "active" :""}`}
                    onClick={()=> setActiveColor(item)}
                    title={item}
                  />
              )) }
              </div>
            </div>
            <div className="toolbar-group">
              <span className="toolbar-label">Template</span>
              <div className="template-selector">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    className={`template-btn ${activeTemplate === t.id ? "active" : ""}`}
                    onClick={() => setActiveTemplate(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="download-btn">
                  Download <ArrowDown />
                </button>
              )}
              content={() => resumeRef.current}
            />
        </div>
        <div className="main">
          <Editor sections={sections} information={resumeInformation}
            setInformation={setResumeInformation} />
          {renderResume()}
        </div>
    </div>
  )
}
export default Body;
