import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send to backend
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-gray-100 rounded-lg transition mr-4"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <MessageSquare size={32} className="text-green-600 mr-3" />
            Share Your Feedback
          </h1>
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-4">Your feedback helps us improve AgriSathi for farmers like you.</p>
              <p className="text-sm text-gray-500">Redirecting to home page...</p>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8">
              {/* Rating Stars */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">How would you rate your experience?</h2>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={36}
                        className={`${
                          (hover || rating) >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Feedback Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feature">Feature Request</option>
                    <option value="scheme">Scheme Information</option>
                    <option value="weather">Weather Data</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Feedback</label>
                  <textarea
                    rows="5"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you like or what we can improve..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!rating || !feedback}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Submit Feedback</span>
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                Your feedback is anonymous and helps us serve you better
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}