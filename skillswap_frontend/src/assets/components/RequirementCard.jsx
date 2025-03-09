import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { FaMapMarkerAlt, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function RequirementCard({image, name, location, needs, offers, rating, id, u_id}) {

    const navigate = useNavigate();

    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
            className=" h-fit min-w-3xs max-w-md bg-gray-200 dark:bg-gray-900 p-5 rounded-lg shadow-md transition-all duration-300"
        >
            {/* Top Section: Profile Image & User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="h-16 w-16 rounded-full  border-2 border-blue-500">
                    <button>
                    <img src={image} alt="User" className="h-16 w-16 border-none rounded-full object-cover" />
                    </button>
                </div>
                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
                    <div className="flex items-center justify-center sm:justify-start text-gray-500 dark:text-gray-400 text-sm">
                        <FaMapMarkerAlt className="mr-1 text-blue-500" />
                        {location}
                    </div>
                </div>
            </div>

            {/* Skills Needed & Offered */}
            <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-blue-600">Needs:</span> {needs}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-green-600">Offers:</span> {offers}
                </p>
            </div>

            {/* Rating & Action */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex text-yellow-500">
                    {[...Array(filledStars)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                    {hasHalfStar && <FaStarHalfAlt />}
                    {[...Array(emptyStars)].map((_, i) => (
                        <FaRegStar key={i} />
                    ))}
                </div>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-all duration-300"
                    onClick={() => navigate(`/viewPost/${id}/${u_id}`)}
                >
                    Ask more
                </motion.button>
            </div>
        </motion.div>
        
    );
}

export default RequirementCard;
