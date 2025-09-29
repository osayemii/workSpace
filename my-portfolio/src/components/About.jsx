import aboutPics from '../assets/react.svg';

export default function About() {

    return (
        <section
            id="about"
            className="h-[50vh] bg-white dark:bg-[#172030] flex justify-around"
        >
            <div className="w-[35%] flex items-center dark:text-white text-black">
                <div className="">
                    <h2 className="cursor-pointer mb-3 text-[40px] font-bold">About Me</h2>
                    <p className="">
                        I'm a developer skilled in React, TailwindCSS, and modern web
                        technologies. I enjoy building sleek, functional, and user-friendly
                        applications that solve real-world problems.
                    </p>
                </div>
            </div>
            <div className="w-[35%] flex justify-center">
                <img src={aboutPics} alt="" className='w-[200px]' />
            </div>
        </section>
    );
}