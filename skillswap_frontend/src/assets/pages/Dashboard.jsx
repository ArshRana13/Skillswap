import { useEffect, useRef, useState } from "react";
import post from "../hooks/post"; // Adjust if needed
import RequirementCard from "../components/RequirementCard";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import images from '../images/images.jpeg'
import { motion, AnimatePresence } from "framer-motion";

const tags = [
  "Graphic Designing",
  "React Development",
  "Flutter Development",
  "UI/UX Designing",
  "Backend Development",
  "Frontend Development",
  "Photoshop",
  "Photography",
  "Python Development",
  "Java Development",
  "Machine Learning",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Game Development",
  "Mobile App Development",
  "Full Stack Development",
  "Blockchain Development",
  "Artificial Intelligence",
  "Node.js Development",
  "Django Development",
  "Spring Boot Development",
  "SEO (Search Engine Optimization)",
  "Digital Marketing",
  "Video Editing",
  "Content Writing",
  "Technical Writing",
  "3D Modeling",
  "Augmented Reality (AR) & Virtual Reality (VR)"
];


function Dashboard() {
  const [offer, setOffer] = useState("");
  const [requirement, setRequirement] = useState("");
  const [posts, setPosts] = useState([]);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const tagsRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/users/posts/unaccepted", {
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
    };

    fetchPosts();
  }, []);

  const handlePost = async () => {
    if(offer == "" || requirement == "" || description == "" || type == "")
    {
      alert("Please fill all the fields");
      return;
    }
    await post({ offer, requirement, description, type});
    setIsPostOpen(false);
  };

  const scrollLeft = () => {
    if (tagsRef.current) {
      tagsRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tagsRef.current) {
      tagsRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = selectedTags.length
    ? posts.filter((post) => selectedTags.some((tag) => post.requirement.includes(tag) || post.offer.includes(tag)))
    : posts;

  return (
    <div className="pt-14">
      <div className="bg-blue-700 text-white py-4 flex justify-center items-center px-2 flex-col sm:flex-row text-center">
        Want a Graphic Designer in exchange for Backend Development?
        <button
          className="px-4 bg-black p-1 border-none rounded-lg mx-4 hover:bg-blue-950 hover:px-6 transition-all duration-300"
          onClick={() => setIsPostOpen(true)}
        >
          Post
        </button>
      </div>

      <div className={`overflow-x-hidden w-full min-h-screen bg-gray-900 flex flex-col items-center p-4 ${isPostOpen ? "blur-sm" : ""}`}>
        <div className="relative w-full max-w-4xl flex items-center">
          <button className="left-0 z-10 hover:bg-gray-600 transition duration-300 bg-gray-800 text-white p-2 rounded-full shadow-md" onClick={scrollLeft}>
            <FaChevronLeft size={20} />
          </button>
          <div ref={tagsRef} className="flex overflow-x-hidden scrollbar-hide space-x-3 px-2 py-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-nowrap ${selectedTags.includes(tag) ? "bg-blue-600" : "bg-gray-800 text-white"}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <button className="right-0 hover:bg-gray-600 transition duration-300 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md" onClick={scrollRight}>
            <FaChevronRight size={20} />
          </button>
        </div>

        <div id="cards" className="mt-16  min-h-screen w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-normal">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <RequirementCard
                key={index}
                image={post.user.profileImageUrl}
                name={post.user.name}
                location= {post.user.location}
                needs={post.requirement}
                offers={post.offer}
                type = {post.type}
                
                id= {post.id}
                u_id = {post.user.id}
                className="w-full max-w-xs md:max-w-sm mx-auto"
              />
            ))
          ) : (
            <p className="text-white text-lg">No posts found.</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isPostOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-gray-950 p-6 rounded-lg shadow-lg w-96">
              <button className="absolute top-2 right-2 text-white bg-gray-600 p-2 rounded-full hover:bg-red-700 transition-all" onClick={() => setIsPostOpen(false)}>
                <FaTimes size={16} />
              </button>
              <h2 className="text-white text-xl font-bold mb-4 text-center">Post Your Requirement</h2>
              <label className="text-white font-medium">What are you offering?</label>
              <select required className="bg-black hover:bg-gray-800 text-white w-full p-2 mt-2 border border-gray-300 rounded-md" value={offer} onChange={(e) => setOffer(e.target.value)}>
                <option value="" disabled>Choose a skill...</option>
                {tags.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              <label className="text-white font-medium mt-4 block">What are you expecting in return?</label>
              <select required className="bg-black hover:bg-gray-800 text-white w-full p-2 mt-2 border border-gray-300 rounded-md" value={requirement} onChange={(e) => setRequirement(e.target.value)}>
                <option value="" disabled>Choose a skill...</option>
                {tags.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>

              <label className="text-white font-medium mt-4 block">How do you expect the work to be done?</label>
              <select required className="bg-black hover:bg-gray-800 text-white w-full p-2 mt-2 border border-gray-300 rounded-md" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="" disabled>Choose type...</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
              </select>

              <textarea name="" className="w-full bg-gray-900 mt-4 min-h-18 max-h-28 border-2 text-gray-400 overflow-y-auto" placeholder="Add a description" id=""
              onChange={(e)=> setDescription(e.target.value)}
              ></textarea>
              <button className="w-full mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg" onClick={handlePost}>
                Post
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;