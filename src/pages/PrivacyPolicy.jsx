import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

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
            <Shield size={32} className="text-green-600 mr-3" />
            Privacy Policy
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8">
            <p className="text-gray-500 mb-6">Last Updated: March 2, 2026</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to AgriSathi ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">2. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-2">We collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><span className="font-semibold">Personal Information:</span> Name, email address, phone number, and location data</li>
                  <li><span className="font-semibold">Farm Information:</span> Land size, crop types, soil data you choose to share</li>
                  <li><span className="font-semibold">Usage Data:</span> How you interact with our app, features you use</li>
                  <li><span className="font-semibold">Device Information:</span> IP address, browser type, device identifiers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>To provide and maintain our services</li>
                  <li>To personalize your experience</li>
                  <li>To improve our AI recommendations</li>
                  <li>To communicate with you about updates</li>
                  <li>To ensure security and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">4. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement industry-standard security measures including encryption, secure servers, and regular security audits. Your data is stored securely using Firebase and MongoDB with strict access controls.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">5. Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use trusted third-party services including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 mt-2">
                  <li>Firebase - for authentication and data storage</li>
                  <li>Google Gemini - for AI-powered assistance</li>
                  <li>OpenWeatherMap - for weather data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of communications</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:<br />
                  Email: privacy@agrisathi.com<br />
                  Phone: +91 12345 67890<br />
                  Address: New Delhi, India - 110001
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}