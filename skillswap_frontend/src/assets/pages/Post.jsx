import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const skills = [
    "Graphic Designing",
    "Cooking",
    "Singing",
    "React Development",
    "Flutter Development",
    "UI/UX Designing",
    "Backend Development",
    "Frontend Development",
    "Photoshop",
    "Photography",
    "Python Development",
    "Java Development"
];

function Post({ isOpen, onClose }) {
    if (!isOpen) return null; // Don't render when closed

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 overflow-scroll">
            <div className="relative bg-gray-950 p-6 rounded-lg shadow-lg w-96">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-all"
                    onClick={onClose}
                >
                    <FaTimes size={16} />
                </button>

                <h2 className="text-white text-xl font-bold mb-4 text-center">Post Your Skill</h2>

                {/* Offer Input */}
                <label className="text-white font-medium">What are you offering?</label>
                <select required className="w-full p-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                    <option value="" disabled selected>Choose a skill...</option>
                    {skills.map((skill, index) => (
                        <option key={index} value={skill}>{skill}</option>
                    ))}
                </select>

                {/* Expectation Input */}
                <label className="text-white font-medium mt-4 block">What are you expecting in return?</label>
                <select required className="w-full p-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                    <option value="" disabled selected>Choose a skill...</option>
                    {skills.map((skill, index) => (
                        <option key={index} value={skill}>{skill}</option>
                    ))}
                </select>

                <input type="text" />

                {/* Post Button */}
                <button className="w-full mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300">
                    Post
                </button>
            </div>
        </div>
    );
}

export default Post;
