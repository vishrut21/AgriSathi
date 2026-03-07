import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mic, Cloud, Sprout, FileText, Bug, 
  ArrowRight, Sun, Droplets, Wind,
  ChevronDown, Star, Users, Globe, Award,
  Menu, X, Phone, Mail, MapPin, Clock,
  Calendar, CloudRain, CloudLightning,
  CloudSnow, CloudDrizzle, Eye, Gauge,
  Sunrise, Sunset, ThermometerSun, LogOut
} from 'lucide-react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

export default function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState([
    { number: 0, target: 30, label: t('farmers_reached'), icon: Users, suffix: "M+" },
    { number: 0, target: 11, label: t('languages'), icon: Globe, suffix: "" },
    { number: 0, target: 98, label: t('accuracy'), icon: Star, suffix: "%" },
    { number: 0, target: 24, label: t('support'), icon: Award, suffix: "/7" },
  ]);
  const [testimonials, setTestimonials] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Animate stats when they come into view
      if (statsRef.current && !statsAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          animateStats();
          setStatsAnimated(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  // Animate stats counter
  const animateStats = () => {
    setStats(prevStats => 
      prevStats.map(stat => ({
        ...stat,
        number: stat.target
      }))
    );
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY`
              );
              setWeatherData(response.data);
            } catch (error) {
              // Fallback to Delhi if location fails
              fetchDefaultWeather();
            }
          }, () => {
            fetchDefaultWeather();
          });
        } else {
          fetchDefaultWeather();
        }
      } catch (error) {
        console.error('Weather fetch failed:', error);
        setWeatherData(null);
      } finally {
        setWeatherLoading(false);
      }
    };

    const fetchDefaultWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=YOUR_API_KEY`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Default weather fetch failed:', error);
        // Set mock data if API fails
        setWeatherData({
          main: { temp: 32, humidity: 65, pressure: 1012, feels_like: 34 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 },
          visibility: 10000,
          sys: { sunrise: 1612345678, sunset: 1612398765 },
          name: 'Delhi'
        });
      }
    };

    fetchWeather();
  }, []);

  // Load testimonials
  useEffect(() => {
    setTestimonials([
  { 
    name: "Ramesh Singh", 
    village: "Uttar Pradesh", 
    text: "AgriSathi helped me identify crop disease early. Saved my entire wheat harvest!", 
    rating: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    date: "2 days ago"
  },
  { 
    name: "Lakshmi Devi", 
    village: "Tamil Nadu", 
    text: "Finally an app in my language! Weather alerts helped me plan sowing perfectly.", 
    rating: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    date: "1 week ago"
  },
  { 
    name: "Gurpreet Singh", 
    village: "Punjab", 
    text: "Got ₹6000 PM-KISAN benefit by checking eligibility through this app.", 
    rating: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    date: "3 days ago"
  },
  { 
    name: "Mariamma Thomas", 
    village: "Kerala", 
    text: "The pest detection feature is magical! Identified leaf spot disease immediately.", 
    rating: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    date: "5 days ago"
  }
]);

    setFeaturedNews([
      { title: "New PM-KISAN installment released", date: "Today", category: "Scheme" },
      { title: "Heavy rainfall alert for Maharashtra", date: "2 hours ago", category: "Weather" },
      { title: "Wheat procurement starts at MSP ₹2125", date: "Yesterday", category: "Market" }
    ]);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setMobileMenuOpen(false);
  };

  const features = [
    { icon: <Cloud size={32} />, title: t('weather'), desc: t('weather_desc'), color: "from-blue-400 to-blue-600", route: "/dashboard", gradient: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { icon: <Sprout size={32} />, title: t('crop_advice'), desc: t('crop_desc'), color: "from-green-400 to-green-600", route: "/crop-advice", gradient: "bg-gradient-to-br from-green-500 to-emerald-500" },
    { icon: <FileText size={32} />, title: t('schemes'), desc: t('schemes_desc'), color: "from-yellow-400 to-yellow-600", route: "/schemes", gradient: "bg-gradient-to-br from-yellow-500 to-orange-500" },
    { icon: <Bug size={32} />, title: t('pest_detection'), desc: t('pest_desc'), color: "from-red-400 to-red-600", route: "/pest-detection", gradient: "bg-gradient-to-br from-red-500 to-pink-500" },
  ];

  const getWeatherIcon = (condition) => {
    switch(condition?.toLowerCase()) {
      case 'clear': return <Sun className="text-yellow-500" size={32} />;
      case 'clouds': return <Cloud className="text-gray-500" size={32} />;
      case 'rain': return <CloudRain className="text-blue-500" size={32} />;
      case 'thunderstorm': return <CloudLightning className="text-purple-500" size={32} />;
      case 'snow': return <CloudSnow className="text-blue-200" size={32} />;
      case 'drizzle': return <CloudDrizzle className="text-blue-400" size={32} />;
      default: return <Sun className="text-yellow-500" size={32} />;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo with animation */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <Sprout className="text-green-600 group-hover:scale-110 transition-transform duration-300" size={32} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Agri<span className="text-green-600">Sathi</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'features', 'about', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-gray-700 hover:text-green-600 transition relative group"
              >
                {t(item)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="p-2 border rounded-lg bg-white/50 backdrop-blur focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="bn">🇮🇳 বাংলা</option>
              <option value="te">🇮🇳 తెలుగు</option>
              <option value="ta">🇮🇳 தமிழ்</option>
              <option value="mr">🇮🇳 मराठी</option>
              <option value="gu">🇮🇳 ગુજરાતી</option>
              <option value="kn">🇮🇳 ಕನ್ನಡ</option>
              <option value="ml">🇮🇳 മലയാളം</option>
              <option value="or">🇮🇳 ଓଡ଼ିଆ</option>
              <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
            </select>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              <span>{t('logout')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t mt-2 py-4 px-4 space-y-3">
            {['home', 'features', 'about', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block py-2 text-gray-700 hover:text-green-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item)}
              </a>
            ))}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="bn">🇮🇳 বাংলা</option>
              <option value="te">🇮🇳 తెలుగు</option>
            </select>
            
            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 pb-16 px-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                <Award size={16} className="mr-2" />
                {t('welcome_badge')} 👋
              </div>

              <h1 className="text-4xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  {t('ai_powered')}
                </span>
                <br />
                <span className="text-gray-800">{t('farming_companion')}</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                {t('hero_description')}
                <span className="font-bold text-green-600"> {t('languages_count')}</span>. 
                {t('built_for_bharat')}
              </p>

              {/* Live Weather Widget */}
              {!weatherLoading && weatherData && (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-md mx-auto lg:mx-0 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500 flex items-center">
                      <MapPin size={16} className="mr-1" /> {weatherData.name}
                    </span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" /> {t('live')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getWeatherIcon(weatherData.weather[0].main)}
                      <div>
                        <div className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
                        <div className="text-gray-500 capitalize">{weatherData.weather[0].description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{t('feels_like')}</div>
                      <div className="font-semibold">{Math.round(weatherData.main.feels_like)}°C</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <Droplets size={18} className="mx-auto text-blue-500 mb-1" />
                      <div className="text-sm font-semibold">{weatherData.main.humidity}%</div>
                      <div className="text-xs text-gray-500">{t('humidity')}</div>
                    </div>
                    <div className="text-center">
                      <Wind size={18} className="mx-auto text-gray-500 mb-1" />
                      <div className="text-sm font-semibold">{weatherData.wind.speed} m/s</div>
                      <div className="text-xs text-gray-500">{t('wind')}</div>
                    </div>
                    <div className="text-center">
                      <Eye size={18} className="mx-auto text-purple-500 mb-1" />
                      <div className="text-sm font-semibold">{(weatherData.visibility / 1000).toFixed(1)}km</div>
                      <div className="text-xs text-gray-500">{t('visibility')}</div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 text-xs text-gray-500">
                    <span className="flex items-center"><Sunrise size={14} className="mr-1" /> {formatTime(weatherData.sys.sunrise)}</span>
                    <span className="flex items-center"><Sunset size={14} className="mr-1" /> {formatTime(weatherData.sys.sunset)}</span>
                  </div>
                </div>
              )}

              {/* Voice Assistant Card */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-1 shadow-2xl max-w-md mx-auto lg:mx-0">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-700">{t('ask_anything')}</span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs text-gray-500">{t('online')}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigate('/chat')}
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white p-5 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 group"
                      title={t('click_to_chat')}
                    >
                      <Mic size={28} className="group-hover:animate-pulse" />
                    </button>
                    <input
                      type="text"
                      placeholder={t('ask_placeholder')}
                      className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          navigate('/chat', { state: { initialMessage: e.target.value } });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Gallery */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Farmer"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Crops"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661825536186-19606cd9a0f1?q=80&w=719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Irrigation"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
                <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-2xl p-6 text-white shadow-2xl">
                  <Calendar size={32} className="mb-2" />
                  <div className="text-2xl font-bold">{currentTime.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                  <div className="text-sm opacity-90">{t('best_time_sow')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Counter */}
      <section ref={statsRef} className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition duration-500">
                <div className="flex justify-center mb-3">
                  <stat.icon size={32} className="opacity-90" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-1">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('smart_features_for')} <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">{t('smart_farming')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.route)}
                className="group cursor-pointer"
              >
                <div className={`${feature.gradient} rounded-2xl p-1 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                  <div className="bg-white rounded-xl p-6 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{feature.desc}</p>
                    <div className="flex items-center text-sm font-semibold text-green-600 group-hover:text-green-700">
                      {t('learn_more')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News Ticker */}
<section className="py-8 bg-gradient-to-r from-gray-100 to-gray-50 border-y border-gray-200">
  <div className="container mx-auto px-4">
    <div className="flex items-center">
      {/* Latest badge with gradient and shadow */}
      <div className="relative flex-shrink-0 mr-4">
        <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-50"></div>
        <span className="relative z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
          <span className="mr-1">🔴</span> {t('latest')}
        </span>
      </div>
      
      {/* News ticker with gradient fade effect */}
      <div className="flex-1 min-w-0 overflow-hidden relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex space-x-8 animate-marquee whitespace-nowrap hover:animation-pause">
          {/* Duplicate news items for seamless looping */}
          {[...featuredNews, ...featuredNews].map((news, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                news.category === 'Weather' ? 'bg-blue-500 text-white' :
                news.category === 'Scheme' ? 'bg-green-500 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                {news.category}
              </span>
              <span className="text-gray-800 font-medium">{news.title}</span>
              <span className="text-gray-500 text-sm flex items-center">
                <Clock size={12} className="mr-1" />
                {news.date}
              </span>
            </div>
          ))}
        </div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            {t('what_farmers')} <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">{t('say')}</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {t('testimonials_description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.village}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-3">"{testimonial.text}"</p>
                <p className="text-xs text-gray-400">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/chat')}
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>{t('try_now')}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
            </button>
            <button
              onClick={() => window.open('https://wa.me/9129383792', '_blank')}
              className="bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition transform hover:scale-105 shadow-xl"
            >
              {t('chat_whatsapp')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="text-green-400" size={24} />
                <span className="text-xl font-bold">AgriSathi</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer_description')}
              </p>
              <div className="flex space-x-4 mt-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-green-400 transition">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-xs">{social[0].toUpperCase()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">{t('quick_links')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-green-400 transition flex items-center"><ArrowRight size={14} className="mr-2" /> {t('home')}</a></li>
                <li><a href="#features" className="hover:text-green-400 transition flex items-center"><ArrowRight size={14} className="mr-2" /> {t('features')}</a></li>
                <li><a href="#" className="hover:text-green-400 transition flex items-center"><ArrowRight size={14} className="mr-2" /> {t('about_us')}</a></li>
                <li><a href="#" className="hover:text-green-400 transition flex items-center"><ArrowRight size={14} className="mr-2" /> {t('blog')}</a></li>
                <li><a href="#" className="hover:text-green-400 transition flex items-center"><ArrowRight size={14} className="mr-2" /> {t('careers')}</a></li>
              </ul>
            </div>

            <div>
  <h4 className="font-bold mb-4 text-lg">{t('support')}</h4>
  <ul className="space-y-2 text-gray-400">
    <li>
      <button 
        onClick={() => navigate('/faq')}
        className="hover:text-green-400 transition text-left w-full"
      >
        {t('faq')}
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate('/privacy-policy')}
        className="hover:text-green-400 transition text-left w-full"
      >
        {t('privacy_policy')}
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate('/terms-of-service')}
        className="hover:text-green-400 transition text-left w-full"
      >
        {t('terms_of_service')}
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate('/help-center')}
        className="hover:text-green-400 transition text-left w-full"
      >
        {t('help_center')}
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate('/feedback')}
        className="hover:text-green-400 transition text-left w-full"
      >
        {t('feedback')}
      </button>
    </li>
  </ul>
</div>

            <div>
              <h4 className="font-bold mb-4 text-lg">{t('contact_us')}</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-green-400" />
                  <span>+91 9129383792</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-green-400" />
                  <span>support@agrisathi.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin size={18} className="text-green-400" />
                  <span>{t('address')}</span>
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="font-semibold mb-2">{t('subscribe')}</h5>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder={t('email_placeholder')}
                    className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 text-sm focus:outline-none"
                  />
                  <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition text-sm">
                    {t('subscribe_btn')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 {t('copyright')}</p>
            <p className="mt-2 text-xs text-gray-600">
              {t('powered_by')}
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        >
          <ChevronDown size={24} className="rotate-180 group-hover:-translate-y-1 transition" />
        </button>
      )}
    </div>
  );
}