import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, MessageCircle, Phone, Video } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const helpTopics = [
    { icon: <MessageCircle />, title: "Getting Started", desc: "New to AgriSathi? Start here", color: "bg-green-100 text-green-600" },
    { icon: <Video />, title: "Video Tutorials", desc: "Watch how-to guides", color: "bg-blue-100 text-blue-600" },
    { icon: <Mail />, title: "Email Support", desc: "Get help via email", color: "bg-yellow-100 text-yellow-600" },
    { icon: <Phone />, title: "Phone Support", desc: "Talk to our team", color: "bg-red-100 text-red-600" },
  ];

  const guides = [
    "How to check weather forecast",
    "Using pest detection feature",
    "Finding government schemes",
    "Changing language settings",
    "Saving favorite schemes",
    "Crop advice recommendations",
    "Creating your farm profile",
    "Understanding AI responses"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg transition mr-4">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <HelpCircle size={32} className="text-green-600 mr-3" />
            Help Center
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none shadow-lg"
          />
        </div>

        {/* Help Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpTopics.map((topic, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition cursor-pointer">
              <div className={`w-12 h-12 rounded-xl ${topic.color} flex items-center justify-center mb-4`}>
                {topic.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{topic.title}</h3>
              <p className="text-sm text-gray-500">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* Popular Guides */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide, index) => (
              <button
                key={index}
                className="text-left p-3 hover:bg-green-50 rounded-xl transition flex items-center space-x-2"
              >
                <span className="text-green-600">📘</span>
                <span className="text-gray-700">{guide}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Need more help?</h2>
          <p className="mb-6 opacity-90">Our support team is available 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
              Call +91 12345 67890
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}