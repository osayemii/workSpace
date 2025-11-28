import { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
    const skillsRef = useRef(null);

    const skillCategories = [
        {
            title: 'Frontend',
            skills: [
                { name: 'React', level: 90 },
                { name: 'JavaScript', level: 85 },
                { name: 'CSS/SCSS', level: 90 },
                { name: 'HTML5', level: 95 },
                { name: 'TypeScript', level: 80 },
            ]
        },
        {
            title: 'Backend',
            skills: [
                { name: 'Node.js', level: 85 },
                { name: 'Python', level: 80 },
                { name: 'Express', level: 85 },
                { name: 'MongoDB', level: 75 },
                { name: 'PostgreSQL', level: 70 },
            ]
        },
        {
            title: 'Tools & Others',
            skills: [
                { name: 'Git', level: 90 },
                { name: 'Docker', level: 70 },
                { name: 'AWS', level: 65 },
                { name: 'Figma', level: 75 },
                { name: 'Vite', level: 85 },
            ]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        const progressBars = entry.target.querySelectorAll('.progress-bar');
                        progressBars.forEach((bar) => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 200);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            if (skillsRef.current) {
                observer.unobserve(skillsRef.current);
            }
        };
    }, []);

    return (
        <section id="skills" className="skills" ref={skillsRef}>
            <div className="container">
                <h2 className="section-title">Skills & Technologies</h2>
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category" style={{ animationDelay: `${index * 0.2}s` }}>
                            <h3 className="category-title">{category.title}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="skill-item">
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="progress-container">
                                            <div
                                                className="progress-bar"
                                                data-width={skill.level}
                                                style={{ width: '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

