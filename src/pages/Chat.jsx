import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Mic, Send, Image, ArrowLeft, MoreVertical,
  Phone, Video, Info, Check, CheckCheck,
  Smile, Paperclip, Camera, MapPin, File,
  X, Download, Share2, Star, Clock, Calendar,
  Volume2, VolumeX, Copy, ThumbsUp, MessageSquare,
  Bot, User, Wifi, WifiOff, RefreshCw, ChevronDown
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';

export default function Chat() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Quick suggestions for farmers
  const quickSuggestions = [
    "How to increase wheat yield?",
    "Best fertilizer for rice",
    "Pest control for cotton",
    "Government schemes for farmers",
    "Weather forecast this week",
    "Soil testing near me",
    "Organic farming methods",
    "Crop insurance details"
  ];

  // Welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: "👋 नमस्ते! I'm your AgriSathi farming assistant. How can I help you today? You can ask me about crops, weather, pests, government schemes, or any farming-related questions.",
      sender: 'bot',
      timestamp: new Date().toISOString(),
      read: true,
      avatar: '🤖'
    };
    setMessages([welcomeMessage]);
    
    // Load favorites from localStorage
    const saved = localStorage.getItem('favoriteMessages');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // ===== UPDATED sendMessage FUNCTION WITH REAL API =====
  const sendMessage = async (text, type = 'text') => {
    if (!text.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending',
      type
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    scrollToBottom();

    try {
      // Call your backend API which uses Gemini
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { text: text });
      
      const botReply = response.data.reply || "I couldn't process that. Please try again.";
      
      const botMsg = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: true,
        avatar: '🌾'
      };

      setMessages(prev => {
        const updated = [...prev];
        const userIndex = updated.findIndex(m => m.id === userMsg.id);
        if (userIndex !== -1) {
          updated[userIndex].status = 'sent';
        }
        return [...updated, botMsg];
      });
      
      setTyping(false);
      
      // Speak the response if voice enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botReply);
        utterance.lang = 'en-IN';
        window.speechSynthesis.speak(utterance);
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response from AI');
      
      // Fallback message if API fails
      const errorMsg = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: true,
        avatar: '🌾'
      };

      setMessages(prev => {
        const updated = [...prev];
        const userIndex = updated.findIndex(m => m.id === userMsg.id);
        if (userIndex !== -1) {
          updated[userIndex].status = 'error';
        }
        return [...updated, errorMsg];
      });
      
      setTyping(false);
    }
  };
  // ===== END OF UPDATED FUNCTION =====

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];
        
        // Simulate transcription
        toast.loading('Transcribing...', { id: 'transcribe' });
        
        setTimeout(() => {
          toast.success('Transcribed successfully!', { id: 'transcribe' });
          const transcribedText = "What's the best fertilizer for wheat?";
          setInput(transcribedText);
        }, 2000);

        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success('Recording started...');
    } catch (err) {
      toast.error('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Voice recognition for continuous listening
  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      toast.error('Voice recognition not supported');
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const imageUrl = URL.createObjectURL(file);
    const imageMsg = {
      id: Date.now(),
      type: 'image',
      image: imageUrl,
      caption: input || '📸 Image shared',
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending'
    };
    
    setMessages(prev => [...prev, imageMsg]);
    setInput('');
    
    // Simulate AI response to image
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "🔍 I've analyzed your image. This appears to be a healthy crop. Continue with your current farming practices. For specific advice, please describe any issues you're noticing.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        avatar: '🌾'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 3000);
  };

  const addEmoji = (emoji) => {
    setInput(prev => prev + emoji.emoji);
    setShowEmoji(false);
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Message copied!');
  };

  const saveToFavorites = (message) => {
    const updated = [...favorites, message];
    setFavorites(updated);
    localStorage.setItem('favoriteMessages', JSON.stringify(updated));
    toast.success('Saved to favorites!');
  };

  const removeFromFavorites = (messageId) => {
    const updated = favorites.filter(f => f.id !== messageId);
    setFavorites(updated);
    localStorage.setItem('favoriteMessages', JSON.stringify(updated));
    toast.success('Removed from favorites');
  };

  const retryMessage = (message) => {
    setMessages(prev => prev.filter(m => m.id !== message.id));
    sendMessage(message.text);
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    toast.success('Message deleted');
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled) {
      window.speechSynthesis?.cancel();
    }
    toast.success(voiceEnabled ? 'Voice disabled' : 'Voice enabled');
  };

  const getMessageStatusIcon = (status) => {
    switch(status) {
      case 'sending': return <Clock size={12} className="text-gray-400" />;
      case 'sent': return <Check size={12} className="text-gray-400" />;
      case 'delivered': return <CheckCheck size={12} className="text-gray-400" />;
      case 'read': return <CheckCheck size={12} className="text-blue-500" />;
      case 'error': return <X size={12} className="text-red-500" />;
      default: return null;
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                AS
              </div>
              {online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-gray-800">AgriSathi AI</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Farming Assistant</span>
                {!online && (
                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full flex items-center">
                    <WifiOff size={10} className="mr-1" /> Offline
                  </span>
                )}
                {typing && (
                  <span className="text-xs text-green-600 animate-pulse">typing...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleVoice}
            className={`p-2 rounded-lg transition ${
              voiceEnabled ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-yellow-600"
          >
            <Star size={20} fill={showFavorites ? 'currentColor' : 'none'} />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600">
            <Phone size={20} />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600">
            <Video size={20} />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Favorites Panel */}
      {showFavorites && (
        <div className="bg-white border-b border-gray-200 p-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-700">⭐ Favorite Messages</h3>
            <button onClick={() => setShowFavorites(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
          <div className="flex space-x-2">
            {favorites.length === 0 ? (
              <p className="text-sm text-gray-500">No favorites yet</p>
            ) : (
              favorites.map((fav, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(fav.text)}
                  className="flex-shrink-0 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm hover:bg-green-100 transition"
                >
                  {fav.text.substring(0, 30)}...
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200 p-3 overflow-x-auto">
        <div className="flex space-x-2">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => sendMessage(suggestion)}
              className="flex-shrink-0 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10"
      >
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center mb-4">
              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {date}
              </span>
            </div>
            
            {dateMessages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 group`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                    {msg.avatar || '🌾'}
                  </div>
                )}
                
                <div className="max-w-[70%]">
                  <div
                    className={`relative rounded-2xl p-3 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                    }`}
                  >
                    {msg.type === 'image' ? (
                      <div className="space-y-2">
                        <img 
                          src={msg.image} 
                          alt="Shared" 
                          className="max-w-full rounded-lg max-h-64 object-cover"
                        />
                        {msg.caption && (
                          <p className="text-sm">{msg.caption}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                    
                    <div className={`flex items-center justify-end space-x-1 mt-1 text-xs ${
                      msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                    }`}>
                      <span>{formatTime(msg.timestamp)}</span>
                      {msg.sender === 'user' && (
                        <span className="ml-1">
                          {getMessageStatusIcon(msg.status)}
                        </span>
                      )}
                    </div>

                    {/* Message Actions (on hover) */}
                    <div className={`absolute top-2 ${msg.sender === 'user' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 px-2`}>
                      <button
                        onClick={() => copyMessage(msg.text)}
                        className="p-1 bg-white rounded-lg shadow hover:bg-gray-100"
                      >
                        <Copy size={14} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => saveToFavorites(msg)}
                        className="p-1 bg-white rounded-lg shadow hover:bg-gray-100"
                      >
                        <Star size={14} className="text-yellow-600" />
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1 bg-white rounded-lg shadow hover:bg-gray-100"
                      >
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white text-sm ml-2 flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
              🌾
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 relative z-10">
        {/* Emoji Picker */}
        {showEmoji && (
          <div className="absolute bottom-full right-0 mb-2">
            <EmojiPicker onEmojiClick={addEmoji} />
          </div>
        )}

        {/* Attachment Menu */}
        {showAttach && (
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl p-2 flex space-x-2">
            <button
              onClick={() => {
                fileInputRef.current.click();
                setShowAttach(false);
              }}
              className="p-3 hover:bg-gray-100 rounded-lg transition flex flex-col items-center"
            >
              <Image size={20} className="text-green-600" />
              <span className="text-xs mt-1">Gallery</span>
            </button>
            <button
              onClick={startRecording}
              className="p-3 hover:bg-gray-100 rounded-lg transition flex flex-col items-center"
            >
              <Mic size={20} className="text-red-600" />
              <span className="text-xs mt-1">Voice</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg transition flex flex-col items-center">
              <Camera size={20} className="text-blue-600" />
              <span className="text-xs mt-1">Camera</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg transition flex flex-col items-center">
              <MapPin size={20} className="text-purple-600" />
              <span className="text-xs mt-1">Location</span>
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-lg transition flex flex-col items-center">
              <File size={20} className="text-orange-600" />
              <span className="text-xs mt-1">File</span>
            </button>
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span>Recording {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
            <button
              onClick={stopRecording}
              className="ml-2 p-1 hover:bg-red-600 rounded"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAttach(!showAttach)}
            className="p-3 hover:bg-gray-100 rounded-full transition text-gray-600"
          >
            <Paperclip size={20} className={showAttach ? 'text-green-600 rotate-45' : ''} />
          </button>

          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-3 hover:bg-gray-100 rounded-full transition text-gray-600"
          >
            <Smile size={20} />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isRecording ? "Listening..." : "Type your message..."}
              disabled={isRecording}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none disabled:bg-gray-100"
            />
            
            {/* Voice input button */}
            {!input && (
              <button
                onMouseDown={startVoiceRecognition}
                onMouseUp={stopVoiceRecognition}
                onTouchStart={startVoiceRecognition}
                onTouchEnd={stopVoiceRecognition}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition ${
                  isRecording ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Mic size={20} />
              </button>
            )}
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <Send size={20} />
          </button>
        </div>

        {/* Offline indicator */}
        {!online && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-yellow-500 text-white px-4 py-1 rounded-t-lg text-sm flex items-center">
            <WifiOff size={14} className="mr-2" />
            You're offline. Messages will send when connected.
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 flex flex-col space-y-2">
        <button
          onClick={scrollToBottom}
          className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110"
        >
          <ChevronDown size={20} />
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110"
        >
          <ArrowLeft size={20} className="rotate-90" />
        </button>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}