import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Login' button and select 'Sign up'. You can register using your email or Google account. It's completely free!"
    },
    {
      question: "Is AgriSathi really free?",
      answer: "Yes! AgriSathi is completely free for all farmers. We believe in providing equal access to farming technology for everyone."
    },
    {
      question: "How accurate is the weather data?",
      answer: "We use OpenWeatherMap API which provides highly accurate, real-time weather data updated every hour. Our forecasts are 95% accurate."
    },
    {
      question: "Can I use AgriSathi in my local language?",
      answer: "Absolutely! AgriSathi supports 22 Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, and more. Just select your preferred language from the dropdown."
    },
    {
      question: "How does pest detection work?",
      answer: "Simply upload a photo of your affected crop, and our AI (powered by Google Gemini) will analyze it to identify diseases and suggest treatments."
    },
    {
      question: "Is my data safe?",
      answer: "Yes! We use Firebase Authentication and encryption to keep your data secure. We never share your personal information with third parties."
    }
  ];

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
            <HelpCircle size={32} className="text-green-600 mr-3" />
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {openItems[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {openItems[index] && (
                    <div className="p-4 bg-green-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-8 p-6 bg-green-100 rounded-xl text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">Can't find what you're looking for? Reach out to us directly.</p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}