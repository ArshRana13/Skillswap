import { useRef, useState, useEffect } from "react";
import image1 from "../images/images.jpeg";

function ProfilePage() {

    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/users/id/${localStorage.getItem("user_id")}`, {
                method: "GET",
              headers: { Authorization: `Bearer ${token}` }
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch user details");
            }
    
            const data = await response.json();
            console.log(data);
            
            setUser(data);
            setEmail(data.email);
            setUsername(data.name);
            setLocation(data.location);
            setLinkedIn(data.linkedInUrl);
            setGithub(data.githubUrl);
            setProfileImage(data.profileImageUrl)
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
    
        fetchUserDetails();
      }, []);




    const fileInputRef = useRef(null);
    
    // State to store input values
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.name);
    const [location, setLocation] = useState(user.location);
    const [profileImage, setProfileImage] = useState(""); // Store image URL
    const [selectedFile, setSelectedFile] = useState(null); // Store selected file
    const [linkedIn, setLinkedIn] = useState(user.linkedInUrl || "")
    const [github, setGithub] = useState(user.githubUrl || "");

    // Function to open file input when image is clicked
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection (only update preview, do not upload)
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get selected file
        if (file) {
            const imageURL = URL.createObjectURL(file); // Create temporary preview
            setProfileImage(imageURL); // Update the image preview
            setSelectedFile(file); // Store file for later upload
        }
    };

    // Function to upload image to Azure when "Apply Changes" is clicked
    const applyChanges = async () => {
        
        if (selectedFile) {
            const containerName = "profileimages"; 
            const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2027-04-08T21:40:33Z&st=2025-03-03T13:40:33Z&spr=https,http&sig=D%2BqE%2FfmW29JM5XhC6W0UiZ%2BTcurG0MBz9tWp%2BRFTKyM%3D";
            const fileName = selectedFile.name;
            const blobUrl = `https://skillswapprofileimages.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;    
            
            try {
                await fetch(blobUrl, {
                    method: "PUT",
                    body: selectedFile,
                    headers: {
                        "x-ms-blob-type": "BlockBlob",
                        "Content-Type": selectedFile.type,
                    },
                });
                setProfileImage(blobUrl);
                localStorage.setItem("image", blobUrl)
                console.log("✅ Image uploaded successfully:", blobUrl);
                 // Update profile picture to uploaded URL
                
                 
                //now send this image to backend and replace the old one from everywhere!
                
                setProfileImage(blobUrl);
            } catch (error) {
                console.error("❌ Upload failed:", error);
            }
        }
        //now send this image to backend and replace the old one from everywhere!
        try {
            const userId = localStorage.getItem("user_id");
            console.log("image is ", localStorage.getItem("image"));
            
            if (!userId) {
                throw new Error("User ID not found in localStorage");
            }
        
            const response = await fetch(`http://localhost:8080/api/users/edit/${userId}`, {
                method: "PUT",  // Use PUT for updates
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name: username,
                    location,
                    profileImageUrl: localStorage.getItem("image"),
                    linkedInUrl : linkedIn,
                    githubUrl: github
                }),
            });
        
            if (!response.ok) {
                throw new Error("Update failed");
            }
        
            return true; // Return true if successful
        } catch (error) {
            console.error("Update Error:", error.message);
            throw error;
        }
        
    };

    return (
        <div className="pt-28 h-fit py-4 bg-gray-800 flex flex-col items-center">
            <div className="flex flex-col items-center">
                {/* Image Container */}
                <div className="relative h-40 w-40 rounded-full">
                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange} // Handle file selection
                    />

                    {/* Profile Image */}
                    <img
                        className="h-40 w-40 rounded-full object-cover hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                        src={profileImage}
                        alt="Profile"
                        onClick={handleImageClick}
                    />

                    {/* Edit Icon (Top Right) */}
                    <button
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200 transition"
                        onClick={handleImageClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path strokeDasharray="56" strokeDashoffset="56" d="M3 21l2 -6l11 -11c1 -1 3 -1 4 0c1 1 1 3 0 4l-11 11l-6 2">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"/>
                                </path>
                                <path strokeDasharray="8" strokeDashoffset="8" d="M15 5l4 4">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/>
                                </path>
                                <path strokeDasharray="6" strokeDashoffset="6" strokeWidth="1" d="M6 15l3 3">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/>
                                </path>
                            </g>
                        </svg>
                    </button>
                </div>

                {/* Username */}
                <div className="text-white font-bold text-5xl pt-10">{username}</div>
            </div>

            {/* Editable Inputs */}
            <div className="grid grid-cols-2 pt-14 gap-y-4">
                <div className="text-white font-semibold text-lg">Email</div>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center border-none bg-gray-300 rounded-lg p-2"
                />
                <div className="text-white font-semibold text-lg">Username</div>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-none bg-gray-300 rounded-lg text-center p-2"
                />
                <div className="text-white font-semibold text-lg">Location</div>
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-none bg-gray-300 rounded-lg text-center p-2"
                />
                <div className="text-white font-semibold text-lg">LinkedIn URL</div>
                <input 
                    type="text" 
                    value={linkedIn} 
                    onChange={(e) => setLinkedIn(e.target.value)}
                    className="border-none bg-gray-300 rounded-lg text-center p-2"
                />
                <div className="text-white font-semibold text-lg">GitHub URL</div>
                <input 
                    type="text" 
                    value={github} 
                    onChange={(e) => setGithub(e.target.value)}
                    className="border-none bg-gray-300 rounded-lg text-center p-2"
                />
            </div>

            {/* Apply Changes Button */}
            <div>
                <button className="text-white bg-gray-700 p-4 border-none rounded-2xl mt-12 hover:bg-gray-300 hover:text-black font-semibold text-lg transition duration-300"
                    onClick={applyChanges}
                >
                    Apply Changes
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
