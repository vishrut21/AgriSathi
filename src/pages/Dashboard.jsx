import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, Cloud, Sun, CloudRain, Droplets, Wind,
  Thermometer, Eye, Sunrise, Sunset, Gauge,
  Calendar, Clock, MapPin, ChevronDown,
  Sprout, TrendingUp, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [currentTime, setCurrentTime] = useState(new Date());

  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Pune', 'Hyderabad', 'Lucknow'];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch REAL weather data from OpenWeather API
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/weather?city=${selectedCity}`
        );
        
        if (response.data.error) {
          toast.error(response.data.error);
          setWeatherData(null);
          setForecast([]);
        } else {
          // Set the real weather data from API
          setWeatherData(response.data.current);
          setForecast(response.data.forecast);
          toast.success(`Weather updated for ${selectedCity}`);
        }
      } catch (error) {
        toast.error('Failed to fetch weather data');
        console.error('Weather fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, [selectedCity]);

  // Mock tips (keep these for now)
  useEffect(() => {
    setTips([
      { icon: <Sprout />, text: "Best time to sow wheat this week", priority: "high" },
      { icon: <Droplets />, text: "Irrigation recommended tomorrow morning", priority: "medium" },
      { icon: <AlertCircle />, text: "Pest alert: Check crops for aphids", priority: "high" },
      { icon: <TrendingUp />, text: "Market price for wheat increased by 5%", priority: "low" },
    ]);
  }, []);

  const getWeatherIcon = (condition, size = 32) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) 
      return <CloudRain className="text-blue-500" size={size} />;
    if (conditionLower.includes('cloud')) 
      return <Cloud className="text-gray-500" size={size} />;
    if (conditionLower.includes('haze') || conditionLower.includes('mist') || conditionLower.includes('fog'))
      return <Cloud className="text-gray-400" size={size} />;
    if (conditionLower.includes('thunder') || conditionLower.includes('storm'))
      return <CloudRain className="text-purple-500" size={size} />;
    
    return <Sun className="text-yellow-500" size={size} />;
  };

  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Chart data for temperature trend
  const chartData = {
    labels: forecast.map(f => {
      const date = new Date(f.date);
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.map(f => f.temp),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1f2937' },
    },
    scales: {
      y: { 
        grid: { color: '#e5e7eb' }, 
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      x: { grid: { display: false } },
    },
  };

  // Humidity doughnut chart
  const humidityData = weatherData ? {
    labels: ['Humidity', 'Remaining'],
    datasets: [{
      data: [weatherData.humidity || 0, 100 - (weatherData.humidity || 0)],
      backgroundColor: ['#3b82f6', '#e5e7eb'],
      borderWidth: 0,
    }],
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate('/')} className="mb-6 flex items-center text-gray-600 hover:text-green-600 transition">
            <ArrowLeft size={20} className="mr-2" /> Back to Home
          </button>
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-white/50 rounded-3xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-white/50 rounded-3xl"></div>
              <div className="h-96 bg-white/50 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          
          <div className="flex items-center space-x-4">
            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur border border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Time Display */}
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-2 rounded-xl">
              <Clock size={18} className="text-green-600" />
              <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Current Weather Card - REAL DATA FROM API */}
        {weatherData ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Left - Location and main temp */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin size={20} className="text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {weatherData.name}, {weatherData.country}
                  </h2>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold ml-2 animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(weatherData.condition, 64)}
                  <div>
                    <div className="text-6xl font-bold text-gray-800">{weatherData.temp}°C</div>
                    <div className="text-xl text-gray-600 capitalize">{weatherData.description}</div>
                  </div>
                </div>
              </div>

              {/* Center - Weather details grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 lg:ml-12">
                <div className="text-center">
                  <Thermometer size={24} className="mx-auto text-red-500 mb-2" />
                  <div className="font-semibold text-gray-800">{weatherData.feels_like}°C</div>
                  <div className="text-sm text-gray-500">Feels Like</div>
                </div>
                <div className="text-center">
                  <Droplets size={24} className="mx-auto text-blue-500 mb-2" />
                  <div className="font-semibold text-gray-800">{weatherData.humidity}%</div>
                  <div className="text-sm text-gray-500">Humidity</div>
                </div>
                <div className="text-center">
                  <Wind size={24} className="mx-auto text-gray-500 mb-2" />
                  <div className="font-semibold text-gray-800">{weatherData.wind_speed} m/s</div>
                  <div className="text-sm text-gray-500">Wind Speed</div>
                </div>
                <div className="text-center">
                  <Gauge size={24} className="mx-auto text-purple-500 mb-2" />
                  <div className="font-semibold text-gray-800">{weatherData.pressure} hPa</div>
                  <div className="text-sm text-gray-500">Pressure</div>
                </div>
              </div>

              {/* Right - Sunrise/Sunset */}
              <div className="flex space-x-6 bg-gray-50 p-4 rounded-2xl">
                <div className="text-center">
                  <Sunrise size={24} className="text-orange-500 mb-1" />
                  <div className="font-semibold text-gray-800">{formatTime(weatherData.sunrise)}</div>
                  <div className="text-xs text-gray-500">Sunrise</div>
                </div>
                <div className="text-center">
                  <Sunset size={24} className="text-orange-500 mb-1" />
                  <div className="font-semibold text-gray-800">{formatTime(weatherData.sunset)}</div>
                  <div className="text-xs text-gray-500">Sunset</div>
                </div>
              </div>
            </div>

            {/* Additional metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Eye size={18} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Visibility: <strong>{weatherData.visibility} km</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Sun size={18} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Condition: <strong className="capitalize">{weatherData.condition}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Last updated: <strong>{new Date().toLocaleTimeString()}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud size={18} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Description: <strong className="capitalize">{weatherData.description}</strong>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8 mb-8 text-center">
            <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Weather Data Unavailable</h3>
            <p className="text-gray-600">Please check your API key or try a different city</p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Forecast */}
          <div className="lg:col-span-2 space-y-6">
            {/* Temperature Chart */}
            {forecast.length > 0 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Temperature Forecast</h3>
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* Daily Forecast */}
            {forecast.length > 0 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Forecast</h3>
                <div className="grid grid-cols-5 gap-2">
                  {forecast.map((day, index) => {
                    const date = new Date(day.date);
                    return (
                      <div key={index} className="text-center p-3 rounded-xl hover:bg-green-50 transition">
                        <div className="font-semibold text-gray-700 mb-2">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        {getWeatherIcon(day.condition, 24)}
                        <div className="text-lg font-bold text-gray-800 mt-2">{day.temp}°C</div>
                        <div className="text-xs text-gray-500 capitalize">{day.condition}</div>
                        <div className="text-xs text-gray-400 mt-1">{day.humidity}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Tips and Insights */}
          <div className="space-y-6">
            {/* Humidity Gauge */}
            {weatherData && humidityData && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Humidity Level</h3>
                <div className="h-48">
                  <Doughnut 
                    data={humidityData} 
                    options={{ 
                      cutout: '70%', 
                      plugins: { legend: { display: false } },
                      maintainAspectRatio: false
                    }} 
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-3xl font-bold text-blue-600">{weatherData.humidity}%</span>
                  <span className="text-gray-500 ml-2">Relative Humidity</span>
                </div>
              </div>
            )}

            {/* Smart Tips */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Tips</h3>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-3 p-3 rounded-xl ${
                      tip.priority === 'high' ? 'bg-red-50' :
                      tip.priority === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                    }`}
                  >
                    <div className={`${
                      tip.priority === 'high' ? 'text-red-600' :
                      tip.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {tip.icon}
                    </div>
                    <p className="text-gray-700 text-sm flex-1">{tip.text}</p>
                    {tip.priority === 'high' && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">Alert</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-3xl p-6 shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate('/crop-advice')}
                  className="bg-white/20 backdrop-blur p-3 rounded-xl hover:bg-white/30 transition"
                >
                  <Sprout size={24} className="mx-auto mb-1" />
                  <span className="text-sm">Crop Advice</span>
                </button>
                <button 
                  onClick={() => navigate('/pest-detection')}
                  className="bg-white/20 backdrop-blur p-3 rounded-xl hover:bg-white/30 transition"
                >
                  <AlertCircle size={24} className="mx-auto mb-1" />
                  <span className="text-sm">Pest Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>

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