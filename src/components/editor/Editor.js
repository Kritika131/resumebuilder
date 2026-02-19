import React, { useEffect, useRef, useState } from 'react'
import InputControl from '../inputControl/InputControl';
import "./editor.css"
import { X, Camera, Trash2 } from 'lucide-react';

const Editor = (props) => {
    const sections = props.sections;
    const information = props.information;
    const [activeSectionKey,setActiveSectionKey] = useState(Object.keys(sections)[0]) 
                                              //    it return  first object element key.
    // creating active information state to know which section is active                                          
    const[activeInformation,setActiveInformation] =useState(
      information[Object.keys(sections)[0]]
    );

    //for switching on chip's click
    const [activeDetailIndex,setActiveDetailIndex]=useState(0)
    //for pre fill section title
    const [sectionTitle,setSectionTitle]=useState(
      sections[Object.keys(sections)[0]]
    );

    //creating state use to store values which are editable--
    const [values,setValues]=useState({
      name:activeInformation?.detail?.name || "",
      title:activeInformation?.detail?.title || "",
      linkedin:activeInformation?.detail?.linkedin || "",
      github:activeInformation?.detail?.github || "",
      phone:activeInformation?.detail?.phone || "",
      email:activeInformation?.detail?.email || "",
    });

    // photo upload
    const fileInputRef = useRef();
    const [profilePhoto, setProfilePhoto] = useState(
      information[sections.basicInfo]?.detail?.photo || ""
    );

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return;
      if (file.size > 500 * 1024) {
        alert("Image size should be less than 500KB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const handleRemovePhoto = () => {
      setProfilePhoto("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // validation errors state
    const [errors,setErrors]=useState({});

    // validation helper
    const validateForm=()=>{
      const newErrors={};
      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex=/^[+]?[\d\s()-]{7,15}$/;

      switch(sections[activeSectionKey]){
        case sections.basicInfo:
          if(!values.name?.trim()) newErrors.name="Name is required";
          if(!values.title?.trim()) newErrors.title="Title is required";
          if(values.email && !emailRegex.test(values.email)) newErrors.email="Invalid email format";
          if(values.phone && !phoneRegex.test(values.phone)) newErrors.phone="Invalid phone format";
          break;
        case sections.workExp:
          if(!values.title?.trim()) newErrors.title="Title is required";
          if(!values.companyName?.trim()) newErrors.companyName="Company name is required";
          break;
        case sections.project:
          if(!values.title?.trim()) newErrors.title="Title is required";
          break;
        case sections.education:
          if(!values.title?.trim()) newErrors.title="Title is required";
          if(!values.college?.trim()) newErrors.college="College/School name is required";
          break;
        default:
          break;
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length===0;
    };

    // function to set points values
    const handlePointUpdate=(value,index)=>{
       const tempValues={...values};
       if(!Array.isArray(tempValues.points)) tempValues.points=[];
       tempValues.points[index]=value;
       setValues(tempValues)
    }

    //---creating function which generate sections body ------------------------------
    // --->creating work experience section                                           
    const workExpBody = (
      <div className="detail">
        <div className="row">
          <InputControl
            label="Title"
            placeholder="Enter title eg. Frontend developer"
            value={values.title}
            error={errors.title}
            onChange={(event)=>
              setValues((prev)=>({...prev,title:event.target.value})
              )
            }
          />
          <InputControl
            label="Company Name"
            placeholder="Enter company name eg. amazon"
            value={values.companyName}
            error={errors.companyName}
            onChange={(event)=>
              setValues((prev)=>({...prev,companyName:event.target.value})
              )
            }
          />
        </div>
        <div className="row">
          <InputControl
            label="Certificate Link"
            placeholder="Enter certificate link"
            value={values.certificationLink}
            onChange={(event)=>
              setValues((prev)=>({...prev,certificationLink:event.target.value})
              )
            }
          />
          <InputControl
            label="Location"
            placeholder="Enter location eg. Remote"
            value={values.location}
            onChange={(event)=>
              setValues((prev)=>({...prev,location:event.target.value})
              )
            }
          />
        </div>
        <div className="row">
          <InputControl
            label="Start Date"
            type="date"
            placeholder="Enter start date of work"
            value={values.startDate}
            onChange={(event)=>
              setValues((prev)=>({...prev,startDate:event.target.value})
              )
            }
          />
          <InputControl
            label="End Date"
            type="date"
            placeholder="Enter end date of work"
            value={values.endDate}
            onChange={(event)=>
              setValues((prev)=>({...prev,endDate:event.target.value})
              )
            }
          />
        </div>
        <div className="column">
          <label>Enter work description</label>
          <InputControl placeholder="Line 1"
            value={values.points ? values.points[0]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,0)}
          />
          <InputControl placeholder="Line 2"
            value={values.points ? values.points[1]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,1)}
          />
          <InputControl placeholder="Line 3"
            value={values.points ? values.points[2]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,2)}
          />
        </div>
      </div>
    );

    const projectBody=(
      <div className="detail">
        <div className="row">
          <InputControl label="Title" placeholder="Enter title eg. Chat application"
            value={values.title}
            error={errors.title}
            onChange={(event)=>
              setValues((prev)=>({...prev,title:event.target.value})
              )
            }
          />
          
        <InputControl label="Overview" placeholder="Enter basic oveview of project"
          value={values.overview}
          onChange={(event)=>
              setValues((prev)=>({...prev,overview:event.target.value})
              )
            }
        />
        </div>
        <div className="row">
          <InputControl label="Deployed link" placeholder="Enter deployed link of project"
            value={values.link}
            onChange={(event)=>
              setValues((prev)=>({...prev,link:event.target.value})
              )
            }
          />
          <InputControl label="Github Link" placeholder="Enter githuub link of project"
            value={values.github}
            onChange={(event)=>
              setValues((prev)=>({...prev,github:event.target.value})
              )
            }
          />
        </div>
        <div className="column">
          <label >Enter project description </label>
          <InputControl placeholder="Line 1"
            value={values.points ? values.points[0]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,0)}
            
          />
          <InputControl placeholder="Line 2"
            value={values.points ? values.points[1]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,1)}
          />
          <InputControl placeholder="Line 3"
            value={values.points ? values.points[2]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,2)}
          />
          <InputControl placeholder="Line 4"
            value={values.points ? values.points[3]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,3)}
          />

        </div>

      </div>
    );
    const educationBody=(
      <div className="detail">
        <div className="row">
          <InputControl label="Title" placeholder="Enter title eg. B-tech"
            value={values.title}
            error={errors.title}
            onChange={(event)=>
              setValues((prev)=>({...prev,title:event.target.value})
              )
            }
          />
          <InputControl label="College/School Name"
            placeholder="Enter name of your college/school"
            value={values.college}
            error={errors.college}
            onChange={(event)=>
              setValues((prev)=>({...prev,college:event.target.value})
              )
            }
          />
        </div>
        <div className="row">
          <InputControl label="Start Date" type="date" placeholder="Enter start date of this education"
            value={values.startDate}
            onChange={(event)=>
              setValues((prev)=>({...prev,startDate:event.target.value})
              )
            }
          />
          <InputControl label="End Date" type="date" placeholder="Enter end date of this education"
            value={values.endDate}
            onChange={(event)=>
              setValues((prev)=>({...prev,endDate:event.target.value})
              )
            }
          />
        </div>
      </div>

    );
    const basicInfoBody=(
      <div className="detail">
        <div className="photo-upload">
          <label className="photo-label">Profile Photo</label>
          <div className="photo-row">
            {profilePhoto ? (
              <div className="photo-preview">
                <img src={profilePhoto} alt="Profile" />
                <button type="button" className="photo-remove" onClick={handleRemovePhoto} title="Remove photo">
                  <Trash2 />
                </button>
              </div>
            ) : (
              <div className="photo-placeholder" onClick={() => fileInputRef.current?.click()}>
                <Camera />
                <span>Upload Photo</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
            {profilePhoto && (
              <button type="button" className="photo-change" onClick={() => fileInputRef.current?.click()}>
                Change Photo
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <InputControl label="Name" placeholder="Enter your full name eg. kritika"
            value={values.name}
            error={errors.name}
            onChange={(event)=>
              setValues((prev)=>({...prev,name:event.target.value})
              )
            }
          />
          <InputControl label="Title" placeholder="Enter your title eg. Frontend developer"
            value={values.title}
            error={errors.title}
            onChange={(event)=>
              setValues((prev)=>({...prev,title:event.target.value})
              )
            }
          />
        </div>
        <div className="row">
          <InputControl label="Linkedin Link" placeholder="Enter your linkedin profile link"
            value={values.linkedin}
            onChange={(event)=>
              setValues((prev)=>({...prev,linkedin:event.target.value})
              )
            }
          />
          <InputControl label="Github Link" placeholder="Enter your github profile link"
            value={values.github}
            onChange={(event)=>
              setValues((prev)=>({...prev,github:event.target.value})
              )
            }
          />
        </div>
        <div className="row">
          <InputControl label="Email" placeholder="Enter your email"
            value={values.email}
            error={errors.email}
            onChange={(event)=>
              setValues((prev)=>({...prev,email:event.target.value})
              )
            }
          />
          <InputControl label="Phone" placeholder="Enter your phone number"
            value={values.phone}
            error={errors.phone}
            onChange={(event)=>
              setValues((prev)=>({...prev,phone:event.target.value})
              )
            }
          />
        </div>
      </div>
    );

    const achievementsBody=(
      <div className="detail">
        <div className="column">
          <label>List your achievements </label>
          <InputControl placeholder="Line 1"
            value={values.points ? values.points[0]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,0)}
          />
          <InputControl placeholder="Line 2"
            value={values.points ? values.points[1]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,1)}
          />
          <InputControl placeholder="Line 3"
            value={values.points ? values.points[2]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,2)}
          />
          <InputControl placeholder="Line 4"
            value={values.points ? values.points[3]:""}
            onChange={(event)=>handlePointUpdate(event.target.value,3)}
          />
        </div>
      </div>
    );
    const summaryBody=(
      <div className="detail">
        <InputControl label="Summary"
        placeholder="Enter your objective/summary"
          value={values.summary}
          onChange={(event)=>
              setValues((prev)=>({...prev,summary:event.target.value})
              )
            }
        />
      </div>
    );
    const otherBody=(
      <div className="detail">
        <InputControl label="Other" placeholder="Enter something"
          value={values.other}
          onChange={(event)=>
              setValues((prev)=>({...prev,other:event.target.value})
              )
            }
        />
      </div>
    );
    // function to generate body section to detect which section we show
    const generateBody=()=>{
        switch(sections[activeSectionKey]){
          case sections.basicInfo:return basicInfoBody;
          case sections.workExp:return workExpBody;
          case sections.project:return projectBody;
          case sections.education:return educationBody;
          case sections.achievements:return achievementsBody;
          case sections.summary:return summaryBody;
          case sections.other:return otherBody;
          default: return null;
        }
    }
    //-->function to handle new button

    const handleAddNew=()=>{
      const details = activeInformation?.details;
      if (!details) return;
      const lastDetail =details.slice(-1)[0];  //fetching last filled detail
      if(!Object.keys(lastDetail).length) return
      const updatedDetails = [...details, {}]; // create new array instead of mutating
      props.setInformation(prev=>({
        ...prev,
        [sections[activeSectionKey]]:{
          ...information[sections[activeSectionKey]],
          details:updatedDetails,
      },
    }));
    setActiveDetailIndex(updatedDetails.length-1)
    };
    
    const handleDeleteDetail=(index)=>{
      const details = activeInformation?.details;
      if(!details) return;
      const updatedDetails = details.filter((_, i) => i !== index); // use filter instead of splice
      props.setInformation((prev)=>({
        ...prev,
        [sections[activeSectionKey]]:{
          ...information[sections[activeSectionKey]],
          details:updatedDetails,
        },
      }));
      setActiveDetailIndex((prev)=>(prev===index?0:prev-1));
    }

    // creating function for testing purpose to check what will happen if we click save button 
    //--here we tackle or setting inforation values filled in form
    const handleSubmission=()=>{
      if(!validateForm()) return;
      switch(sections[activeSectionKey]){
        case sections.basicInfo:
          {
            const tempDetail={
              name:values.name,
              title:values.title,
              linkedin:values.linkedin,
              github:values.github,
              email:values.email,
              phone:values.phone,
              photo:profilePhoto,
            };
            props.setInformation((prev)=>({...prev,[sections.basicInfo]
              :{...prev[sections.basicInfo],
              detail:tempDetail,
              sectionTitle,
            },
          }));
            break;
          }
        case sections.workExp:
          {
            const tempDetail={
              
              certificationLink:values.certificationLink,
              title:values.title,
              startDate:values.startDate,
              endDate:values.endDate,
              companyName:values.companyName,
              location:values.location,
              points:values.points,
            };
            const tempDetails = [...information[sections.workExp]?.details];
            tempDetails[activeDetailIndex]=tempDetail;

            props.setInformation((prev)=>({...prev,[sections.workExp]
              :{...prev[sections.workExp],
              details:tempDetails,
              sectionTitle,
            },
          }));
            break;
          }
        case sections.project:
          {
            const tempDetail={
              
              link:values.link,
              title:values.title,
              overview:values.overview,
              github:values.github,
              
              points:values.points,
            };
            const tempDetails = [...information[sections.project]?.details];
            tempDetails[activeDetailIndex]=tempDetail;

            props.setInformation((prev)=>({...prev,[sections.project]
              :{...prev[sections.project],
              details:tempDetails,
              sectionTitle,
            },
          }));
            break;
          }
        case sections.education:
          {
            const tempDetail={
              
              title:values.title,
              college:values.college,
              startDate:values.startDate,
              endDate:values.endDate,
              
              
            };
            const tempDetails = [...information[sections.education]?.details];
            tempDetails[activeDetailIndex]=tempDetail;

            props.setInformation((prev)=>({...prev,[sections.education]
              :{...prev[sections.education],
              details:tempDetails,
              sectionTitle,
            },
          }));
            break;
          }
        case sections.achievements:
          {
            const tempPoints=  values.points;    
              
            
            // const tempDetails = [...information[sections.achievements]?.details];
            // tempDetails[activeDetailIndex]=tempDetail;

            props.setInformation((prev)=>({...prev,[sections.achievements]
              :{...prev[sections.achievements],
              points:tempPoints,
              sectionTitle,
            },
          }));
            break;
          }
          case sections.summary:
            {
              const tempDetail= values.summary;
             
              props.setInformation((prev)=>({...prev,[sections.summary]
                :{...prev[sections.summary],
                detail:tempDetail,
                sectionTitle,
              },
            }));
              break;
            }          
            case sections.other:
              {
                const tempDetail=values.other;
    
                props.setInformation((prev)=>({...prev,[sections.other]
                  :{...prev[sections.other],
                  detail:tempDetail,
                  sectionTitle,
                },
              }));
                break;
              }
      }
    }
    {/* //updating active section */}
    useEffect(()=>{
      const activeInfo = information[sections[activeSectionKey]]
      setActiveInformation(activeInfo);
      setSectionTitle(sections[activeSectionKey]);
      setActiveDetailIndex(0);
      setErrors({});
      // updating information when we switch on next section 
      setProfilePhoto(activeInfo?.detail?.photo || "");
      setValues({
        name:activeInfo?.detail?.name || "",
        overview:activeInfo?.details
        ? activeInfo.details[0]?.overview || "":
        "",
        link:activeInfo?.details? activeInfo.details[0]?.link || "":"",
        certificationLink:activeInfo.details? activeInfo.details[0]?.certificationLink|| "":"",
        companyName:activeInfo.details? activeInfo.details[0]?.companyName|| "":"",
        location:activeInfo.details? activeInfo.details[0]?.location|| "":"",
        startDate:activeInfo?.details? activeInfo.details[0]?.startDate || "":"",
        endDate:activeInfo?.details? activeInfo.details[0]?.endDate || "":"",
        points:activeInfo?.details
         ? activeInfo.details[0]?.points 
          ? [...activeInfo.details[0]?.points] 
          : ""
         : activeInfo?.points
         ?[...activeInfo.points]
         : "",

         title:activeInfo?.details
          ?activeInfo?.details[0]?.title || ""
          :activeInfo?.detail?.title || "",
        linkedin:activeInfo?.detail?.linkedin || "",
        github:activeInfo?.details
          ?activeInfo?.details[0]?.github || ""
          :activeInfo?.detail?.github || "",
        phone:activeInfo?.detail?.phone || "",
        summary:typeof activeInfo?.detail !== "object"?activeInfo.detail: "",
        other: typeof activeInfo?.detail !== "object"?activeInfo.detail: "",
        email:activeInfo?.detail?.email || "",
      });
      
    },[activeSectionKey]);
    useEffect(()=>{
      setActiveInformation(information[sections[activeSectionKey]])
    },[information]);

    useEffect(()=> {
      const details=activeInformation?.details;
      if(!details) return
      
      const activeInfo = information[sections[activeSectionKey]];
      setValues({
        overview:activeInfo.details[activeDetailIndex]?.overview || "",
        link:activeInfo.details[activeDetailIndex]?.link || "",
        certificationLink:activeInfo.details[activeDetailIndex]?.certificationLink || "",
        companyName:activeInfo.details[activeDetailIndex]?.companyName || "",
        location:activeInfo.details[activeDetailIndex]?.location || "",
        startDate:activeInfo.details[activeDetailIndex]?.startDate || "",
        endDate:activeInfo.details[activeDetailIndex]?.endDate || "",
        points:activeInfo.details[activeDetailIndex]?.points || "",
        title:activeInfo.details[activeDetailIndex]?.title || "",
        linkedin:activeInfo.details[activeDetailIndex]?.linkedin || "",
        github:activeInfo.details[activeDetailIndex]?.github || "",
        college:activeInfo.details[activeDetailIndex]?.college || "",
      })
    },[activeDetailIndex])
    
  return (
    <div className='editor-container'>
    {/*---------- header of editor -------------*/}
        <div className="header">
         {/* Object.keys(sections) -->it return all keys of array object so that we map it */}
         {Object.keys(sections).map(key=>(
         <div className={`section ${activeSectionKey===key? "active" :""}`} key={key}
         onClick={()=>setActiveSectionKey(key)}
         >
            {sections[key]}
         </div>
         ))}
        </div>
        {/* ------------Body of Editor-------------- */}
        <div className="body">
        {/* input control for title field ,,all section title may be same */}
            <InputControl label="Title" placeholder="Enter section title" value={sectionTitle} onChange = {(event)=>setSectionTitle(event.target.value)}/>
             
             {/* --creating chip for adding more fields  */}
             <div className="chips">             
              {
                activeInformation?.details ?
                activeInformation?.details?.map((item,index)=>(
                  <div className={`chip ${activeDetailIndex===index ? "active" :""}`} 
                  key={item.title+index}
                  onClick={()=>setActiveDetailIndex(index)}>
                    <p>{sections[activeSectionKey]} {index+1}</p>
                    <X onClick={(event)=>{
                      event.stopPropagation();
                      handleDeleteDetail(index)}}/>
                  </div>
                )) 
                 :  "" }
              {activeInformation?.details && 
              activeInformation?.details?.length>0 ? ( <div className="new" onClick={handleAddNew}>+New</div>)
                 : ("") 
                 
                 }
             
             </div>

            {generateBody()}
            <button onClick={handleSubmission}>Save</button>
        </div>
    </div>
  );
};

export default Editor;