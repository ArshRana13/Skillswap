import React from 'react';

function Product() {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Our Product</h1>
        <p className="text-lg text-gray-400 mt-4">Get a glimple of what we offer!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Skill Matching System</h2>
          <p className="text-gray-400">Find the perfect skill-exchange partner based on expertise, interests, and past trades.</p>
        </div>
        {/* Service 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Real-Time Chat & Video Calls</h2>
          <p className="text-gray-400">Communicate seamlessly with skill traders using built-in messaging and video call features.</p>
        </div>
        {/* Service 3 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">24/7 Chat Support</h2>
          <p className="text-gray-400">Get instant assistance on trades, negotiations, and platform features.</p>
        </div>
        {/* Service 4 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Skill Verification & Reputation System</h2>
          <p className="text-gray-400">Ensure trust and credibility with our rating and review system, backed by verified skill exchanges.</p>
        </div>
        {/* Service 5 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Smart Barter Proposal System</h2>
          <p className="text-gray-400">Easily create and negotiate skill trade offers with our intuitive proposal system.</p>
        </div>
        {/* Service 6 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Secure & Transparent Exchange Tracking</h2>
          <p className="text-gray-400">Monitor ongoing trades, set deadlines, and ensure fair exchanges with built-in tracking tools.</p>
        </div>
      </div>
    </div>
  );
}

export default Product;