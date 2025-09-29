import profile from '../assets/react.svg';

export default function App() {

    return (
        <section className="min-h-[90vh] flex justify-center px-[20px] items-center bg-white dark:bg-[#172030c3]">
            <div className="profile w-[40%] items-center flex justify-center">
                <div className="rotate items-center flex justify-center bg-[#e6e9f2] dark:bg-[#172030] p-5 rounded-full">
                    <img src={profile} alt="" className='w-[200px] h-[200px]' />
                </div>
            </div>
            <div className="w-[40%] text-left text-black dark:text-white">
                <h1 className="xl:text-[40px] text-[30px] font-bold">Hi, I'm Daniel</h1>
                <h3 className="text-2xl font-semibold">A Web Developer</h3>
                <p className="">A passionate developer creating modern and responsive web applications.</p>
                <a href="#"><button className="rounded-md px-10 py-2 mt-3 bg-[#e6e9f2] dark:bg-[#172030] hover:underline cursor-pointer">View my work</button></a>
            </div>
        </section>
    );
}