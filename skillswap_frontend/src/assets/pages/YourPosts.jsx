import { header } from "framer-motion/client";
import { useEffect } from "react";
import { useState } from "react";
import Post from "./Post";
import RequirementCard from "../components/RequirementCard";
import MyPost from "../components/MyPost";
function YourPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getMyPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8080/api/users/posts/myPosts", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data = await response.json();
                console.log(data);

                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        getMyPosts();
    }, []);




    return (
        <div className="pt-28 bg-gray-900 min-h-screen  flex flex-col w-screen  items-center gap-12">
            <div className="text-gray-300 font-semibold text-3xl">Your Posts</div>

            {posts.length == 0 ? <div>No posts yet. </div> :
                <div className="flex flex-wrap gap-4">
                    {posts.map((post, index) => (
                  
                            <MyPost
                                key={index}
                                image={post.user.profileImageUrl}
                                name={post.user.name}
                                location={post.user.location}
                                needs={post.requirement}
                                offers={post.offer}
                                rating={4.5}
                                id={post.id}
                                u_id={post.user.id}
                                className="w-full max-w-xs md:max-w-sm mx-auto"
                            />
                        
                    ))}
                </div>
            }
        </div>
    );
}

export default YourPosts