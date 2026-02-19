import React, { forwardRef, useEffect, useRef } from 'react';
import { AtSign, Calendar, Github, Linkedin, Paperclip, Phone } from 'lucide-react';
import "./resume-minimal.css";

const ResumeMinimal = forwardRef((props, ref) => {
    const information = props.information;
    const sections = props.sections;
    const containerRef = useRef();

    const info = {
        workExp: information[sections.workExp],
        project: information[sections.project],
        achievements: information[sections.achievements],
        education: information[sections.education],
        basicInfo: information[sections.basicInfo],
        summary: information[sections.summary],
        other: information[sections.other],
    };

    const getFormattedDate = (value) => {
        if (!value) return;
        const date = new Date(value);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!props.activeColor || !container) return;
        container.style.setProperty('--color', props.activeColor);
    }, [props.activeColor]);

    return (
        <div ref={ref}>
            <div ref={containerRef} className="resume-minimal">
                {/* Header - centered */}
                <div className="minimal-header">
                    {info.basicInfo?.detail?.photo && (
                        <img className="minimal-photo" src={info.basicInfo.detail.photo} alt="Profile" />
                    )}
                    <h1 className="minimal-name">{info.basicInfo?.detail?.name}</h1>
                    <p className="minimal-title">{info.basicInfo?.detail?.title}</p>
                    <div className="minimal-contacts">
                        {info.basicInfo?.detail?.email && (
                            <span className="minimal-contact"><AtSign />{info.basicInfo.detail.email}</span>
                        )}
                        {info.basicInfo?.detail?.phone && (
                            <span className="minimal-contact"><Phone />{info.basicInfo.detail.phone}</span>
                        )}
                        {info.basicInfo?.detail?.linkedin && (
                            <span className="minimal-contact"><Linkedin />{info.basicInfo.detail.linkedin}</span>
                        )}
                        {info.basicInfo?.detail?.github && (
                            <span className="minimal-contact"><Github />{info.basicInfo.detail.github}</span>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {info.summary?.detail && (
                    <div className="minimal-section">
                        <h2>{info.summary.sectionTitle}</h2>
                        <p>{info.summary.detail}</p>
                    </div>
                )}

                {/* Work Experience */}
                {info.workExp?.details?.length > 0 && (
                    <div className="minimal-section">
                        <h2>{info.workExp.sectionTitle}</h2>
                        {info.workExp.details.map((item, index) => (
                            <div className="minimal-entry" key={item.title || index}>
                                <div className="minimal-entry-row">
                                    <div>
                                        {item.title && <strong>{item.title}</strong>}
                                        {item.companyName && <span className="minimal-company"> | {item.companyName}</span>}
                                        {item.location && <span className="minimal-location"> - {item.location}</span>}
                                    </div>
                                    {item.startDate && item.endDate && (
                                        <span className="minimal-date">
                                            <Calendar /> {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                                        </span>
                                    )}
                                </div>
                                {item.certificationLink && (
                                    <a className="minimal-link" href={item.certificationLink}>
                                        <Paperclip /> {item.certificationLink}
                                    </a>
                                )}
                                {item.points?.length > 0 && (
                                    <ul>
                                        {item.points.map((elem, i) => (
                                            <li key={elem + i}>{elem}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {info.project?.details?.length > 0 && (
                    <div className="minimal-section">
                        <h2>{info.project.sectionTitle}</h2>
                        {info.project.details.map((item, index) => (
                            <div className="minimal-entry" key={item.title || index}>
                                <strong>{item.title}</strong>
                                {item.overview && <p>{item.overview}</p>}
                                <div className="minimal-links">
                                    {item.link && (
                                        <a className="minimal-link" href={item.link}>
                                            <Paperclip /> Live
                                        </a>
                                    )}
                                    {item.github && (
                                        <a className="minimal-link" href={item.github}>
                                            <Github /> Source
                                        </a>
                                    )}
                                </div>
                                {item.points?.length > 0 && (
                                    <ul>
                                        {item.points.map((elem, i) => (
                                            <li key={elem + i}>{elem}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {info.education?.details?.length > 0 && (
                    <div className="minimal-section">
                        <h2>{info.education.sectionTitle}</h2>
                        {info.education.details.map((item, index) => (
                            <div className="minimal-entry" key={item.title || index}>
                                <div className="minimal-entry-row">
                                    <div>
                                        {item.title && <strong>{item.title}</strong>}
                                        {item.college && <span className="minimal-company"> | {item.college}</span>}
                                    </div>
                                    {item.startDate && item.endDate && (
                                        <span className="minimal-date">
                                            {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Achievements */}
                {info.achievements?.points?.length > 0 && (
                    <div className="minimal-section">
                        <h2>{info.achievements.sectionTitle}</h2>
                        <ol>
                            {info.achievements.points.map((elem, index) => (
                                <li key={elem + index}>{elem}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Other */}
                {info.other?.detail && (
                    <div className="minimal-section">
                        <h2>{info.other.sectionTitle}</h2>
                        <p>{info.other.detail}</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ResumeMinimal;