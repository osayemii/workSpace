import img1 from '../assets/react.svg'

const projects = [
    { image: img1, title: "Portfolio Website", desc: "Personal website with React & Tailwind." },
    { image: img1, title: "E-Commerce App", desc: "Full-stack shopping app." },
    { image: img1, title: "Chat Application", desc: "Realtime chat using WebSockets." }
];

export default function Projects() {
    return (
        <section id="projects"
            className="py-10 min-h-[50vh] bg-white dark:bg-[#172030c3] flex items-center flex-col text-black"
        >
            <h2 className="font-bold text-[40px]">Projects</h2>
            <div className="grid grid-cols-3 gap-4 w-[900px]">
                {projects.map((project, index) => (
                    <div key={index} className="border p-3 bg-white">
                        <img src={project.image} alt="image" className='w-full border-b-2 h-[170px] pb-2'/>
                        <h3 className="font-semibold pt-2">{project.title}</h3>
                        <p className="text-[14px]">{project.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}