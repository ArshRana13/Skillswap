import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function DashboardNavbar() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black w-full h-14 flex items-center px-4 justify-between fixed z-50 m-0 top-0">
            {/* Icon */}
            <div className="flex items-center">
                <div className="flex items-center justify-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 32 32">
                        <path fill="#fff" d="M14.057 31.88c-2.854-.37-5.792-1.594-7.932-3.307C1.307 24.729-.88 18.656.37 12.625c.536-2.604 1.932-5.344 3.719-7.318a15.6 15.6 0 0 1 4.677-3.583C11.12.531 13.37-.005 16.026-.005c1.906 0 3.438.25 5.193.849a16.01 16.01 0 0 1 9.948 9.943c.938 2.75 1.109 5.677.51 8.578c-.479 2.292-1.714 4.87-3.234 6.734c-.625.771-2.063 2.146-2.818 2.703a16.2 16.2 0 0 1-7.708 3.078c-.823.104-3.063.099-3.859 0zm4.36-1.338a14.9 14.9 0 0 0 9.672-6.047c2.703-3.797 3.427-8.891 1.901-13.333c-.359-1.042-1.25-2.781-1.901-3.698c-.724-1.026-2.516-2.823-3.547-3.547c-1-.708-2.703-1.568-3.865-1.948A14.75 14.75 0 0 0 8.01 3.584a15.3 15.3 0 0 0-4.385 4.385A14.74 14.74 0 0 0 2.01 20.63c.385 1.161 1.245 2.87 1.948 3.87c.729 1.026 2.521 2.823 3.547 3.547c.922.646 2.656 1.536 3.698 1.901a14.9 14.9 0 0 0 7.214.594m-5.542-5.365a5.6 5.6 0 0 1-2.109-.771c-.578-.37-4.943-4.646-5.156-5.047c-.245-.458.182-1.292.792-1.547l.286-.12l-.88-.896c-.484-.495-.943-1.021-1.016-1.167c-.172-.333-.177-1.047-.016-1.365c.068-.13.229-.328.354-.438c.214-.177.234-.24.214-.688c-.026-.396.01-.552.182-.849c.25-.427.766-.714 1.271-.719c.281 0 .354-.036.474-.245c.313-.547 1.208-.745 1.891-.411l.37.177l.182-.177c.25-.229.75-.432 1.078-.432c.656 0 1.583.755 1.583 1.286c0 .635-.578.745-1.151.219c-.38-.354-.573-.391-.729-.141c-.078.12.109.344 1.229 1.474c1.12 1.125 1.323 1.365 1.323 1.578a.656.656 0 0 1-.63.62c-.203 0-.536-.292-2.073-1.823c-1.568-1.563-1.854-1.813-1.979-1.734c-.339.214-.224.37 1.609 2.208c.995 1 1.813 1.885 1.813 1.969c0 .172-.156.49-.286.573a.76.76 0 0 1-.339.063c-.214.005-.542-.292-2.286-2.031c-1.75-1.74-2.063-2.021-2.188-1.943c-.344.219-.229.37 1.766 2.375c1.089 1.089 2 2.063 2.026 2.167c.057.188-.068.516-.234.63a.8.8 0 0 1-.349.063c-.214 0-.484-.234-1.927-1.677c-1.391-1.391-1.714-1.677-1.891-1.661c-.5.057-.323.281 2.26 2.87c2.24 2.245 2.526 2.563 2.526 2.797a.51.51 0 0 1-.224.438c-.401.318-.557.245-1.568-.734c-.516-.495-1.047-.974-1.188-1.063c-.255-.156-.901-.224-1.021-.099c-.042.036.911 1.042 2.115 2.234c2.005 1.984 2.234 2.188 2.823 2.469a3.94 3.94 0 0 0 3.495.01c1.682-.802 2.615-2.75 2.156-4.516c-.229-.88-.516-1.302-1.672-2.495c-1.333-1.365-1.641-1.74-1.969-2.396c-.365-.734-.521-1.448-.521-2.339c0-.964.099-1.401.526-2.302c.406-.859 1.255-1.76 2.094-2.224c1.646-.917 3.813-.839 5.385.188c.313.203 1.443 1.266 2.849 2.677c2.089 2.094 2.328 2.365 2.328 2.604c0 .568-.464 1.198-.979 1.328c-.193.052-.156.104.719.995c.51.516.984 1.073 1.057 1.245c.245.589.135 1.161-.313 1.63c-.229.24-.26.323-.266.802c-.005.422-.052.599-.219.839a1.48 1.48 0 0 1-1.188.651c-.323 0-.385.031-.547.276c-.365.563-1.313.76-1.927.396l-.307-.182l-.219.214c-.484.464-1.266.526-1.859.146c-.479-.302-.833-.724-.833-.99c0-.234.339-.62.547-.62c.198 0 .464.156.766.438c.302.286.563.286.604-.005c.021-.156-.229-.453-1.24-1.469c-1.063-1.073-1.266-1.318-1.266-1.526a.85.85 0 0 1 .063-.339c.115-.172.438-.292.635-.24c.104.026.984.839 1.948 1.802c.969.969 1.818 1.76 1.896 1.76c.214 0 .354-.214.255-.396c-.047-.083-.865-.922-1.813-1.87c-1.484-1.479-1.724-1.755-1.724-1.974a.8.8 0 0 1 .063-.344c.089-.13.401-.286.578-.286c.078 0 1.057.911 2.177 2.026c2.052 2.042 2.203 2.156 2.417 1.818c.078-.125-.203-.443-1.943-2.188c-1.797-1.802-2.036-2.073-2.036-2.307c0-.161.073-.328.188-.432c.38-.359.495-.286 2.344 1.552c1.75 1.745 1.906 1.859 2.12 1.526c.078-.125-.276-.51-2.448-2.688c-2.365-2.375-2.536-2.568-2.536-2.844c0-.417.24-.615.703-.583c.083.005.583.427 1.099.932c.521.505 1.083.979 1.25 1.052c.328.135.708.156.87.052c.156-.099-4.167-4.354-4.729-4.651a4.013 4.013 0 0 0-5.547 1.844c-.271.578-.307.75-.344 1.495c-.031.703-.005.922.146 1.37c.271.797.505 1.125 1.719 2.365c1.313 1.344 1.563 1.651 1.896 2.37c.938 2 .542 4.313-1.005 5.854c-1.177 1.182-2.781 1.734-4.37 1.516z" />
                    </svg>
                </div>
                <span className="text-white ml-4 text-lg font-bold">SkillSwap</span>
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Search bar */}
            <div className="hidden lg:flex border-2 border-gray-400 text-gray-400 w-1/4 rounded-lg px-2 items-center justify-between hover:border-white hover:text-white transition duration-300">
                <input type="search" name="" id="" placeholder='Search..' className='w-full border-none outline-0' />
                <svg className=" h-6 w-1/12 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                </svg>
            </div>



            {/* Icon Bar */}
            <ul className="hidden md:flex text-white  w-1/2 justify-evenly items-center">


                {/* Search */}
                <div className='text-gray-400 hover:text-white transition duration-200'>
                    <li><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-10 lg:hidden" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg></li>

                </div>

                {/* Home */}
                <button className='text-gray-400 hover:text-white transition duration-200'
                    onClick={() => { navigate('/dashboard') }}>
                    <li><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-10" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75" /></svg></li>

                </button>

                {/* Location
                <div className='text-gray-400 hover:text-white transition duration-200'>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8' viewBox="0 0 32 32"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="16" cy="11" r="4" /><path d="M24 15c-3 7-8 15-8 15s-5-8-8-15s2-13 8-13s11 6 8 13" /></g></svg>
                    </li>
                </div > */}

                {/* Messages */}
                <button className='text-gray-400 hover:text-white transition duration-200'
                    onClick={() => { navigate('/chat') }}
                >
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8' viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M44 24c0 11.046-8.954 20-20 20H4V24C4 12.954 12.954 4 24 4s20 8.954 20 20m-30-6h18m-18 8h18m-18 8h10" /></svg>
                    </li>

                </button>

                {/* Profile */}
                <button className='text-gray-400 hover:text-white transition duration-200'
                    onClick={() => navigate('/profile')}
                >
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8' viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" /><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" /></g></svg>
                    </li>
                </button>


                {/* Logout */}
                <button className='text-gray-400 hover:text-white transition duration-200 '
                onClick={() => {navigate("/your_posts")}}>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8' viewBox="0 0 256 256"><path fill="currentColor" d="M188 48a27.75 27.75 0 0 0-12 2.71V44a28 28 0 0 0-54.65-8.6A28 28 0 0 0 80 60v64l-3.82-6.13a28 28 0 0 0-48.6 27.82c16 33.77 28.93 57.72 43.72 72.69C86.24 233.54 103.2 240 128 240a88.1 88.1 0 0 0 88-88V76a28 28 0 0 0-28-28m12 104a72.08 72.08 0 0 1-72 72c-20.38 0-33.51-4.88-45.33-16.85C69.44 193.74 57.26 171 41.9 138.58a6 6 0 0 0-.3-.58a12 12 0 0 1 20.79-12a2 2 0 0 0 .14.23l18.67 30A8 8 0 0 0 96 152V60a12 12 0 0 1 24 0v60a8 8 0 0 0 16 0V44a12 12 0 0 1 24 0v76a8 8 0 0 0 16 0V76a12 12 0 0 1 24 0Z" /></svg>                    </li>

                </button>



            </ul>

            {/* Sidebar */}
            <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden md:hidden`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul className="text-white font-bold flex flex-col items-center space-y-4 mt-10">
                    <li className="hover:text-gray-400 transition duration-300">Home</li>
                    <li className="hover:text-gray-400 transition duration-300">Product</li>
                    <li className="hover:text-gray-400 transition duration-300">About Us</li>
                    <li className="hover:text-gray-400 transition duration-300">Contact Us</li>
                    <li>
                        <button onClick={() => navigate('/login')} className="text-white border-2 border-white px-4 rounded-lg hover:bg-gray-100 hover:text-black transition duration-300">Login</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default DashboardNavbar;