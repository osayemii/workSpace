
export default function Contact() {

    return (
        <section
            id="contact"
            className="dark:bg-[#172030] dark:text-white min-h-[60vh] flex justify-around items-center text-black"
        >
            <div className="w-[40%0]">
                <h2 className="text-[40px] font-bold pb-10">Contact</h2>
                <p className="">Let's work together! You can reach me at:</p>
                <a href="mailto:osayemidanniel@gmail.com" className="text-blue-300 hover:text-blue-500 transition duration-300">osayemidanniel@gmail.com</a>
            </div>
            <div className="flex flex-col xl:w-[40%]">
                <input placeholder="Full Name..." type="text" className="p-2 my-3 rounded-md dark:bg-[#ffffff9e] text-black"/>
                <input placeholder="Email address..." type="email" className="p-2 my-3 rounded-md dark:bg-[#ffffff9e] text-black" />
                <div className="message relative p-0">
                    <textarea placeholder="Message..." name="" id="" className="w-full min-h-[150px] max-h-[150px] p-2 my-3 rounded-md dark:bg-[#ffffff9e] text-black"></textarea><br />  
                    <button className="bg-white text-black w-[30%] rounded-full absolute right-2 bottom-6">Send</button>
                </div>
            </div>
        </section>
    );
}