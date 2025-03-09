import { useState, useRef, useEffect, } from "react";
//import SockJS from "sockjs-client";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client/dist/sockjs"
import { Client } from "@stomp/stompjs";
import Message from "./Message";

function Chat(props) {
    const location = useLocation();
    const selectedUser = location.state?.selectedUser || props.selectedUser || {};
    const profileImage = location.state?.profilePic || props.profilePic;

    const current_user_id = parseInt(localStorage.getItem("user_id"), 10);
    const token = localStorage.getItem("token");
    const selected_user_id = selectedUser.id;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const messagesEndRef = useRef(null);

    // console.log(token);

    // Fetch initial messages
    useEffect(() => {
        const getMessages = async () => {
            if (!current_user_id || !token) {
                console.log("User ID or Token is missing.");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/messages/getMessages", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ current_user_id: current_user_id, selected_user_id: selected_user_id }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.error}`);
                }

                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Failure in fetching messages:", error);
            }
        };

        getMessages();
    }, [selected_user_id]);

    // Connect to WebSocket
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log("Connected to WebSocket");

                // Subscribe to the topic where messages are broadcasted
                client.subscribe(`/topic/${current_user_id}`, (message) => {
                    try {
                        const newMessage = JSON.parse(message.body); // Parse the JSON object
                        console.log("sent msg is ", newMessage);

                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                    } catch (error) {
                        console.error("Failed to parse WebSocket message:", error);
                    }
                });
            },
            onDisconnect: () => {
                console.log("Disconnected from WebSocket");
            },
        });

        client.activate();
        setStompClient(client);

        // Cleanup on unmount
        return () => {
            client.deactivate();
        };
    }, [selected_user_id, token]);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    // Send a message
    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        const msg = {
            sender_id: current_user_id,
            receiver_id: selected_user_id,
            content: newMessage,
            time: new Date().toISOString(),
        };
        console.log("message in frontend looks like this -> ", msg);
        //setMessages((prevMessages) => [...prevMessages, msg]);
        try {
            // Send the message over WebSocket
            if (stompClient) {
                stompClient.publish({
                    destination: `/app/chat.sendMessage`,
                    headers: {
                        receiverId: selected_user_id
                    },
                    body: JSON.stringify(msg),
                });
            }

            // Optionally, save the message to the database via REST API
            //     const response = await fetch("http://localhost:8080/messages/sendMessage", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: `Bearer ${token}`,
            //         },
            //         body: JSON.stringify(msg),
            //     });

            //     if (!response.ok) {
            //         throw new Error(`HTTP error! Status: ${response.error}`);
            //     }

            //     const data = await response.json();
            //     setMessages((prevMessages) => [...prevMessages, data]);
        } catch (error) {
            //     console.error("Failure in sending message:", error);
        }

        setNewMessage("");
    };

    return (
        <div className={`text-white flex flex-col h-screen bg-gray-900 mt-14 `}>
            {/* Chat Header */}
            <div className="flex w-full justify-between h-[72px] items-center gap-4 p-2 bg-gray-800">
                <div className=" flex  items-center gap-4">
                    <div className="h-14 w-14 border-none rounded-full overflow-hidden">
                        <img className="h-14 w-14 rounded-full object-cover" src={profileImage} alt="Profile" />
                        
                    </div>
                    <div className="text-2xl font-semibold">{selectedUser.name}</div>
                </div>
                <div className=" h-10 w-10 mr-4 text-gray-400 hover:text-white transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full " viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                </div>
            </div>

            {/* Messages Container (Scrolls Automatically) */}
            <div className="flex flex-col flex-grow p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <Message key={index} msg={msg} />
                ))}
                {/* Invisible div to ensure scrolling works */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Field (Fixed at Bottom) */}
            <div className="flex items-center gap-2 p-4 bg-gray-800 mb-14">
                <input
                    type="text"
                    className="flex-grow p-2 bg-gray-700 text-white border-none rounded-lg outline-none"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-150"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;