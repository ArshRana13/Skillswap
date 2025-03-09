import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { FaMapMarkerAlt, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


function MyPost({ image, name, location, needs, offers, rating, id, u_id }) {


    async function deletePost(){
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/users/posts/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            else
            {
                alert("post deleted successfully!");
            }

            
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }


    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
            className=" h-fit min-w-3xs max-w-md bg-gray-200 dark:bg-gray-900 p-5 rounded-lg shadow-md transition-all duration-300 relative"
        >
            <button
                className="absolute top-0 right-0 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-all"
                onClick={deletePost}
            >
                <FaTimes size={16} />
            </button>


            {/* Skills Needed & Offered */}
            <div className=" bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-blue-600">Needs:</span> {needs}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-green-600">Offers:</span> {offers}
                </p>
            </div>


        </motion.div>

    );
}

export default MyPost;
