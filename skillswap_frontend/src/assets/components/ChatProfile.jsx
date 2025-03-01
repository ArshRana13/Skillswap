import { useState } from "react";

function ChatProfile(props){

    const [selected, setSelected]  = useState(false);
    return (
    <button className="bg-black w-full  text-white flex p-4 border-none rounded-xl shadow-2xl hover:bg-gray-900 transition duration-300 my-8 "
    onClick={props.onClick}>
        <div className="h-20 w-20">
            <img src={props.profilePic} alt="profile" className="w-20 h-20 rounded-full">
             
            </img>
        </div>

        <div className="flex flex-col justify-around px-4 items-start">
        <div className="text-3xl">{props.name}</div>
        <div className="text-gray-500">{props.history}</div>
        </div>
    </button>);
}

export default ChatProfile;