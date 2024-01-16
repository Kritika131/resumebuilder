import React, { forwardRef, useEffect,useRef,useState } from 'react';
import { AtSign, Calendar, GitHub, Linkedin, MapPin, Paperclip, Phone } from 'react-feather';
import "./resume-module.css";

const Resume = forwardRef((props,ref) => {
    const information = props.information;
    const sections = props.sections;
    const [column ,setColumns] = useState([[],[]])

    // creating state for drag and drop functionalily
    const [source,setSource]=useState("");
    const [target,setTarget] =useState("");
    const containerRef = useRef();

    const info  = {
        workExp:information[sections.workExp],
        project:information[sections.project],
        achievements:information[sections.achievements],
        education:information[sections.education],
        basicInfo:information[sections.basicInfo],
        summary:information[sections.summary],
        other:information[sections.other],
    }
    // ---creating function to get date in JS formate
    const getFormattedDate=(value)=>{
        if(!value) return;
        const date =new Date(value)
        return `${date.getDate()}/${ date.getMonth()+1}/${date.getFullYear()}`;
    }

    const sectionDivs ={
        [sections.workExp] : (<div key = {"workexp"}
        draggable 
        onDragOver={()=>setTarget(info.workExp?.id)}
        onDragEnd={()=>setSource(info.workExp?.id)}
        className={`workExp section ${info.workExp?.sectionTitle?"": "hidden"}`}>
        <div className="sectionTitle">{info.workExp.sectionTitle}</div>
        <div className="content">
        {
            info.workExp?.details?.map((item)=>(
            
            <div className="item" key={item.title}>
            {item.title ? <p className="title">{item.title}</p>:(<span/>)}
            {item.companyName ? (<p className="subTitle">{item.companyName}</p>) :(<span/>)}
            {item.certificationLink ? (
                <a  className="link" href={item.certificationLink}>
                    <Paperclip/>
                    {item.certificationLink} 
                </a>
            ):(<span/>)}   
            {item.startDate ? item.endDate ? (

                <div className="date">
                    <Calendar/>{" "}{getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                </div>
            ) : (
                ""
            ):(<span/>)}
            {item.location ? (
                <p className="overview">
                   <MapPin/> {item.location}
                   {/* <MapPin/>Remote */}
                </p> ) :(<span/>)
            }  
            {item.points?.length > 0 ? (
                <ul className="points">
                    {item.points?.map((elem,index)=>(
                        <li className="point" key={elem + index}>{elem}</li>
                    ))}
                </ul>
            ):(<span/>)}
                
            </div>
            ))
        }
        </div>
    </div>),
    [sections.project]:(<div key={"project"} draggable 
    onDragOver={()=>setTarget(info.project?.id)}
        onDragEnd={()=>setSource(info.project?.id)}
     className={`project section ${info.project?.sectionTitle?"": "hidden"}`}>
    <div className="sectionTitle">{info.project.sectionTitle}</div>
    <div className="content">
    {info.project?.details?.map((item)=>(
        <div className="item">
            {item.title ? <p className='title'>{item.title}</p>:(<span/>)}
            {item.link ? (
            
            <a  className="link" href={item.link}>
              <Paperclip/>
                  {item.link} </a>
        ):(<span/>)}
        {item.github ? (
            <a href={item.github} className="link">{item.github}</a>
        ):(<span/>)}
        {item.overview ?(
            <p className="overview">{item.overview}</p>
        ):(<span/>)}
        {item.points?.length > 0 ? (
            <ul className="points">
                {item.points?.map((elem,index)=>(
                    <li className="point" key={elem + index}>{elem}</li>
                ))}
            </ul>
        ):(<span/>)}
        </div>
    ))}
       
    </div>
   </div>),
   [sections.education]:(<div key={"education"} draggable 
   onDragOver={()=>setTarget(info.education?.id)}
        onDragEnd={()=>setSource(info.education?.id)}
    className={`education section ${info.education?.sectionTitle?"": "hidden"}`}>
   <div className="sectionTitle">{info.education?.sectionTitle}</div>
   <div className="content">
   {
       info.education?.details?.map(item=>(

       <div className="item">
       {item.title ? 
           (<p className="title">{item.title}</p>) :(<span/>)
       }
       {item.college ? (
           <p className="subTitle">{item.college}</p>
       ):(<span/>)}
       {item.startDate ? item.endDate ? (
           <div className="date">
               <Calendar/>{" "} {getFormattedDate(item.startDate) } - { getFormattedDate(item.endDate)}
           </div>
       ): (""
       ):(<span/>)}
       {item.location ?(
           <p className="date">
               <MapPin/> Remote
           </p>
       ):(<span/>)}
       {item.points?.length > 0 ? (
           <ul className="points">
               {item.points?.map((elem , index)=>(
                   <li className="point" key={elem + index}>{elem}</li>
               ))}
           </ul>
       ):(<span/>)}
       </div>
       ))
   }
   </div>
</div>),
   [sections.achievements]: (<div key={"achievement"} draggable
    onDragOver={()=>setTarget(info.achievements?.id)}
        onDragEnd={()=>setSource(info.achievements?.id)}
     className={`achievement section ${info.achievements?.sectionTitle?"": "hidden"}`}>
   <div className="sectionTitle">{info.achievements?.sectionTitle}</div>
   <div className="content">
       {info.achievements?.points?.length > 0 ? (
           <ul className="numered">
               {info.achievements?.points?.map((elem,index)=>(
                   <li className="point" key={elem+index}>{elem}</li>
               ))}
           </ul>
       ):(<span/>)}
   </div>
   
</div>)   ,
   [sections.summary]:(<div key={"summary"} draggable
   onDragOver={()=>setTarget(info.summary?.id)}
        onDragEnd={()=>setSource(info.summary?.id)}
    className={`summary section ${info.summary?.sectionTitle?"": "hidden"}`}>
   <div className="sectionTitle">{info.summary?.sectionTitle}</div>
   <div className="content">
       <p className="overview">{info.summary?.detail}</p>
   </div>
</div>),
   [sections.other]:( <div key = {"other"} draggable
   onDragOver={()=>setTarget(info.other?.id)}
        onDragEnd={()=>setSource(info.other?.id)}
    className={`other section ${info.other?.sectionTitle?"": "hidden"}`}>
   <div className="sectionTitle">{info.other?.sectionTitle}</div>
   <div className="content">
       <p className="overview">{info?.other?.detail} </p>
   </div>
</div>),
        
    };
    
    //    ---creating function which swap source and target 
    const swapSourceTarget = (source,target)=>{
        if(!source || !target) return;
        const tempColumns=[[...column[0]],[...column[1]]]; //original state copy

    let sourceRowIndex = tempColumns[0].findIndex((item)=>item === source);
    let sourceColumnIndex=0;
    if(sourceRowIndex<0) {
        sourceColumnIndex=1;
      sourceRowIndex = tempColumns[1].findIndex((item)=>item===source);
    }
    let targetRowIndex = tempColumns[0].findIndex((item)=>item === target);
    let targetColumnIndex=0;
    if(targetRowIndex<0) {
        targetColumnIndex=1;
      targetRowIndex = tempColumns[1].findIndex((item)=>item===target);
    }
    const tempSource=tempColumns[sourceColumnIndex][sourceRowIndex]
    tempColumns[sourceColumnIndex][sourceRowIndex] = tempColumns[targetColumnIndex][targetRowIndex]

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource

    setColumns(tempColumns);
  };
 
    useEffect(()=>{
       setColumns([
        [sections.project,sections.education,sections.summary],
        [sections.workExp,sections.achievements,sections.other],
       ]);
    },[]);
    // console.log(information)
    // creating useEffect which listen whenever source value change our operation will performed
    useEffect(()=>{
      
       swapSourceTarget(source,target);
    },[source])
    
    useEffect(()=>{
        const container=containerRef.current;
       if(!props.activeColor || !container )return;

       container.style.setProperty('--color',props.activeColor)

    },[props.activeColor])
  return (
    <div ref={ref}>
    <div ref={containerRef} className='resume-container'>
       <div className="header">
        <p className="heading">{info.basicInfo?.detail?.name} </p>
        <div className="subHeading">{info.basicInfo?.detail?.title} </div>

        <div className="links">
                { info.basicInfo?.detail?.email &&
                <a className="link" type="email">
                <AtSign/>{info.basicInfo?.detail?.email}</a> }
                { info.basicInfo?.detail?.phone &&
                 <a className="link"><Phone/>{info.basicInfo?.detail?.phone}</a>
                }
                { info.basicInfo?.detail?.linkedin &&
                 <a className="link"><Linkedin/>{info.basicInfo?.detail?.linkedin}</a>
                }
                { info.basicInfo?.detail?.github && 
                   <a className="link"><GitHub/>{info.basicInfo?.detail?.github}</a>
                }
        </div>
       </div>

       <div className="resume-main">
         <div className="col1">{column[0].map(item=>sectionDivs[item])}</div>
         <div className="col2">{column[1].map(item=>sectionDivs[item])}</div>

       </div>
    </div>
    </div>
  )
})

export default Resume