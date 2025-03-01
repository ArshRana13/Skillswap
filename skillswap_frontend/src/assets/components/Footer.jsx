function Footer() {
    return (
        <div className=" w-full bg-black text-white p-4 flex justify-between md:flex-row flex-col">

            {/* About Us */}
            <div className="md:w-1/2 align-middle">
                <div className="text-3xl">About Us</div>
                <div className="text-lg">
                    <div className="py-4 my-4">
                        SkillSwap is a community-driven skill-bartering platform where people exchange services instead of money. Need a website but can offer photography? Trade it. Want coding help but can teach guitar? Swap it.
                    </div>
                    <div className="py-4 my-4">
                        We cut out the middleman and bring real value through skill-for-skill exchanges. No subscriptions, no fees—just people helping people.
                    </div>
                    <div className="py-4 my-4">
                        Barter smarter with <span className="font-bold text-2xl">SkillSwap.</span>                    </div>
                </div>
            </div>

            {/* Contact Us */}
            <div className="md:w-1/3 align-middle flex flex-col justify-evenly">
                <div className="text-3xl h-1/5">
                    Contact Us
                    <br />
                    <span className="text-lg text-gray-400">
                        Our team will contact you shortly.
                    </span>
                </div>
                <div className="text-lg h-1/2 flex flex-col justify-evenly items-center gap-4 py-4" >
                    <div>
                        <input type="text" name="name" id="name" placeholder="Enter your name" className=" text-white border-2 px-2 rounded-lg text-center border-gray-400 hover:border-white transition duration-300" />
                    </div>
                    <div>
                        <input type="email" name="mail" id="mail" placeholder="Enter your email" className="text-white border-2 px-2 rounded-lg text-center border-gray-400 hover:border-white transition duration-300" />
                    </div>
                    <div className="flex  justify-center">
                        <button className="border-2 border-gray-200 px-4 rounded-lg  py-2 hover:bg-gray-200 hover:text-black transition duration-300">Contact Me</button>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default Footer;