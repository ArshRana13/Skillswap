import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { FaMapMarkerAlt, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function MyPost({image, name, location, needs, offers, rating, id, u_id}) {



    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
            className=" h-fit min-w-3xs max-w-md bg-gray-200 dark:bg-gray-900 p-5 rounded-lg shadow-md transition-all duration-300"
        >
            {/* Top Section: Profile Image & User Info */}
           

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
