import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, Upload, Camera, Image, X, CheckCircle,
  AlertCircle, Bug, Leaf, Droplets, ThermometerSun,
  ChevronDown, Search, Info, Award, Shield,
  Calendar, Clock, Download, Share2, Bookmark,
  BookmarkCheck, Sparkles, TrendingUp, HelpCircle
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PestDetection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [savedDiagnoses, setSavedDiagnoses] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pestDetectionHistory');
    if (saved) {
      setDetectionHistory(JSON.parse(saved));
    }
    const savedDiag = localStorage.getItem('savedDiagnoses');
    if (savedDiag) {
      setSavedDiagnoses(JSON.parse(savedDiag));
    }
  }, []);

  // Cleanup camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setUploadProgress(0);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    } else {
      toast.error('Please upload an image file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setCameraActive(true);
      setActiveTab('camera');
      
      // Wait for video to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      toast.error('Could not access camera');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        processImage(file);
        
        // Stop camera
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
          setCameraActive(false);
        }
        setActiveTab('upload');
      }, 'image/jpeg');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraActive(false);
    }
  };

  // ========== REPLACED SECTION 1: handleSubmit with real API ==========
  const handleSubmit = async () => {
    if (!image) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pest-detection`, formData, { headers });
      
      setResult(response.data);
      
      // Save to history
      const historyEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        image: preview,
        result: response.data,
        location: "Detected from upload"
      };
      const updatedHistory = [historyEntry, ...detectionHistory].slice(0, 10);
      setDetectionHistory(updatedHistory);
      localStorage.setItem('pestDetectionHistory', JSON.stringify(updatedHistory));
      
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Analysis failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // ========== END OF REPLACED SECTION 1 ==========

  const resetAnalysis = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setUploadProgress(0);
    if (stream) {
      stopCamera();
    }
  };

  const saveDiagnosis = () => {
    if (!result) return;
    
    const saved = [...savedDiagnoses, {
      id: Date.now(),
      date: new Date().toISOString(),
      disease: result.disease || (result.analysis ? result.analysis.substring(0, 50) : 'Unknown'),
      confidence: result.confidence || 95,
      image: preview
    }];
    setSavedDiagnoses(saved);
    localStorage.setItem('savedDiagnoses', JSON.stringify(saved));
    toast.success('Diagnosis saved!');
  };

  const isSaved = () => {
    if (!result) return false;
    const diseaseName = result.disease || (result.analysis ? result.analysis.substring(0, 30) : '');
    return savedDiagnoses.some(d => d.disease === diseaseName);
  };

  const getSeverityColor = (severity) => {
    switch(severity?.toLowerCase()) {
      case 'mild': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'moderate': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'severe': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="mb-4 sm:mb-0 flex items-center text-gray-600 hover:text-red-600 transition group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition" /> 
            Back to Home
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-white/80 backdrop-blur rounded-xl hover:bg-white transition flex items-center space-x-2"
            >
              <Clock size={18} className="text-red-600" />
              <span>History ({detectionHistory.length})</span>
            </button>
            
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
              <Bug size={18} />
              <span className="font-semibold">AI Pest Detector</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Pest & Disease Detection</h1>
          <p className="text-xl opacity-90 mb-4">Upload a photo of your crop for instant AI-powered diagnosis and treatment recommendations</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full flex items-center space-x-2">
              <Sparkles size={18} />
              <span>98% Accuracy</span>
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full flex items-center space-x-2">
              <Bug size={18} />
              <span>50+ Diseases Detected</span>
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full flex items-center space-x-2">
              <Shield size={18} />
              <span>Instant Treatment</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload Section */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
              {/* Tabs */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition ${
                    activeTab === 'upload'
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Upload size={18} />
                  <span>Upload</span>
                </button>
                <button
                  onClick={startCamera}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition ${
                    activeTab === 'camera'
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Camera size={18} />
                  <span>Camera</span>
                </button>
              </div>

              {activeTab === 'upload' && !cameraActive && (
                <div
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-red-500 hover:bg-red-50/50 transition group"
                >
                  {preview ? (
                    <div className="relative">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="max-h-64 mx-auto rounded-xl shadow-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetAnalysis();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-red-100 text-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                        <Upload size={32} />
                      </div>
                      <p className="text-gray-700 font-semibold mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}

              {activeTab === 'camera' && cameraActive && (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      <button
                        onClick={capturePhoto}
                        className="bg-white text-red-600 p-4 rounded-full shadow-xl hover:bg-gray-100 transition"
                      >
                        <Camera size={24} />
                      </button>
                      <button
                        onClick={stopCamera}
                        className="bg-red-600 text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {image && !result && (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      <span>Analyze Image</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Info size={20} className="text-red-600 mr-2" />
                Quick Tips for Better Detection
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Take photo in natural daylight</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Capture affected area clearly</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Include healthy parts for comparison</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Avoid blurry or distant shots</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {/* ========== REPLACED SECTION 2: Result Display ========== */}
            {result ? (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">🔍 Diagnosis Results</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={saveDiagnosis}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      {isSaved() ? <BookmarkCheck size={20} className="text-red-600" /> : <Bookmark size={20} />}
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                {result.success ? (
                  /* Gemini AI Result */
                  <div>
                    <div className="bg-green-50 p-4 rounded-xl mb-4 flex items-center space-x-2">
                      <Sparkles size={20} className="text-green-600" />
                      <p className="text-sm text-green-700">✨ Analyzed by Google Gemini AI</p>
                    </div>
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {result.analysis}
                    </div>
                  </div>
                ) : (
                  /* Fallback Mock Result */
                  <div>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="bg-red-100 p-3 rounded-2xl">
                        <Bug size={32} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{result.disease}</h3>
                        <p className="text-sm text-gray-500">Confidence: {result.confidence}%</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-700 whitespace-pre-line">{result.treatment}</p>
                    </div>
                    
                    {result.note && (
                      <p className="text-xs text-gray-400 mt-2">{result.note}</p>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-4">Uploaded: {new Date().toLocaleString()}</p>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center">
                <Bug size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Analysis Yet</h3>
                <p className="text-gray-500">Upload a photo to detect pests and diseases</p>
              </div>
            )}
            {/* ========== END OF REPLACED SECTION 2 ========== */}

            {/* Action Buttons */}
            {result && (
              <div className="flex space-x-3">
                <button
                  onClick={resetAnalysis}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  New Analysis
                </button>
                <button
                  onClick={() => navigate('/chat')}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition"
                >
                  Ask Expert
                </button>
              </div>
            )}
          </div>
        </div>

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Detection History</h3>
                <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                {detectionHistory.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No detection history yet</p>
                ) : (
                  <div className="space-y-4">
                    {detectionHistory.map((entry) => (
                      <div key={entry.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                        <div className="flex items-start space-x-4">
                          {entry.image && (
                            <img 
                              src={entry.image} 
                              alt="Detection" 
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {entry.result?.disease || 'AI Analysis'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                                </p>
                              </div>
                              {entry.result?.confidence && (
                                <span className={`text-sm font-semibold ${getConfidenceColor(entry.result.confidence)}`}>
                                  {entry.result.confidence}%
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{entry.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        >
          <ChevronDown size={24} className="rotate-180 group-hover:-translate-y-1 transition" />
        </button>
      </div>
    </div>
  );
}
