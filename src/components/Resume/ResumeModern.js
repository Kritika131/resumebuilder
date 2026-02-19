import React, { forwardRef, useEffect, useRef } from 'react';
import { AtSign, Calendar, GitHub, Linkedin, MapPin, Paperclip, Phone } from 'react-feather';
import "./resume-modern.css";

const ResumeModern = forwardRef((props, ref) => {
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
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!props.activeColor || !container) return;
        container.style.setProperty('--color', props.activeColor);
    }, [props.activeColor]);

    return (
        <div ref={ref}>
            <div ref={containerRef} className="resume-modern">
                {/* Sidebar */}
                <div className="modern-sidebar">
                    <div className="modern-name">
                        <h1>{info.basicInfo?.detail?.name}</h1>
                        <p className="modern-title">{info.basicInfo?.detail?.title}</p>
                    </div>

                    <div className="modern-contact">
                        <h3>Contact</h3>
                        {info.basicInfo?.detail?.email && (
                            <div className="modern-contact-item">
                                <AtSign /> <span>{info.basicInfo.detail.email}</span>
                            </div>
                        )}
                        {info.basicInfo?.detail?.phone && (
                            <div className="modern-contact-item">
                                <Phone /> <span>{info.basicInfo.detail.phone}</span>
                            </div>
                        )}
                        {info.basicInfo?.detail?.linkedin && (
                            <div className="modern-contact-item">
                                <Linkedin /> <span>{info.basicInfo.detail.linkedin}</span>
                            </div>
                        )}
                        {info.basicInfo?.detail?.github && (
                            <div className="modern-contact-item">
                                <GitHub /> <span>{info.basicInfo.detail.github}</span>
                            </div>
                        )}
                    </div>

                    {/* Education in sidebar */}
                    {info.education?.sectionTitle && info.education?.details?.length > 0 && (
                        <div className="modern-sidebar-section">
                            <h3>{info.education.sectionTitle}</h3>
                            {info.education.details.map((item, index) => (
                                <div className="modern-sidebar-item" key={item.title || index}>
                                    {item.title && <p className="modern-item-title">{item.title}</p>}
                                    {item.college && <p className="modern-item-sub">{item.college}</p>}
                                    {item.startDate && item.endDate && (
                                        <p className="modern-item-date">
                                            {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Achievements in sidebar */}
                    {info.achievements?.sectionTitle && info.achievements?.points?.length > 0 && (
                        <div className="modern-sidebar-section">
                            <h3>{info.achievements.sectionTitle}</h3>
                            <ul className="modern-points">
                                {info.achievements.points.map((elem, index) => (
                                    <li key={elem + index}>{elem}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Other in sidebar */}
                    {info.other?.sectionTitle && info.other?.detail && (
                        <div className="modern-sidebar-section">
                            <h3>{info.other.sectionTitle}</h3>
                            <p className="modern-item-sub">{info.other.detail}</p>
                        </div>
                    )}
                </div>

                {/* Main content */}
                <div className="modern-main">
                    {/* Summary */}
                    {info.summary?.sectionTitle && info.summary?.detail && (
                        <div className="modern-section">
                            <h2 className="modern-section-title">{info.summary.sectionTitle}</h2>
                            <p className="modern-text">{info.summary.detail}</p>
                        </div>
                    )}

                    {/* Work Experience */}
                    {info.workExp?.sectionTitle && info.workExp?.details?.length > 0 && (
                        <div className="modern-section">
                            <h2 className="modern-section-title">{info.workExp.sectionTitle}</h2>
                            {info.workExp.details.map((item, index) => (
                                <div className="modern-entry" key={item.title || index}>
                                    <div className="modern-entry-header">
                                        {item.title && <p className="modern-entry-title">{item.title}</p>}
                                        {item.startDate && item.endDate && (
                                            <span className="modern-entry-date">
                                                <Calendar /> {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                                            </span>
                                        )}
                                    </div>
                                    {item.companyName && <p className="modern-entry-sub">{item.companyName}</p>}
                                    {item.location && (
                                        <p className="modern-entry-location"><MapPin /> {item.location}</p>
                                    )}
                                    {item.certificationLink && (
                                        <a className="modern-link" href={item.certificationLink}>
                                            <Paperclip /> {item.certificationLink}
                                        </a>
                                    )}
                                    {item.points?.length > 0 && (
                                        <ul className="modern-points">
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
                    {info.project?.sectionTitle && info.project?.details?.length > 0 && (
                        <div className="modern-section">
                            <h2 className="modern-section-title">{info.project.sectionTitle}</h2>
                            {info.project.details.map((item, index) => (
                                <div className="modern-entry" key={item.title || index}>
                                    {item.title && <p className="modern-entry-title">{item.title}</p>}
                                    {item.overview && <p className="modern-text">{item.overview}</p>}
                                    {item.link && (
                                        <a className="modern-link" href={item.link}>
                                            <Paperclip /> {item.link}
                                        </a>
                                    )}
                                    {item.github && (
                                        <a className="modern-link" href={item.github}>
                                            <GitHub /> {item.github}
                                        </a>
                                    )}
                                    {item.points?.length > 0 && (
                                        <ul className="modern-points">
                                            {item.points.map((elem, i) => (
                                                <li key={elem + i}>{elem}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ResumeModern;