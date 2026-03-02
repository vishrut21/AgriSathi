import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, FileText, CheckCircle, XCircle, Award,
  ChevronDown, Search, Filter, Bookmark, BookmarkCheck,
  IndianRupee, Users, Calendar, LandPlot, HelpCircle,
  Download, Share2, Bell, TrendingUp, Shield,
  Leaf, Droplets, Tractor, Heart, Star, Clock
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Schemes() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEligibility, setShowEligibility] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [formData, setFormData] = useState({
    land_owned: 0,
    caste: 'general',
    income: 0,
    state: '',
    age: 30,
    gender: 'male',
    bpl_card: false,
    farmer_type: 'individual'
  });
  const [eligible, setEligible] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [expandedScheme, setExpandedScheme] = useState(null);

  const states = [
    'Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Madhya Pradesh',
    'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat', 'Andhra Pradesh',
    'Odisha', 'Telangana', 'Kerala', 'Jharkhand', 'Assam', 'Punjab',
    'Haryana', 'Chhattisgarh', 'Delhi', 'Jammu and Kashmir'
  ];

  const categories = [
    { id: 'all', name: 'All Schemes', icon: <FileText size={16} /> },
    { id: 'financial', name: 'Financial Aid', icon: <IndianRupee size={16} /> },
    { id: 'insurance', name: 'Insurance', icon: <Shield size={16} /> },
    { id: 'irrigation', name: 'Irrigation', icon: <Droplets size={16} /> },
    { id: 'equipment', name: 'Equipment', icon: <Tractor size={16} /> },
    { id: 'training', name: 'Training', icon: <Users size={16} /> },
  ];

  // Load saved schemes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedSchemes');
    if (saved) {
      setSavedSchemes(JSON.parse(saved));
    }
  }, []);

  // Fetch schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        // Mock data for now - replace with actual API later
        setTimeout(() => {
          const mockSchemes = [
            {
              id: 1,
              name: 'PM-KISAN',
              description: 'Income support of ₹6000 per year for farmers',
              fullDescription: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. It provides income support to all landholding farmers\' families across the country.',
              category: 'financial',
              amount: '₹6,000/year',
              eligibility: {
                landRequired: true,
                minLand: 0,
                maxLand: null,
                incomeCeiling: null,
                caste: 'all',
                ageMin: 18,
                ageMax: null,
                bplRequired: false,
                farmerType: 'all'
              },
              documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Passport Photo'],
              deadline: 'Ongoing',
              applicationMode: 'Online/Offline',
              benefits: ['Direct cash transfer', 'No middlemen', 'Yearly installment'],
              icon: <IndianRupee size={24} />,
              color: 'from-green-600 to-green-500',
              featured: true,
              applications: '11.5 Cr+',
              successRate: '98%'
            },
            {
              id: 2,
              name: 'Soil Health Card',
              description: 'Free soil testing and recommendations',
              fullDescription: 'Soil Health Card scheme aims to issue soil health cards to farmers every 2 years. It provides information to farmers on nutrient status of their soil and recommendation on appropriate dosage of nutrients to be applied.',
              category: 'training',
              amount: 'Free',
              eligibility: {
                landRequired: true,
                minLand: 0,
                maxLand: null,
                incomeCeiling: null,
                caste: 'all',
                ageMin: 18,
                ageMax: null,
                bplRequired: false,
                farmerType: 'all'
              },
              documents: ['Aadhaar Card', 'Land Records'],
              deadline: 'Ongoing',
              applicationMode: 'At Agriculture Department',
              benefits: ['Free soil testing', 'Fertilizer recommendations', 'Crop advice'],
              icon: <Leaf size={24} />,
              color: 'from-brown-600 to-brown-500',
              featured: true,
              applications: '8.2 Cr+',
              successRate: '95%'
            },
            {
              id: 3,
              name: 'Kisan Credit Card',
              description: 'Affordable credit up to ₹3 lakh for farmers',
              fullDescription: 'Kisan Credit Card (KCC) scheme provides farmers with timely access to credit for their agricultural needs. Farmers can get short-term loans for cultivation, purchase of equipment, and other expenses.',
              category: 'financial',
              amount: 'Up to ₹3,00,000',
              eligibility: {
                landRequired: true,
                minLand: 1,
                maxLand: null,
                incomeCeiling: null,
                caste: 'all',
                ageMin: 18,
                ageMax: 75,
                bplRequired: false,
                farmerType: 'all'
              },
              documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Passport Photo', 'Income Proof'],
              deadline: 'Ongoing',
              applicationMode: 'Banks/Online',
              benefits: ['Low interest rates', 'Flexible repayment', 'Insurance coverage'],
              icon: <Award size={24} />,
              color: 'from-blue-600 to-blue-500',
              featured: true,
              applications: '7.8 Cr+',
              successRate: '92%'
            },
            {
              id: 4,
              name: 'PMFBY',
              description: 'Crop insurance scheme for farmers',
              fullDescription: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) provides affordable crop insurance to farmers. It covers all food crops, oilseeds, and annual commercial/horticultural crops.',
              category: 'insurance',
              amount: 'Subsidized premium',
              eligibility: {
                landRequired: true,
                minLand: 0,
                maxLand: null,
                incomeCeiling: null,
                caste: 'all',
                ageMin: 18,
                ageMax: null,
                bplRequired: false,
                farmerType: 'all'
              },
              documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Crop Details'],
              deadline: 'Before sowing season',
              applicationMode: 'Bank/CSC/Online',
              benefits: ['Low premium', 'Quick claim settlement', 'Covers all natural risks'],
              icon: <Shield size={24} />,
              color: 'from-red-600 to-red-500',
              featured: true,
              applications: '5.6 Cr+',
              successRate: '89%'
            },
            {
              id: 5,
              name: 'PMKSY',
              description: 'Per Drop More Crop - Micro Irrigation',
              fullDescription: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) aims to enhance water efficiency through micro irrigation. Provides subsidies for drip and sprinkler irrigation systems.',
              category: 'irrigation',
              amount: '55-75% subsidy',
              eligibility: {
                landRequired: true,
                minLand: 0.5,
                maxLand: null,
                incomeCeiling: 500000,
                caste: 'all',
                ageMin: 18,
                ageMax: null,
                bplRequired: false,
                farmerType: 'all'
              },
              documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Project Report'],
              deadline: 'State-specific',
              applicationMode: 'Agriculture Department',
              benefits: ['Water saving up to 50%', 'Increased yield', 'Reduced electricity cost'],
              icon: <Droplets size={24} />,
              color: 'from-blue-600 to-cyan-500',
              featured: false,
              applications: '1.2 Cr+',
              successRate: '87%'
            },
            {
              id: 6,
              name: 'SMAM',
              description: 'Subsidy on farm mechanization',
              fullDescription: 'Sub-Mission on Agricultural Mechanization (SMAM) provides subsidies for purchase of agricultural machinery and equipment. Promotes farm mechanization among small and marginal farmers.',
              category: 'equipment',
              amount: '40-50% subsidy',
              eligibility: {
                landRequired: false,
                minLand: 0,
                maxLand: null,
                incomeCeiling: null,
                caste: 'all',
                ageMin: 18,
                ageMax: null,
                bplRequired: false,
                farmerType: 'individual'
              },
              documents: ['Aadhaar Card', 'Bank Account', 'Quotation', 'Caste Certificate'],
              deadline: 'State-specific',
              applicationMode: 'Agriculture Department',
              benefits: ['Modern equipment', 'Reduced labor cost', 'Higher efficiency'],
              icon: <Tractor size={24} />,
              color: 'from-yellow-600 to-orange-500',
              featured: false,
              applications: '85 Lakh+',
              successRate: '91%'
            }
          ];
          setSchemes(mockSchemes);
          setFilteredSchemes(mockSchemes);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching schemes:', error);
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // Filter schemes based on search and category
  useEffect(() => {
    let filtered = schemes;
    
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }
    
    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory, schemes]);

  const checkEligibility = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/check-eligibility`, formData);
      setEligible(response.data.eligible_schemes);
      toast.success('Eligibility check completed!');
    } catch (error) {
      console.error(error);
      toast.error('Error checking eligibility');
    }
  };

  const saveScheme = (scheme) => {
    let updated;
    if (savedSchemes.find(s => s.id === scheme.id)) {
      updated = savedSchemes.filter(s => s.id !== scheme.id);
      toast.success('Scheme removed from saved');
    } else {
      updated = [...savedSchemes, scheme];
      toast.success('Scheme saved for later');
    }
    setSavedSchemes(updated);
    localStorage.setItem('savedSchemes', JSON.stringify(updated));
  };

  const isSaved = (schemeId) => {
    return savedSchemes.some(s => s.id === schemeId);
  };

  const getEligibilityStatus = (scheme, formData) => {
    const elig = scheme.eligibility;
    
    if (elig.landRequired && formData.land_owned < elig.minLand) return false;
    if (elig.maxLand && formData.land_owned > elig.maxLand) return false;
    if (elig.incomeCeiling && formData.income > elig.incomeCeiling) return false;
    if (elig.caste !== 'all' && formData.caste !== elig.caste) return false;
    if (elig.ageMin && formData.age < elig.ageMin) return false;
    if (elig.ageMax && formData.age > elig.ageMax) return false;
    if (elig.bplRequired && !formData.bpl_card) return false;
    
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
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
              onClick={() => setShowSaved(!showSaved)}
              className="px-4 py-2 bg-white/80 backdrop-blur rounded-xl hover:bg-white transition flex items-center space-x-2"
            >
              <Bookmark size={18} className="text-green-600" />
              <span>Saved ({savedSchemes.length})</span>
            </button>
            
            <button
              onClick={() => setShowEligibility(!showEligibility)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl flex items-center space-x-2"
            >
              <CheckCircle size={18} />
              <span>Check Eligibility</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Government Schemes</h1>
          <p className="text-xl opacity-90 mb-4">Discover financial aid, insurance, and support programs for farmers</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full flex items-center space-x-2">
              <Award size={18} />
              <span>{schemes.length}+ Active Schemes</span>
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full flex items-center space-x-2">
              <Users size={18} />
              <span>25 Cr+ Farmers Benefited</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl flex items-center space-x-2 whitespace-nowrap transition ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Eligibility Checker Modal */}
        {showEligibility && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Check Scheme Eligibility</h3>
                <button onClick={() => setShowEligibility(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <form onSubmit={checkEligibility} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Land Owned (acres)</label>
                      <input
                        type="number"
                        value={formData.land_owned}
                        onChange={(e) => setFormData({...formData, land_owned: parseFloat(e.target.value)})}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Annual Income (₹)</label>
                      <input
                        type="number"
                        value={formData.income}
                        onChange={(e) => setFormData({...formData, income: parseFloat(e.target.value)})}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">State</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Caste</label>
                      <select
                        value={formData.caste}
                        onChange={(e) => setFormData({...formData, caste: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                      >
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bpl"
                      checked={formData.bpl_card}
                      onChange={(e) => setFormData({...formData, bpl_card: e.target.checked})}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-600"
                    />
                    <label htmlFor="bpl" className="text-gray-700">I have BPL Card</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition"
                  >
                    Check Eligibility
                  </button>
                </form>

                {eligible.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-bold text-gray-800 mb-3">You are eligible for:</h4>
                    <div className="space-y-2">
                      {eligible.map((scheme, index) => (
                        <div key={index} className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center space-x-2">
                          <CheckCircle size={18} className="flex-shrink-0" />
                          <span>{scheme}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Saved Schemes Modal */}
        {showSaved && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Saved Schemes</h3>
                <button onClick={() => setShowSaved(false)} className="text-gray-500 hover:text-gray-700">
                  <XCircle size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                {savedSchemes.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No saved schemes yet</p>
                ) : (
                  <div className="space-y-3">
                    {savedSchemes.map((scheme) => (
                      <div key={scheme.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 bg-gradient-to-r ${scheme.color} text-white rounded-lg`}>
                            {scheme.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{scheme.name}</p>
                            <p className="text-sm text-gray-500">{scheme.amount}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => saveScheme(scheme)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Schemes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => {
              const eligible = getEligibilityStatus(scheme, formData);
              const saved = isSaved(scheme.id);
              const expanded = expandedScheme === scheme.id;

              return (
                <div
                  key={scheme.id}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group"
                >
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${scheme.color} p-4 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    
                    <div className="flex justify-between items-start relative z-10">
                      <div className="p-2 bg-white/20 backdrop-blur rounded-xl">
                        {scheme.icon}
                      </div>
                      <div className="flex space-x-2">
                        {scheme.featured && (
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                            <Star size={12} className="mr-1" /> Featured
                          </span>
                        )}
                        <button
                          onClick={() => saveScheme(scheme)}
                          className="p-2 hover:bg-white/20 rounded-lg transition"
                        >
                          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mt-4 mb-1 relative z-10">{scheme.name}</h3>
                    <p className="text-sm opacity-90 relative z-10">{scheme.description}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-green-50 p-2 rounded-xl text-center">
                        <div className="text-sm text-gray-600">Amount</div>
                        <div className="font-bold text-green-700">{scheme.amount}</div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-xl text-center">
                        <div className="text-sm text-gray-600">Success Rate</div>
                        <div className="font-bold text-blue-700">{scheme.successRate}</div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={16} className="mr-2 text-gray-400" />
                        <span>{scheme.applications} farmers applied</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>Deadline: {scheme.deadline}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText size={16} className="mr-2 text-gray-400" />
                        <span>Mode: {scheme.applicationMode}</span>
                      </div>
                    </div>

                    {/* Eligibility Badge */}
                    <div className={`mb-4 p-2 rounded-xl ${
                      eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">You are {eligible ? '' : 'not'} eligible</span>
                        {eligible ? <CheckCircle size={18} /> : <XCircle size={18} />}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setExpandedScheme(expanded ? null : scheme.id)}
                        className="w-full flex items-center justify-between text-green-600 hover:text-green-700 transition"
                      >
                        <span className="font-semibold">{expanded ? 'Show Less' : 'View Details'}</span>
                        <ChevronDown size={18} className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>

                      {expanded && (
                        <div className="mt-4 space-y-4 animate-fadeIn">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Full Description</h4>
                            <p className="text-sm text-gray-600">{scheme.fullDescription}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Required Documents</h4>
                            <ul className="space-y-1">
                              {scheme.documents.map((doc, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <CheckCircle size={14} className="text-green-600 mt-1 flex-shrink-0" />
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Key Benefits</h4>
                            <ul className="space-y-1">
                              {scheme.benefits.map((benefit, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <Award size={14} className="text-green-600 mt-1 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
                              Apply Now
                            </button>
                            <button className="flex-1 border border-green-600 text-green-600 py-2 rounded-xl text-sm font-semibold hover:bg-green-50 transition">
                              Download
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No schemes found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
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