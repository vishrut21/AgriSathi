import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfService() {
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
            <FileText size={32} className="text-green-600 mr-3" />
            Terms of Service
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8">
            <p className="text-gray-500 mb-6">Effective Date: March 2, 2026</p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using AgriSathi, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  AgriSathi provides AI-powered agricultural assistance including weather forecasts, crop advice, pest detection, and government scheme information. Our services are provided "as is" and we strive to maintain accuracy but cannot guarantee 100% accuracy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Accounts</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must provide accurate information</li>
                  <li>One person may not maintain multiple accounts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">4. Acceptable Use</h2>
                <p className="text-gray-600 leading-relaxed mb-2">You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>Use the service for illegal purposes</li>
                  <li>Attempt to bypass security measures</li>
                  <li>Share misleading information</li>
                  <li>Harass other users</li>
                  <li>Reverse engineer our AI systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">5. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content, features, and functionality of AgriSathi are owned by us and protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">6. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  AgriSathi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">7. Modifications to Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify or discontinue any part of our service without notice. We are not liable for any modifications or discontinuation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">8. Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may terminate or suspend your account immediately for violations of these terms, without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">9. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms shall be governed by the laws of India, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">10. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  For questions about these Terms, contact us at:<br />
                  Email: legal@agrisathi.com<br />
                  Phone: +91 12345 67890
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}