import { useState, useEffect } from "react";
import Chat from "../components/Chat";
import ChatProfile from "../components/ChatProfile";
import image from '../images/image.jpg';
import image2 from '../images/images.jpeg';

function ChatPageForDesktop() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserImage, setSelectedUserImage] = useState("");
    const [chatProfiles, setChatProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const current_user_id = localStorage.getItem("user_id");
    useEffect(() => {
        const getChats = async () => {
            const user_id = parseInt(localStorage.getItem("user_id"), 10);
            const token = localStorage.getItem("token");

            if (!user_id || !token) {
                console.log("User ID or Token is missing.");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/messages/chatProfiles", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ "user_id" : user_id }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response}`);
                }

                const data = await response.json();
                
                
                const filter = data.filter((profile) => profile.id != current_user_id);
                console.log(filter);
                setChatProfiles(filter);  // Update state with fetched chat profiles
            } catch (error) {
                console.error("Failure in fetching chat profiles:", error);
            } finally {
                setLoading(false);
            }
        };

        getChats();
    }, []);

    return (
        <div className="pt-14 h-screen bg-gray-900 flex overflow-hidden">
            {/* Chat profile section */}
            <div className="h-full bg-gray-800 w-1/3 border-none shadow-xl pt-4 px-8 overflow-y-auto">
                {/* Back button and search bar */}
                <div className="flex justify-between mb-4">
                    <button className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 transition flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
                            <path fill="currentColor" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z" />
                        </svg>
                    </button>
                    <div className="flex bg-gray-600 hover:bg-gray-700 transition justify-between items-center rounded-xl px-3 py-1">
                        <input type="search" className="h-full bg-transparent text-white px-2 focus:outline-none" placeholder="Search..." />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                        </svg>
                    </div>
                </div>

                {/* Display chat profiles dynamically */}
                {loading ? (
                    <p className="text-gray-400 text-center">Loading chats...</p>
                ) : chatProfiles.length > 0 ? (
                    chatProfiles.map((profile, index) => (

                        
                        <ChatProfile
                            key={index}
                            profilePic={profile.profilePic || image} // Fallback to default image
                            name={profile.name}
                            history={profile.lastMessage || "No messages yet"}
                            onClick={() => {
                                setSelectedUser(profile);
                                setSelectedUserImage( image);
                                console.log(profile);
                                
                            }}
                        />
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No chats available.</p>
                )}
            </div>

            {/* Chat section */}
            <div className="h-full flex-1">
                {selectedUser ? (
                    <Chat selectedUser={selectedUser} profilePic={selectedUserImage} />
                ) : (
                    <div className="text-gray-500 h-full w-full flex justify-center items-center text-4xl">
                        Select a chat to send messages.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatPageForDesktop;
