import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, Sprout, Droplets, ThermometerSun, Leaf,
  Calendar, MapPin, Sun, Cloud, Wind, TrendingUp,
  ChevronDown, Award, AlertCircle, CheckCircle,
  FlaskConical, Tractor, Wheat, Apple, Flower2
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CropAdvice() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [soilData, setSoilData] = useState({
    type: '',
    ph: '',
    nitrogen: 'medium',
    phosphorus: 'medium',
    potassium: 'medium',
  });
  const [climateData, setClimateData] = useState({
    season: '',
    region: '',
    rainfall: 'medium',
    temperature: 'moderate',
  });
  const [recommendations, setRecommendations] = useState(null);
  const [savedFarms, setSavedFarms] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved farms from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedFarms');
    if (saved) {
      setSavedFarms(JSON.parse(saved));
    }
  }, []);

  const soilTypes = [
    { value: 'loamy', label: 'Loamy Soil', icon: <Leaf className="text-green-600" />, description: 'Best for most crops' },
    { value: 'clay', label: 'Clay Soil', icon: <Droplets className="text-blue-600" />, description: 'Good for rice, wheat' },
    { value: 'sandy', label: 'Sandy Soil', icon: <Sun className="text-yellow-600" />, description: 'Ideal for groundnut, millet' },
    { value: 'black', label: 'Black Soil', icon: <FlaskConical className="text-gray-600" />, description: 'Perfect for cotton' },
    { value: 'red', label: 'Red Soil', icon: <Flower2 className="text-red-600" />, description: 'Good for pulses' },
    { value: 'alluvial', label: 'Alluvial Soil', icon: <Wind className="text-brown-600" />, description: 'Rich for vegetables' },
  ];

  const seasons = [
    { value: 'kharif', label: 'Kharif (Monsoon)', months: 'June-October', icon: <Cloud /> },
    { value: 'rabi', label: 'Rabi (Winter)', months: 'November-April', icon: <Sun /> },
    { value: 'zaid', label: 'Zaid (Summer)', months: 'April-June', icon: <ThermometerSun /> },
  ];

  const regions = [
    'North India', 'South India', 'East India', 'West India', 'Central India', 'North-East'
  ];

  const nutrientLevels = ['low', 'medium', 'high'];

  // Mock crop recommendations
  const getRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      const mockRecommendations = {
        primary: [
          { 
            name: 'Wheat', 
            confidence: 95, 
            season: 'Rabi',
            duration: '120-150 days',
            water: 'Medium',
            soil: 'Loamy/Clay',
            profit: 'High',
            icon: <Wheat className="text-yellow-600" />,
            tips: [
              'Sow in November-December',
              'Use disease-free seeds',
              'Apply fertilizer at sowing time'
            ]
          },
          { 
            name: 'Mustard', 
            confidence: 88, 
            season: 'Rabi',
            duration: '130-150 days',
            water: 'Low',
            soil: 'Loamy/Sandy',
            profit: 'High',
            icon: <Flower2 className="text-yellow-600" />,
            tips: [
              'Sow in October',
              'Keep 45cm row spacing',
              'Harvest when pods turn yellow'
            ]
          },
        ],
        alternative: [
          { name: 'Barley', confidence: 82, season: 'Rabi', duration: '120 days' },
          { name: 'Gram', confidence: 78, season: 'Rabi', duration: '140 days' },
        ],
        companion: [
          { name: 'Lentil', benefit: 'Fix nitrogen in soil' },
          { name: 'Pea', benefit: 'Good for intercropping' },
        ],
        fertilizers: [
          { name: 'DAP', amount: '50 kg/acre', time: 'At sowing' },
          { name: 'Urea', amount: '40 kg/acre', time: '30 days after sowing' },
          { name: 'Potash', amount: '20 kg/acre', time: 'Before flowering' },
        ],
        market: {
          price: '₹2125/quintal',
          trend: 'up',
          demand: 'High',
          bestTime: 'March-April',
        }
      };
      setRecommendations(mockRecommendations);
      setStep(3);
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      getRecommendations();
    }
  };

  const saveFarm = () => {
    const farmData = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      soil: soilData,
      climate: climateData,
      recommendations: recommendations
    };
    const updated = [...savedFarms, farmData];
    setSavedFarms(updated);
    localStorage.setItem('savedFarms', JSON.stringify(updated));
    toast.success('Farm details saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="mb-4 sm:mb-0 flex items-center text-gray-600 hover:text-green-600 transition group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition" /> 
            Back to Home
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-white/80 backdrop-blur rounded-xl hover:bg-white transition flex items-center space-x-2"
            >
              <Calendar size={18} className="text-green-600" />
              <span>Saved Farms ({savedFarms.length})</span>
            </button>
            
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
              <Sprout size={18} />
              <span className="font-semibold">Smart Crop Advisor</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 max-w-3xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                step >= i 
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i ? <CheckCircle size={20} /> : i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > i ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Soil Analysis</h2>
              <p className="text-gray-600 mb-8">Tell us about your soil to get personalized recommendations</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Soil Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Soil Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {soilTypes.map((soil) => (
                      <button
                        key={soil.value}
                        type="button"
                        onClick={() => setSoilData({...soilData, type: soil.value})}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          soilData.type === soil.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-2">{soil.icon}</div>
                          <div className="font-semibold text-gray-800">{soil.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{soil.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Soil pH */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Soil pH Level</label>
                  <input
                    type="range"
                    min="4"
                    max="9"
                    step="0.1"
                    value={soilData.ph || 7}
                    onChange={(e) => setSoilData({...soilData, ph: e.target.value})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Acidic (4.0)</span>
                    <span className="font-bold text-green-600">Current: {soilData.ph || 7.0}</span>
                    <span>Alkaline (9.0)</span>
                  </div>
                </div>

                {/* NPK Levels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['nitrogen', 'phosphorus', 'potassium'].map((nutrient) => (
                    <div key={nutrient}>
                      <label className="block text-gray-700 font-semibold mb-2 capitalize">
                        {nutrient} Level
                      </label>
                      <select
                        value={soilData[nutrient]}
                        onChange={(e) => setSoilData({...soilData, [nutrient]: e.target.value})}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 outline-none"
                      >
                        {nutrientLevels.map(level => (
                          <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={!soilData.type}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Climate Analysis
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Climate Conditions</h2>
              <p className="text-gray-600 mb-8">Tell us about your growing conditions</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Season */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Growing Season</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {seasons.map((season) => (
                      <button
                        key={season.value}
                        type="button"
                        onClick={() => setClimateData({...climateData, season: season.value})}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          climateData.season === season.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-green-600">{season.icon}</div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-800">{season.label}</div>
                            <div className="text-xs text-gray-500">{season.months}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Region</label>
                  <select
                    value={climateData.region}
                    onChange={(e) => setClimateData({...climateData, region: e.target.value})}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 outline-none"
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Rainfall */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Expected Rainfall</label>
                  <div className="flex space-x-3">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setClimateData({...climateData, rainfall: level})}
                        className={`flex-1 p-3 rounded-xl border-2 capitalize ${
                          climateData.rainfall === level
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Temperature Range</label>
                  <div className="flex space-x-3">
                    {['cool', 'moderate', 'hot'].map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setClimateData({...climateData, temperature: temp})}
                        className={`flex-1 p-3 rounded-xl border-2 capitalize ${
                          climateData.temperature === temp
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!climateData.season || !climateData.region}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-[1.02] disabled:opacity-50"
                  >
                    Get Recommendations
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && recommendations && (
            <div className="space-y-6">
              {/* Loading State */}
              {loading && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800">Analyzing your farm data...</h3>
                  <p className="text-gray-600">Our AI is finding the best crops for you</p>
                </div>
              )}

              {/* Results */}
              {!loading && (
                <>
                  {/* Primary Recommendations */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Recommended Crops</h2>
                      <button
                        onClick={saveFarm}
                        className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition"
                      >
                        <Award size={18} />
                        <span>Save This Plan</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommendations.primary.map((crop, index) => (
                        <div key={index} className="border border-green-200 rounded-2xl p-6 hover:shadow-xl transition">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-3 bg-green-100 rounded-xl">{crop.icon}</div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                                <span className="text-sm text-green-600">{crop.season} Season</span>
                              </div>
                            </div>
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {crop.confidence}% Match
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <Calendar size={16} className="mx-auto mb-1 text-gray-600" />
                              <span className="text-gray-600">{crop.duration}</span>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <Droplets size={16} className="mx-auto mb-1 text-blue-600" />
                              <span className="text-gray-600">{crop.water}</span>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <TrendingUp size={16} className="mx-auto mb-1 text-green-600" />
                              <span className="text-gray-600">{crop.profit}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Growing Tips:</h4>
                            <ul className="space-y-1">
                              {crop.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <CheckCircle size={14} className="text-green-600 mt-1 flex-shrink-0" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alternative & Companion Crops */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Alternative Crops */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Alternative Crops</h3>
                      <div className="space-y-3">
                        {recommendations.alternative.map((crop, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                              <span className="font-semibold text-gray-800">{crop.name}</span>
                              <span className="text-sm text-gray-500 ml-2">{crop.season}</span>
                            </div>
                            <span className="text-green-600 text-sm font-semibold">{crop.confidence}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Companion Crops */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Companion Planting</h3>
                      <div className="space-y-3">
                        {recommendations.companion.map((crop, index) => (
                          <div key={index} className="p-3 bg-green-50 rounded-xl">
                            <span className="font-semibold text-gray-800">{crop.name}</span>
                            <p className="text-sm text-gray-600 mt-1">{crop.benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fertilizer Schedule & Market Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fertilizer Schedule */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Fertilizer Schedule</h3>
                      <div className="space-y-3">
                        {recommendations.fertilizers.map((fert, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                              <span className="font-semibold text-gray-800">{fert.name}</span>
                              <p className="text-xs text-gray-500">{fert.time}</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                              {fert.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Market Information */}
                    <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-3xl p-6 shadow-xl text-white">
                      <h3 className="text-lg font-bold mb-4">Market Outlook</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Current Price</span>
                          <span className="text-2xl font-bold">{recommendations.market.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Demand</span>
                          <span className="bg-white/20 px-3 py-1 rounded-full">{recommendations.market.demand}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Best Selling Time</span>
                          <span className="bg-white/20 px-3 py-1 rounded-full">{recommendations.market.bestTime}</span>
                        </div>
                        <div className="mt-4 p-3 bg-white/20 rounded-xl">
                          <p className="text-sm flex items-center">
                            <TrendingUp size={16} className="mr-2" />
                            Prices are expected to rise in coming weeks
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
                    >
                      Start Over
                    </button>
                    <button
                      onClick={() => navigate('/chat')}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition transform hover:scale-[1.02]"
                    >
                      Ask Expert
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Saved Farms History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Your Saved Farms</h3>
                <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-gray-700">
                  <ArrowLeft size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                {savedFarms.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No saved farms yet</p>
                ) : (
                  <div className="space-y-4">
                    {savedFarms.map((farm) => (
                      <div key={farm.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-800">Farm saved on {farm.date}</span>
                          <button className="text-red-500 text-sm">Delete</button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Soil: {farm.soil.type} | Season: {farm.climate.season} | Region: {farm.climate.region}
                        </p>
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
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        >
          <ChevronDown size={24} className="rotate-180 group-hover:-translate-y-1 transition" />
        </button>
      </div>
    </div>
  );
}