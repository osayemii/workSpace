
export default function Navbar() {

    return (
        <div className="flex justify-between items-center p-4 bg-[#e6e9f2] dark:bg-[#172030] dark:text-white text-black">
            <h1 className="text-2xl font-bold cursor-pointer">Osayemi Daniel</h1>
            <div className="links w-[60%]">
                    <ul className="w-full flex justify-around font-semibold relative">
                    <li className="relative cursor-pointer underline-slide hover:text-[#000000cc] hover:dark:text-[#ffffffcc]">&nbsp;Home&nbsp;</li>
                    <li className="relative cursor-pointer underline-slide hover:text-[#000000cc] hover:dark:text-[#ffffffcc]">&nbsp;About&nbsp;</li>
                    <li className="relative cursor-pointer underline-slide hover:text-[#000000cc] hover:dark:text-[#ffffffcc]">&nbsp;Projects&nbsp;</li>
                    <li className="relative cursor-pointer underline-slide hover:text-[#000000cc] hover:dark:text-[#ffffffcc]">&nbsp;Contact&nbsp;</li>
                </ul>
            </div>
        </div>
    );
}