import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      features: "Features",
      about: "About",
      contact: "Contact",
      logout: "Logout",
      
      // Stats
      farmers_reached: "Farmers Reached (M)",
      languages: "Languages",
      accuracy: "Accuracy",
      support: "Support",
      
      // Features
      weather: "Weather Alerts",
      weather_desc: "Real-time updates & 7-day forecast",
      crop_advice: "Crop Guidance",
      crop_desc: "Personalized recommendations",
      schemes: "Govt Schemes",
      schemes_desc: "Check eligibility & apply",
      pest_detection: "Pest Detection",
      pest_desc: "AI-powered diagnosis",
      
      // Home page
      welcome_badge: "WELCOME!",
      ai_powered: "Your AI-Powered",
      farming_companion: "Farming Companion",
      hero_description: "Real-time weather, crop advisory, pest detection & government schemes in",
      languages_count: "22 Indian languages",
      built_for_bharat: "Built for Bharat's farmers.",
      
      // Weather widget
      live: "LIVE",
      feels_like: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      visibility: "Visibility",
      
      // Voice assistant
      ask_anything: "Ask AgriSathi Anything",
      ask_placeholder: "Ask anything about farming...",
      online: "Online",
      click_to_chat: "Click to open chat",
      
      // Calendar
      best_time_sow: "Best time to sow wheat",
      
      // Features section
      smart_features_for: "Smart Features for",
      smart_farming: "Smart Farming",
      features_description: "Everything you need to make informed farming decisions in one place",
      learn_more: "Learn More",
      
      // News ticker
      latest: "LATEST",
      
      // Testimonials
      what_farmers: "What Farmers",
      say: "Say",
      testimonials_description: "Real stories from farmers across India who transformed their farming with AgriSathi",
      
      // CTA Section
      cta_title: "Start Your Smart Farming Journey Today",
      cta_description: "Join millions of farmers already using AgriSathi to make better farming decisions",
      try_now: "Try AgriSathi Now",
      chat_whatsapp: "Chat on WhatsApp",
      
      // Footer
      footer_description: "AI-powered farming assistant for every Indian farmer. Bridging the gap between traditional wisdom and modern technology.",
      quick_links: "Quick Links",
      about_us: "About Us",
      blog: "Blog",
      careers: "Careers",
      support: "Support",
      faq: "FAQ",
      privacy_policy: "Privacy Policy",
      terms_of_service: "Terms of Service",
      help_center: "Help Center",
      feedback: "Feedback",
      contact_us: "Contact Us",
      address: "New Delhi, India - 110001",
      subscribe: "Subscribe to Newsletter",
      email_placeholder: "Your email",
      subscribe_btn: "Subscribe",
      copyright: "AgriSathi. All rights reserved. Made with ❤️ for Indian farmers.",
      powered_by: "Powered by AWS | Innovation Partner | Media Partner YourStory",
      
      // Existing keys from your original file
      tap_to_speak: "Tap to speak",
      dashboard: "Dashboard",
      daily_tips: "Daily Tips",
      govt_schemes: "Government Schemes",
      check_eligibility: "Check Eligibility",
      hide_eligibility: "Hide Eligibility",
      enter_details: "Enter your details",
      land_owned: "Land owned (acres)",
      caste: "Caste",
      annual_income: "Annual Income (₹)",
      check: "Check",
      eligible_schemes: "You are eligible for",
      soil_type: "Soil Type",
      season: "Season",
      region: "Region",
      select: "Select",
      get_recommendations: "Get Recommendations",
      recommended_crops: "Recommended Crops",
      loading: "Loading...",
      analyze_image: "Analyze Image",
      analyzing: "Analyzing...",
      diagnosis: "Diagnosis",
      click_to_upload: "Click to upload an image",
      "7day_forecast": "7-day forecast",
    }
  },
  hi: {
    translation: {
      // Navigation
      home: "होम",
      features: "विशेषताएं",
      about: "हमारे बारे में",
      contact: "संपर्क",
      logout: "लॉग आउट",
      
      // Stats
      farmers_reached: "किसान पहुंचे (एम)",
      languages: "भाषाएं",
      accuracy: "सटीकता",
      support: "समर्थन",
      
      // Features
      weather: "मौसम अलर्ट",
      weather_desc: "वास्तविक समय अपडेट और 7 दिन का पूर्वानुमान",
      crop_advice: "फसल सलाह",
      crop_desc: "व्यक्तिगत सिफारिशें",
      schemes: "सरकारी योजनाएं",
      schemes_desc: "पात्रता जांचें और आवेदन करें",
      pest_detection: "कीट पहचान",
      pest_desc: "एआई-संचालित निदान",
      
      // Home page
      welcome_badge: "स्वागत है!",
      ai_powered: "आपका AI-संचालित",
      farming_companion: "कृषि साथी",
      hero_description: "वास्तविक समय मौसम, फसल सलाह, कीट पहचान और सरकारी योजनाएं",
      languages_count: "22 भारतीय भाषाओं में",
      built_for_bharat: "भारत के किसानों के लिए निर्मित।",
      
      // Weather widget
      live: "लाइव",
      feels_like: "महसूस होता है",
      humidity: "नमी",
      wind: "हवा",
      visibility: "दृश्यता",
      
      // Voice assistant
      ask_anything: "AgriSathi से कुछ भी पूछें",
      ask_placeholder: "खेती के बारे में कुछ भी पूछें...",
      online: "ऑनलाइन",
      click_to_chat: "चैट खोलने के लिए क्लिक करें",
      
      // Calendar
      best_time_sow: "गेहूं बोने का सबसे अच्छा समय",
      
      // Features section
      smart_features_for: "स्मार्ट विशेषताएं",
      smart_farming: "स्मार्ट खेती",
      features_description: "स्मार्ट खेती के लिए आपकी ज़रूरत की हर चीज़ एक जगह",
      learn_more: "और जानें",
      
      // News ticker
      latest: "ताज़ा खबर",
      
      // Testimonials
      what_farmers: "किसान क्या",
      say: "कहते हैं",
      testimonials_description: "भारत भर के किसानों की सच्ची कहानियाँ जिन्होंने AgriSathi से अपनी खेती बदल दी",
      
      // CTA Section
      cta_title: "आज ही अपनी स्मार्ट खेती की यात्रा शुरू करें",
      cta_description: "बेहतर खेती के निर्णय लेने के लिए AgriSathi का उपयोग करने वाले लाखों किसानों से जुड़ें",
      try_now: "अभी AgriSathi आज़माएं",
      chat_whatsapp: "WhatsApp पर चैट करें",
      
      // Footer
      footer_description: "हर भारतीय किसान के लिए AI-संचालित कृषि सहायक। पारंपरिक ज्ञान और आधुनिक तकनीक के बीच की खाई को पाटना।",
      quick_links: "त्वरित लिंक",
      about_us: "हमारे बारे में",
      blog: "ब्लॉग",
      careers: "करियर",
      support: "सहायता",
      faq: "सामान्य प्रश्न",
      privacy_policy: "गोपनीयता नीति",
      terms_of_service: "सेवा की शर्तें",
      help_center: "सहायता केंद्र",
      feedback: "प्रतिक्रिया",
      contact_us: "संपर्क करें",
      address: "नई दिल्ली, भारत - 110001",
      subscribe: "समाचार पत्र के लिए सदस्यता लें",
      email_placeholder: "आपका ईमेल",
      subscribe_btn: "सदस्यता लें",
      copyright: "AgriSathi। सर्वाधिकार सुरक्षित। भारतीय किसानों के लिए ❤️ से निर्मित।",
      powered_by: "AWS द्वारा संचालित | इनोवेशन पार्टनर | मीडिया पार्टनर YourStory",
      
      // Existing keys from your original file
      tap_to_speak: "बोलने के लिए टैप करें",
      dashboard: "डैशबोर्ड",
      daily_tips: "दैनिक सुझाव",
      govt_schemes: "सरकारी योजनाएं",
      check_eligibility: "पात्रता जांचें",
      hide_eligibility: "पात्रता छुपाएं",
      enter_details: "अपना विवरण दर्ज करें",
      land_owned: "भूमि (एकड़ में)",
      caste: "जाति",
      annual_income: "वार्षिक आय (₹)",
      check: "जांचें",
      eligible_schemes: "आप पात्र हैं",
      soil_type: "मिट्टी का प्रकार",
      season: "मौसम",
      region: "क्षेत्र",
      select: "चुनें",
      get_recommendations: "सिफारिशें प्राप्त करें",
      recommended_crops: "अनुशंसित फसलें",
      loading: "लोड हो रहा है...",
      analyze_image: "छवि विश्लेषण करें",
      analyzing: "विश्लेषण हो रहा है...",
      diagnosis: "निदान",
      click_to_upload: "छवि अपलोड करने के लिए क्लिक करें",
      "7day_forecast": "7 दिन का पूर्वानुमान",
    }
  },
  bn: {
    translation: {
      weather: "আবহাওয়া",
      crop_advice: "ফসলের পরামর্শ",
      schemes: "স্কিম",
      pest_detection: "পest সনাক্তকরণ",
      tap_to_speak: "কথা বলতে ট্যাপ করুন",
      dashboard: "ড্যাশবোর্ড",
      daily_tips: "দৈনিক টিপস",
      govt_schemes: "সরকারি স্কিম",
      check_eligibility: "যোগ্যতা পরীক্ষা করুন",
      soil_type: "মাটির ধরন",
      season: "মৌসম",
      region: "অঞ্চল",
      select: "নির্বাচন করুন",
      loading: "লোড হচ্ছে...",
      home: "হোম",
      features: "বৈশিষ্ট্য",
      about: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ",
      logout: "লগ আউট",
      farmers_reached: "কৃষক পৌঁছেছেন (এম)",
      languages: "ভাষাসমূহ",
      accuracy: "নির্ভুলতা",
      support: "সমর্থন",
    }
  },
  te: {
    translation: {
      weather: "వాతావరణం",
      crop_advice: "పంట సలహా",
      schemes: "పథకాలు",
      pest_detection: "తెగులు గుర్తింపు",
      tap_to_speak: "మాట్లాడటానికి నొక్కండి",
      dashboard: "డాష్‌బోర్డ్",
      daily_tips: "రోజువారీ చిట్కాలు",
      govt_schemes: "ప్రభుత్వ పథకాలు",
      check_eligibility: "అర్హత తనిఖీ",
      soil_type: "నేల రకం",
      season: "సీజన్",
      region: "ప్రాంతం",
      select: "ఎంచుకోండి",
      loading: "లోడ్ అవుతోంది...",
      home: "హోమ్",
      features: "ఫీచర్లు",
      about: "మా గురించి",
      contact: "సంప్రదించండి",
      logout: "లాగ్అవుట్",
      farmers_reached: "రైతులు చేరుకున్నారు (ఎం)",
      languages: "భాషలు",
      accuracy: "ఖచ్చితత్వం",
      support: "మద్దతు",
    }
  },
  ta: {
    translation: {
      weather: "வானிலை",
      crop_advice: "பயிர் ஆலோசனை",
      schemes: "திட்டங்கள்",
      pest_detection: "பூச்சி கண்டறிதல்",
      tap_to_speak: "பேச தட்டவும்",
      dashboard: "டாஷ்போர்டு",
      daily_tips: "தினசரி குறிப்புகள்",
      govt_schemes: "அரசு திட்டங்கள்",
      check_eligibility: "தகுதியை சரிபார்க்கவும்",
      soil_type: "மண் வகை",
      season: "பருவம்",
      region: "பகுதி",
      select: "தேர்ந்தெடுக்கவும்",
      loading: "ஏற்றுகிறது...",
      home: "முகப்பு",
      features: "அம்சங்கள்",
      about: "எங்களை பற்றி",
      contact: "தொடர்பு",
      logout: "வெளியேறு",
      farmers_reached: "விவசாயிகள் சென்றடைந்தனர் (எம்)",
      languages: "மொழிகள்",
      accuracy: "துல்லியம்",
      support: "ஆதரவு",
    }
  },
  mr: {
    translation: {
      weather: "हवामान",
      crop_advice: "पीक सल्ला",
      schemes: "योजना",
      pest_detection: "कीटक शोध",
      tap_to_speak: "बोलण्यासाठी टॅप करा",
      dashboard: "डॅशबोर्ड",
      daily_tips: "दैनिक टिपा",
      govt_schemes: "सरकारी योजना",
      check_eligibility: "पात्रता तपासा",
      soil_type: "मातीचा प्रकार",
      season: "हंगाम",
      region: "प्रदेश",
      select: "निवडा",
      loading: "लोड करीत आहे...",
      home: "होम",
      features: "वैशिष्ट्ये",
      about: "आमच्याबद्दल",
      contact: "संपर्क",
      logout: "लॉगआउट",
      farmers_reached: "शेतकरी पोहोचले (एम)",
      languages: "भाषा",
      accuracy: "अचूकता",
      support: "समर्थन",
    }
  },
  gu: {
    translation: {
      weather: "હવામાન",
      crop_advice: "પાક સલાહ",
      schemes: "યોજનાઓ",
      pest_detection: "જીવાત શોધ",
      tap_to_speak: "બોલવા માટે ટેપ કરો",
      dashboard: "ડેશબોર્ડ",
      daily_tips: "દૈનિક ટિપ્સ",
      govt_schemes: "સરકારી યોજનાઓ",
      check_eligibility: "પાત્રતા ચકાસો",
      soil_type: "જમીનનો પ્રકાર",
      season: "ઋતુ",
      region: "પ્રદેશ",
      select: "પસંદ કરો",
      loading: "લોડ થઈ રહ્યું છે...",
      home: "હોમ",
      features: "વિશેષતાઓ",
      about: "અમારા વિશે",
      contact: "સંપર્ક",
      logout: "લૉગ આઉટ",
      farmers_reached: "ખેડૂતો પહોંચ્યા (એમ)",
      languages: "ભાષાઓ",
      accuracy: "ચોકસાઈ",
      support: "આધાર",
    }
  },
  kn: {
    translation: {
      weather: "ಹವಾಮಾನ",
      crop_advice: "ಬೆಳೆ ಸಲಹೆ",
      schemes: "ಯೋಜನೆಗಳು",
      pest_detection: "ಕೀಟ ಪತ್ತೆ",
      tap_to_speak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      daily_tips: "ದೈನಂದಿನ ಸಲಹೆಗಳು",
      govt_schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      check_eligibility: "ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
      soil_type: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
      season: "ಋತು",
      region: "ಪ್ರದೇಶ",
      select: "ಆಯ್ಕೆಮಾಡಿ",
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      home: "ಹೋಮ್",
      features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      contact: "ಸಂಪರ್ಕ",
      logout: "ಲಾಗ್ಔಟ್",
      farmers_reached: "ರೈತರು ತಲುಪಿದ್ದಾರೆ (ಎಂ)",
      languages: "ಭಾಷೆಗಳು",
      accuracy: "ನಿಖರತೆ",
      support: "ಬೆಂಬಲ",
    }
  },
  ml: {
    translation: {
      weather: "കാലാവസ്ഥ",
      crop_advice: "വിള ഉപദേശം",
      schemes: "പദ്ധതികൾ",
      pest_detection: "കീട കണ്ടെത്തൽ",
      tap_to_speak: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      daily_tips: "ദൈനംദിന നുറുങ്ങുകൾ",
      govt_schemes: "സർക്കാർ പദ്ധതികൾ",
      check_eligibility: "യോഗ്യത പരിശോധിക്കുക",
      soil_type: "മണ്ണിന്റെ തരം",
      season: "സീസൺ",
      region: "പ്രദേശം",
      select: "തിരഞ്ഞെടുക്കുക",
      loading: "ലോഡ് ചെയ്യുന്നു...",
      home: "ഹോം",
      features: "സവിശേഷതകൾ",
      about: "ഞങ്ങളെക്കുറിച്ച്",
      contact: "ബന്ധപ്പെടുക",
      logout: "ലോഗൗട്ട്",
      farmers_reached: "കർഷകർ എത്തിച്ചേർന്നു (എം)",
      languages: "ഭാഷകൾ",
      accuracy: "കൃത്യത",
      support: "പിന്തുണ",
    }
  },
  or: {
    translation: {
      weather: "ପାଗ",
      crop_advice: "ଫସଲ ପରାମର୍ଶ",
      schemes: "ଯୋଜନା",
      pest_detection: "କୀଟ ଚିହ୍ନଟ",
      tap_to_speak: "କହିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      daily_tips: "ଦୈନିକ ଟିପ୍ସ",
      govt_schemes: "ସରକାରୀ ଯୋଜନା",
      check_eligibility: "ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ",
      soil_type: "ମାଟି ପ୍ରକାର",
      season: "ଋତୁ",
      region: "ଅଞ୍ଚଳ",
      select: "ଚୟନ କରନ୍ତୁ",
      loading: "ଲୋଡ୍ ହେଉଛି...",
      home: "ହୋମ୍",
      features: "ବୈଶିଷ୍ଟ୍ୟ",
      about: "ଆମ ବିଷୟରେ",
      contact: "ଯୋଗାଯୋଗ",
      logout: "ଲଗଆଉଟ୍",
      farmers_reached: "କୃଷକ ପହଞ୍ଚିଲେ (ଏମ୍)",
      languages: "ଭାଷାଗୁଡ଼ିକ",
      accuracy: "ସଠିକତା",
      support: "ସମର୍ଥନ",
    }
  },
  pa: {
    translation: {
      weather: "ਮੌਸਮ",
      crop_advice: "ਫਸਲ ਸਲਾਹ",
      schemes: "ਸਕੀਮਾਂ",
      pest_detection: "ਕੀੜੇ ਦੀ ਪਛਾਣ",
      tap_to_speak: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      daily_tips: "ਰੋਜ਼ਾਨਾ ਸੁਝਾਅ",
      govt_schemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
      check_eligibility: "ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ",
      soil_type: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
      season: "ਮੌਸਮ",
      region: "ਖੇਤਰ",
      select: "ਚੁਣੋ",
      loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
      home: "ਹੋਮ",
      features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
      about: "ਸਾਡੇ ਬਾਰੇ",
      contact: "ਸੰਪਰਕ",
      logout: "ਲੌਗਆਉਟ",
      farmers_reached: "ਕਿਸਾਨ ਪਹੁੰਚੇ (ਐਮ)",
      languages: "ਭਾਸ਼ਾਵਾਂ",
      accuracy: "ਸ਼ੁੱਧਤਾ",
      support: "ਸਹਾਇਤਾ",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;