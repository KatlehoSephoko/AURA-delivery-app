```react
import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// PRE-POPULATED SA BEAUTY DATA ENGINE
// ==========================================

const REGIONS = [
  { id: 'jhb', name: 'Johannesburg (Sandton, Rosebank, Midrand)' },
  { id: 'pta', name: 'Pretoria (East, Hatfield, Centurion)' },
  { id: 'cpt', name: 'Cape Town (Sea Point, Camps Bay, Stellies)' },
  { id: 'waterfall', name: 'Waterfall City & Woodmead' }
];

const CAMPUSES = [
  { id: 'wits', name: 'Wits University (Braamfontein Residences, Junction, Knockando)' },
  { id: 'up', name: 'University of Pretoria (Hatfield Res, Tuks Village, Kollege)' },
  { id: 'uj', name: 'UJ (Auckland Park Kingsway, Sophiatown, Doornfontein)' },
  { id: 'unisa', name: 'UNISA Nearby Residences (Pretoria Central / Sunnyside)' }
];

const PRODUCTS = [
  // Sixty60 Express
  {
    id: 'p1',
    name: 'Estée Lauder Double Wear Foundation',
    category: 'Sixty60 Express',
    subcat: 'Makeup',
    price: 780,
    rating: 4.9,
    image: '✨',
    tag: 'Best Seller',
    desc: '24-hour liquid foundation. Sweat and heat resistant—perfect for the South African climate.'
  },
  {
    id: 'p2',
    name: 'NARS Radiant Creamy Concealer',
    category: 'Sixty60 Express',
    subcat: 'Makeup',
    price: 690,
    rating: 4.8,
    image: '💄',
    tag: 'Trending',
    desc: 'Award-winning medium-to-buildable coverage. Corrects, contours, and highlights.'
  },
  {
    id: 'p3',
    name: 'Fenty Beauty Gloss Bomb',
    category: 'Sixty60 Express',
    subcat: 'Makeup',
    price: 495,
    rating: 4.9,
    image: '💋',
    tag: 'Rihanna\'s Pick',
    desc: 'The ultimate explosive-shine lip gloss. Beautifully universal peach-rose shimmer.'
  },

  // Campus Specials (Late Night Emergency)
  {
    id: 'p4',
    name: 'Got2B Glued Waterproof Wig Glue',
    category: 'Campus Run',
    subcat: 'Wig Essentials',
    price: 195,
    rating: 4.9,
    image: '🔥',
    tag: 'Late-Night Emergency',
    desc: 'Extreme hold styling gel for lace fronts. Dries clear and stands up to all-night parties.'
  },
  {
    id: 'p5',
    name: 'Cantu Shea Butter Extra Hold Edge Stay Gel',
    category: 'Campus Run',
    subcat: 'Hair Care',
    price: 125,
    rating: 4.7,
    image: '🧴',
    tag: 'Campus Favorite',
    desc: 'Provides extra hold to baby hairs. Nourishes with pure shea butter for long-lasting sleekness.'
  },
  {
    id: 'p6',
    name: 'Lil-Lets Essentials & Pain Relief Bundle',
    category: 'Campus Run',
    subcat: 'Emergency Care',
    price: 85,
    rating: 4.9,
    image: '🌸',
    tag: 'Care Package',
    desc: 'Super absorbency pads, soothing cramp heat-patches, and quick-action pain relief. Delivered within 45 mins.'
  },
  {
    id: 'p7',
    name: 'Emergency Midnight Glam Pack',
    category: 'Campus Run',
    subcat: 'Makeup',
    price: 240,
    rating: 4.6,
    image: '💅',
    tag: '2 AM Savior',
    desc: 'Complete express kit containing false lashes, adhesive glue, lip oil, and makeup wipes.'
  },

  // K-Beauty / TikTok Viral
  {
    id: 'p8',
    name: 'COSRX Snail Mucin 96 Essence',
    category: 'TikTok & K-Beauty',
    subcat: 'Skincare',
    price: 395,
    rating: 4.9,
    image: '🐌',
    tag: 'TikTok Viral',
    desc: '96.3% snail secretion filtrate. Provides deep hydration, heals blemishes, and targets dark spots.'
  },
  {
    id: 'p9',
    name: 'Beauty of Joseon Sunscreen SPF50+',
    category: 'TikTok & K-Beauty',
    subcat: 'Skincare',
    price: 430,
    rating: 4.8,
    image: '☀️',
    tag: 'Holy Grail',
    desc: 'Organic relief sun cream with rice extracts and grain-fermented probiotics. Zero white cast, beautiful dewy finish.'
  },
  {
    id: 'p10',
    name: 'Anua Heartleaf 77% Soothing Toner',
    category: 'TikTok & K-Beauty',
    subcat: 'Skincare',
    price: 450,
    rating: 4.7,
    image: '🌿',
    tag: 'K-Beauty Legend',
    desc: 'Extremely soothing daily toner. Perfect for clearing tiny acne bumps and redness.'
  },
  {
    id: 'p11',
    name: 'E.L.F. Halo Glow Liquid Filter (Dior Dupe)',
    category: 'TikTok & K-Beauty',
    subcat: 'Makeup',
    price: 390,
    rating: 4.8,
    image: '✨',
    tag: 'Viral Dupe',
    desc: 'Full size glowing skin booster. The ultimate dupe for high-end glowing primers at a fraction of the cost.'
  },

  // Luxury Imports
  {
    id: 'p12',
    name: 'Dior Backstage Glow Face Palette',
    category: 'Luxury Concierge',
    subcat: 'Imports',
    price: 1250,
    rating: 5.0,
    image: '💎',
    tag: 'Elite Glow',
    desc: 'Specialty imported multi-use makeup palette containing four luminous shades.'
  },
  {
    id: 'p13',
    name: 'Sol de Janeiro Cheirosa 68 Perfume Mist',
    category: 'Luxury Concierge',
    subcat: 'Fragrance',
    price: 790,
    rating: 4.9,
    image: '🌺',
    tag: 'Import Exclusive',
    desc: 'Lush pink dragonfruit and jasmine. Brings Brazilian beach vibes straight to South African shores.'
  }
];

const BEAUTY_PROS = [
  {
    id: 'pro1',
    name: 'Lerato M.',
    title: 'Senior Wig Installer & Custom Colorist',
    rating: 4.9,
    reviews: 142,
    price: 650,
    image: '👩🏽‍🦱',
    bio: 'Specialist in custom frontals, closures, and flawless wig installations. Over 6 years experience in Sandton & Braam.',
    services: ['Wig Installation (R650)', 'Frontal Customization (R300)', 'Wig Wash & Revive (R400)'],
    badge: 'AURA Verified Master'
  },
  {
    id: 'pro2',
    name: 'Chantel N.',
    title: 'Precision Nail Artist & Acrylic Queen',
    rating: 4.8,
    reviews: 98,
    price: 380,
    image: '💅🏽',
    bio: 'Mobile nail tech specializing in custom abstract gel art, hard-gel, and luxury acrylic extensions.',
    services: ['Acrylic Full Set with Art (R380)', 'Builder Gel Overlay (R280)', 'Luxury Spa Pedicure (R320)'],
    badge: 'Popular'
  },
  {
    id: 'pro3',
    name: 'Zama Z.',
    title: 'Premium Event & Graduation Makeup Artist',
    rating: 5.0,
    reviews: 215,
    price: 850,
    image: '💄',
    bio: 'Flawless camera-ready skin expert. Booked out heavily for Wits & UP graduation seasons. High-end imports used exclusively.',
    services: ['Full Glam Graduation Makeup (R850)', 'Bridal Consultation & Glam (R1800)', 'Soft Glam Event Look (R650)'],
    badge: 'Top Rated MUA'
  },
  {
    id: 'pro4',
    name: 'Tshepo K.',
    title: 'Lash & Brow Architect',
    rating: 4.7,
    reviews: 76,
    price: 450,
    image: '👁️',
    bio: 'Instant luxury transformations with micro-blading, individual lashes, and hybrid lash volumes.',
    services: ['Hybrid Volume Lash Set (R450)', 'Lash Tint & Lift (R250)', 'Brow Lamination (R350)'],
    badge: 'Express Tech'
  }
];

// ==========================================
// REACT APPLICATION COMPONENT
// ==========================================

export default function App() {
  // Navigation & Core States
  const [activeTab, setActiveTab] = useState('home');
  const [deliveryType, setDeliveryType] = useState('express'); // 'express' (Sixty60) or 'campus' (Late night)
  const [currentRegion, setCurrentRegion] = useState('jhb');
  const [currentCampus, setCurrentCampus] = useState('wits');
  const [customAddress, setCustomAddress] = useState('12 Biermann Avenue, Rosebank');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Dynamic Orders & Cart
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentOrderStep, setCurrentOrderStep] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modal / Toast Notification System
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // AURA Go Service Bookings
  const [selectedPro, setSelectedPro] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-06-01');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [bookingService, setBookingService] = useState('');

  // Luxury Concierge System State
  const [conciergeForm, setConciergeForm] = useState({
    name: '',
    phone: '',
    boxPlan: 'Novice Glow (R599/mo)',
    specialRequests: 'I need high-end imported Korean toners specifically for hyperpigmentation.'
  });

  // AI Beauty Matcher (Gemini Integration) State
  const [aiChat, setAiChat] = useState([
    {
      role: 'assistant',
      content: "Hi gorgeous! I am your **AURA AI Beauty Consultant**. Ask me for customized Korean skincare recommendations, viral TikTok dupes available in South Africa, or advice on wig installations!"
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // UTILITY: Custom Toast Dispatcher
  const triggerToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // CART LOGIC
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    triggerToast(`Added ${product.name} to Aura bag! 🛍️`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  // PLACE ORDER
  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: `AUR-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      total: cartTotal + (deliveryType === 'campus' ? 15 : 35),
      status: 'Order Confirmed',
      address: deliveryType === 'campus' 
        ? CAMPUSES.find(c => c.id === currentCampus)?.name 
        : `${customAddress}, ${REGIONS.find(r => r.id === currentRegion)?.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryType
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setActiveTab('tracker');
    setCurrentOrderStep(1); // Set to rider preparing
    triggerToast("✨ Order successfully placed with AURA! Track it below.", "success");
  };

  // BOOK A PRO (AURA Go)
  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedPro || !bookingService) {
      triggerToast("Please select a service before finalizing booking.", "error");
      return;
    }

    const newBooking = {
      id: `BOK-${Math.floor(1000 + Math.random() * 9000)}`,
      proName: selectedPro.name,
      proImage: selectedPro.image,
      service: bookingService,
      date: bookingDate,
      time: bookingTime,
      price: selectedPro.price,
      status: 'Confirmed & Stylist Traveling'
    };

    setBookings([newBooking, ...bookings]);
    setSelectedPro(null);
    setBookingService('');
    triggerToast(`📅 Appointment booked with ${selectedPro.name}!`, "success");
    setActiveTab('tracker');
  };

  // SIMULATE LIVE RIDER / BOOKING PROGRESS
  useEffect(() => {
    let interval;
    if (orders.length > 0 && currentOrderStep > 0 && currentOrderStep < 4) {
      interval = setInterval(() => {
        setCurrentOrderStep(prev => prev + 1);
      }, 12000); // Progress tracker every 12 seconds
    }
    return () => clearInterval(interval);
  }, [orders, currentOrderStep]);

  // API INTEGRATION: Gemini Beauty Expert
  const askGeminiBeautyConsultant = async (query) => {
    if (!query.trim()) return;
    
    // Add User Message to UI
    const updatedChat = [...aiChat, { role: 'user', content: query }];
    setAiChat(updatedChat);
    setAiInput('');
    setIsAiLoading(true);

    const apiKey = ""; // Canvas runtime key automatically injected
    const systemPrompt = `
      You are the elite AI Beauty Consultant representing 'AURA' - South Africa's premier beauty delivery tech brand. 
      We deliver makeup, Korean skincare, luxury imports, and campus late-night packages (wig glue, edge control, hygiene), 
      and we run 'AURA Go', a mobile beauty technician network.
      
      Respond directly, using friendly, conversational, and highly knowledgeable tones (using South African contexts, slangs like 'choma', 'babe', 'gorgeous', 'Rands').
      Format responses beautifully using Markdown, bullet points, and clean highlights. Keep answers concise but insightful. 
      If users ask for dupes, specify cheaper alternatives (e.g., E.L.F or local brands vs high-end imports). 
      Make sure to mention local universities (Wits, UJ, UP, UNISA) and luxury hubs (Sandton, Waterfall) when contextual.
    `;

    // Exponential Backoff implementation
    const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: query }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const result = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        setAiChat([...updatedChat, { role: 'assistant', content: textResponse }]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      // Elegant Fallback in case of server/key constraints
      setTimeout(() => {
        const fallbackText = `
### Hey Babe! ✨
AURA's premium network is currently calibrating. No worries! Here are some hot suggestions based on your query:

* **For Glowing Korean Skincare**: Check out the **COSRX Snail Mucin 96** paired with **Beauty of Joseon SPF50+**. These are TikTok-viral hits that provide an unbelievable South African glass skin glow, even in hot weather!
* **Wig Support**: In a Braamfontein residence emergency? Order the **Got2B Glued Waterproof Wig Glue** and **Cantu Edge Gel** from our **Campus Run** section for swift late-night delivery!
* **High-End Dupes**: Looking for a high-end primer dupe? Try the **E.L.F. Halo Glow Liquid Filter**—it mimics luxury formulas flawlessly for just a portion of the price.

Let me know if you'd like to try booking one of our on-demand technicians or customize a curated luxury skincare box! 🌸`;
        setAiChat([...updatedChat, { role: 'assistant', content: fallbackText }]);
      }, 1000);
    } finally {
      setIsAiLoading(false);
    }
  };

  // FILTERED PRODUCT SEARCH FOR SHOPPING VIEW
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prod.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            prod.subcat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* ==========================================
          TOP NOTIFICATION / UTILITY BAR
         ========================================== */}
      <div className="bg-gradient-to-r from-purple-800 via-rose-700 to-pink-700 text-white py-1.5 px-4 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2 relative overflow-hidden">
        <span className="inline-block animate-bounce">⚡</span>
        <span>AURA ON-DEMAND: 60-Min Express & 2 AM Late-Night Campus Runs (Wits, UP, UJ, UNISA)</span>
        <span className="hidden md:inline bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">Active</span>
      </div>

      {/* ==========================================
          MAIN FLOATING TOAST NOTIFIER
         ========================================== */}
      {toast.show && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-purple-900 to-rose-900 border border-rose-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce max-w-sm text-center">
          <span className="text-xl">🌟</span>
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}

      {/* ==========================================
          HEADER NAVIGATION
         ========================================== */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Accent */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-rose-200 to-pink-400 bg-clip-text text-transparent">AURA</h1>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">South African Beauty Ecosystem</p>
            </div>
          </div>

          {/* Quick Hub Deliver-to Customizers */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs w-full md:w-auto overflow-x-auto">
            <button 
              onClick={() => { setDeliveryType('express'); triggerToast("Switched to Standard Express Delivery"); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${deliveryType === 'express' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              🚀 Sixty60/Luxury Address
            </button>
            <button 
              onClick={() => { setDeliveryType('campus'); triggerToast("Campus Mode Engaged! Ready for midnight deliveries"); }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${deliveryType === 'campus' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              🎓 Campus Delivery Run
            </button>
          </div>

          {/* Core App Tab Controls */}
          <nav className="flex items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800/80 w-full md:w-auto justify-around">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'home' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'shop' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-white'}`}
            >
              Shop Express
            </button>
            <button 
              onClick={() => setActiveTab('aura-go')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'aura-go' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-white'}`}
            >
              AURA Go (Pros)
            </button>
            <button 
              onClick={() => setActiveTab('luxury')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'luxury' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-white'}`}
            >
              Concierge
            </button>
            <button 
              onClick={() => setActiveTab('ai-consultant')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'ai-consultant' ? 'bg-slate-800 text-pink-400' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="text-pink-500 animate-pulse">✨</span> AI Matcher
            </button>
          </nav>

          {/* Cart Bag Trigger */}
          <div className="relative">
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl hover:border-rose-500 text-slate-100 flex items-center gap-2 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs font-bold">R {cartTotal}</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-slate-950">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ==========================================
          LOCATION SELECTION HEADER STRIP
         ========================================== */}
      <section className="bg-slate-900 py-2.5 px-4 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {deliveryType === 'express' ? (
            <div className="flex items-center gap-2 text-slate-300 w-full justify-between sm:justify-start">
              <span className="font-bold flex items-center gap-1 text-rose-400">
                📍 Delivery Hub:
              </span>
              <select 
                value={currentRegion}
                onChange={(e) => { setCurrentRegion(e.target.value); triggerToast(`Hub switched to ${REGIONS.find(r => r.id === e.target.value)?.name}`); }}
                className="bg-slate-950 text-white rounded px-2 py-1 border border-slate-800 focus:outline-none focus:border-rose-500"
              >
                {REGIONS.map(reg => (
                  <option key={reg.id} value={reg.id}>{reg.name}</option>
                ))}
              </select>
              <input 
                type="text" 
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="Enter street / complex address..."
                className="bg-slate-950 text-slate-200 rounded px-2 py-1 border border-slate-800 ml-2 flex-grow hidden md:inline"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-300 w-full justify-between sm:justify-start">
              <span className="font-bold flex items-center gap-1 text-purple-400">
                🎓 Target Campus Residence:
              </span>
              <select 
                value={currentCampus}
                onChange={(e) => { setCurrentCampus(e.target.value); triggerToast(`Campus switched to ${CAMPUSES.find(c => c.id === e.target.value)?.name}`); }}
                className="bg-slate-950 text-white rounded px-2 py-1 border border-slate-800 focus:outline-none focus:border-purple-500"
              >
                {CAMPUSES.map(camp => (
                  <option key={camp.id} value={camp.id}>{camp.name}</option>
                ))}
              </select>
              <span className="bg-purple-950/80 text-purple-300 px-2.5 py-0.5 rounded-full font-semibold border border-purple-800 text-[10px] hidden lg:inline animate-pulse">
                Late Night Run Available (Till 2:00 AM)
              </span>
            </div>
          )}

          {/* Quick tracker jump if orders exist */}
          {orders.length > 0 && (
            <button 
              onClick={() => setActiveTab('tracker')}
              className="text-pink-400 hover:text-white font-bold flex items-center gap-1 animate-pulse"
            >
              📦 Track Active Delivery ({orders[0].id}) →
            </button>
          )}
        </div>
      </section>

      {/* ==========================================
          MAIN BODY LAYOUT
         ========================================== */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4">

        {/* ------------------------------------------
            TAB 1: HOME PAGE (INTEGRATED DASHBOARD)
           ------------------------------------------ */}
        {activeTab === 'home' && (
          <div className="space-y-10 py-4 animate-fadeIn">
            
            {/* Mega Promotional Hero Area */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 border border-slate-800 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

              <div className="max-w-xl space-y-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-purple-400">
                  SOUTH AFRICA'S BEAUTY SUPER-APP
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Premium Beauty, Deliveries & Style{' '}
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 bg-clip-text text-transparent block md:inline">
                    on-Demand.
                  </span>
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Combining rapid 60-minute beauty deliveries, dedicated midnight university campus runs, professional mobile MUA/Nail tech bookings, premium imported skincare curation, and interactive AI assistance. 
                </p>
                
                {/* Search Quick Launcher */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-80">
                    <input 
                      type="text" 
                      placeholder="Search got2b, mucin, makeup..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveTab('shop')}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 pl-10 text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                    <span className="absolute left-3.5 top-3.5 text-slate-500">🔍</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('shop')}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
                  >
                    Go to Shop Express
                  </button>
                </div>
              </div>

              {/* Ecosystem Interactive Circles */}
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto max-w-sm">
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center hover:border-rose-500 transition-all cursor-pointer" onClick={() => { setSelectedCategory('Sixty60 Express'); setActiveTab('shop'); }}>
                  <span className="text-3xl block mb-2">🚀</span>
                  <h4 className="font-bold text-xs text-slate-100">60-Min Express</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Estée Lauder, Fenty & Makeup</p>
                </div>
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center hover:border-purple-500 transition-all cursor-pointer" onClick={() => { setSelectedCategory('Campus Run'); setActiveTab('shop'); }}>
                  <span className="text-3xl block mb-2">🎓</span>
                  <h4 className="font-bold text-xs text-slate-100">Campus Run</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Late-night wig glue & edge control</p>
                </div>
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center hover:border-pink-500 transition-all cursor-pointer" onClick={() => setActiveTab('aura-go')}>
                  <span className="text-3xl block mb-2">💄</span>
                  <h4 className="font-bold text-xs text-slate-100">AURA Go (Pros)</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Book MUAs & Nail Technicians</p>
                </div>
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center hover:border-purple-400 transition-all cursor-pointer" onClick={() => setActiveTab('luxury')}>
                  <span className="text-3xl block mb-2">💎</span>
                  <h4 className="font-bold text-xs text-slate-100">Concierge Hub</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Imports & Monthly Beauty Boxes</p>
                </div>
              </div>

            </div>

            {/* Campaign Banner: South African Context */}
            <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 rounded-2xl p-6 border border-rose-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🚨</div>
                <div>
                  <h3 className="font-bold text-lg text-white">Braamfontein & Hatfield Emergency Late-Night Runs</h3>
                  <p className="text-slate-300 text-xs mt-1">
                    Loadshedding or midnight prep before graduations/dates? We deliver essentials right to Wits Junction, Hatfield Studios, and UJ res till 2 AM.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setDeliveryType('campus'); setSelectedCategory('Campus Run'); setActiveTab('shop'); }}
                className="bg-purple-800 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs whitespace-nowrap transition-all border border-purple-600"
              >
                Explore Campus Delivery Mode 🎓
              </button>
            </div>

            {/* Featured Section: TikTok Viral & K-Beauty Items */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-rose-400 font-bold tracking-widest text-[10px] uppercase">HOT IN SOUTH AFRICA</span>
                  <h3 className="text-2xl font-extrabold tracking-tight">K-Beauty & TikTok Viral Favorites</h3>
                </div>
                <button 
                  onClick={() => { setSelectedCategory('TikTok & K-Beauty'); setActiveTab('shop'); }}
                  className="text-pink-400 hover:text-white text-xs font-bold"
                >
                  View All Trending Skincare →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.category === 'TikTok & K-Beauty').slice(0, 4).map(product => (
                  <div key={product.id} className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 hover:border-pink-500/50 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="relative bg-slate-950 rounded-xl h-40 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-all">
                        {product.image}
                        <span className="absolute top-2 left-2 bg-pink-900/80 border border-pink-700 text-white font-black text-[9px] px-2 py-0.5 rounded-full">
                          {product.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-100 mb-1">{product.name}</h4>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-3">{product.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-base font-black text-rose-400">R {product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        + Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Module: Personal MUA Showcase */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-purple-400 font-bold tracking-widest text-[10px] uppercase">AURA GO PLATFORM</span>
                  <h3 className="text-2xl font-extrabold tracking-tight">On-Demand Stylists & Professionals</h3>
                </div>
                <button 
                  onClick={() => setActiveTab('aura-go')}
                  className="text-purple-400 hover:text-white text-xs font-bold"
                >
                  View All Techs & Stylists →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BEAUTY_PROS.slice(0, 2).map(pro => (
                  <div key={pro.id} className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 flex flex-col sm:flex-row gap-5 hover:border-purple-500/50 transition-all">
                    <div className="bg-slate-950 rounded-xl w-full sm:w-24 h-24 flex items-center justify-center text-4xl shrink-0">
                      {pro.image}
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-base text-white">{pro.name}</h4>
                        <span className="bg-purple-900/50 border border-purple-700 text-purple-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {pro.badge}
                        </span>
                      </div>
                      <p className="text-xs text-rose-400 font-semibold">{pro.title}</p>
                      <p className="text-slate-300 text-xs line-clamp-2">{pro.bio}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-slate-400 text-xs">⭐ {pro.rating} ({pro.reviews} reviews)</span>
                        <button 
                          onClick={() => { setSelectedPro(pro); setActiveTab('aura-go'); }}
                          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all"
                        >
                          Book Stylist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Callout Banner */}
            <div className="bg-gradient-to-tr from-pink-900/30 via-slate-900 to-purple-900/30 rounded-3xl p-8 border border-pink-500/20 text-center space-y-4 max-w-4xl mx-auto">
              <span className="text-4xl block animate-pulse">✨</span>
              <h3 className="text-xl font-bold text-slate-100">Not sure what beauty product suits your skin type?</h3>
              <p className="text-slate-300 text-xs max-w-xl mx-auto">
                Consult with our deep-learning AI Beauty Specialist. Ask about morning routines, sunscreen recommendations for hot Joburg weather, or perfect lip gloss dupes.
              </p>
              <button 
                onClick={() => setActiveTab('ai-consultant')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-pink-500/10"
              >
                Chat with AI Matcher Now
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------
            TAB 2: SHOPPING VIEW (60-MIN EXPRESS / CAMPUS / TIKTOK)
           ------------------------------------------ */}
        {activeTab === 'shop' && (
          <div className="space-y-6 py-4 animate-fadeIn">
            
            {/* Header Content & Filter Selectors */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Express Beauty Catalog</h3>
                <p className="text-slate-400 text-xs mt-1">
                  On-demand instant beauty items. Filter by catalog type. Delivered within minutes.
                </p>
              </div>

              {/* Dynamic Categorization Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Sixty60 Express', 'Campus Run', 'TikTok & K-Beauty', 'Luxury Concierge'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${selectedCategory === cat ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-rose-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Search and Area Tracker */}
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter products dynamically..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 pl-9 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <span className="absolute left-3.5 top-3 text-slate-500">🔍</span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>⚡ Status: </span>
                <span className="bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-800">
                  Riders active near you
                </span>
                <span className="text-slate-500">|</span>
                <span>Delivery: </span>
                <strong className="text-slate-200">{deliveryType === 'express' ? '60 Mins' : 'Late-Night Campus Rider'}</strong>
              </div>
            </div>

            {/* Shopping List Cards */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative bg-slate-950 rounded-xl h-44 flex items-center justify-center text-6xl mb-4">
                        {product.image}
                        <span className="absolute top-2.5 left-2.5 bg-slate-900/95 text-slate-200 font-bold text-[9px] px-2.5 py-1 rounded-md border border-slate-800">
                          {product.category}
                        </span>
                        {product.tag && (
                          <span className="absolute bottom-2.5 right-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-[8px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-100">{product.name}</h4>
                        <span className="text-slate-400 text-xs font-semibold shrink-0">⭐ {product.rating}</span>
                      </div>

                      <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">{product.subcat}</span>
                      <p className="text-slate-400 text-xs mt-2 mb-4 line-clamp-3">{product.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black">Price</p>
                        <p className="text-lg font-black text-rose-400">R {product.price}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-500/10"
                      >
                        + Add To Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-5xl block">🧐</span>
                <h4 className="text-lg font-bold">No product matches found</h4>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Try clearing your search filters, or consult with our AI Assistant to find matching beauty alternatives!
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------
            TAB 3: AURA GO (UBER FOR BEAUTY PROFESSIONAL SCHEDULING)
           ------------------------------------------ */}
        {activeTab === 'aura-go' && (
          <div className="space-y-8 py-4 animate-fadeIn">
            
            {/* Platform Headline */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="bg-purple-950 text-purple-400 text-[10px] font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-purple-800 inline-block">
                AURA GO NETWORK
              </span>
              <h3 className="text-3xl font-black tracking-tight">On-Demand Beauty Professionals</h3>
              <p className="text-slate-300 text-xs">
                Select your service, choose a vetted South African stylist/nail artist, and book home or university residence visits with instant dynamic scheduling.
              </p>
            </div>

            {/* Technician Booking Form / Details Overlay if selected */}
            {selectedPro && (
              <div className="bg-slate-900 rounded-3xl p-6 border-2 border-purple-500 max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{selectedPro.image}</span>
                    <div>
                      <h4 className="text-lg font-black text-white">Booking Setup: {selectedPro.name}</h4>
                      <p className="text-purple-400 text-xs font-semibold">{selectedPro.title}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPro(null)}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕ Cancel
                  </button>
                </div>

                <form onSubmit={handleBooking} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">Select Desired Service:</label>
                    <select 
                      value={bookingService} 
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-medium"
                      required
                    >
                      <option value="">-- Click to choose beauty treatment --</option>
                      {selectedPro.services.map((srv, idx) => (
                        <option key={idx} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5">Preferred Date:</label>
                      <input 
                        type="date" 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1.5">Appointment Time:</label>
                      <input 
                        type="time" 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <h5 className="font-bold text-slate-200">📍 Destination Address Confirmation</h5>
                    <p className="text-slate-400 leading-relaxed text-[10px]">
                      Your stylist will travel directly to your current session address: <strong className="text-slate-200">
                        {deliveryType === 'campus' 
                          ? CAMPUSES.find(c => c.id === currentCampus)?.name 
                          : `${customAddress}, ${REGIONS.find(r => r.id === currentRegion)?.name}`}
                      </strong>
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide"
                  >
                    Confirm Booking Appointment (R {selectedPro.price})
                  </button>
                </form>
              </div>
            )}

            {/* List of Vetted Pros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BEAUTY_PROS.map(pro => (
                <div 
                  key={pro.id} 
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-purple-500 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl bg-slate-950 w-12 h-12 rounded-xl flex items-center justify-center">{pro.image}</span>
                        <div>
                          <h4 className="font-extrabold text-base text-slate-100">{pro.name}</h4>
                          <span className="text-rose-400 font-semibold text-xs">{pro.title}</span>
                        </div>
                      </div>
                      <span className="bg-purple-950 text-purple-300 text-[9px] font-black px-2.5 py-1 rounded-full border border-purple-800 uppercase">
                        {pro.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{pro.bio}</p>

                    <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available Treatment Menu:</span>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {pro.services.map((srv, index) => (
                          <li key={index} className="flex items-center gap-1.5">
                            <span className="text-purple-500">✔</span> {srv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Base Session Rate</p>
                      <p className="text-lg font-black text-purple-400">R {pro.price}+</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedPro(pro); setBookingService(pro.services[0]); }}
                      className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-500/10"
                    >
                      Book Professional
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ------------------------------------------
            TAB 4: LUXURY BEAUTY CONCIERGE (EXCLUSIVE HUBS)
           ------------------------------------------ */}
        {activeTab === 'luxury' && (
          <div className="space-y-10 py-4 animate-fadeIn">
            
            {/* Elite Brand Intro */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-rose-950 border border-rose-900/30 p-8 md:p-12 text-center space-y-4 max-w-4xl mx-auto">
              <span className="bg-rose-950 text-rose-400 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full border border-rose-800 inline-block">
                AURA ELITE CONCIERGE
              </span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                High-End Imports & Monthly Luxury Skincare Boxes
              </h3>
              <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                Exclusively targeting higher-income clientele in Sandton, Waterfall City, and Pretoria East. We procure rare imported brands and assemble customized high-luxury beauty care.
              </p>
            </div>

            {/* Columns split: Premium Boxes Showcase vs Contact Inquiry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Box Packages Showcase */}
              <div className="space-y-6">
                <h4 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                  <span>💎</span> Select Your Premium Subscription Plan
                </h4>

                <div className="space-y-4">
                  {[
                    {
                      name: 'Novice Glow Package',
                      price: 599,
                      desc: 'Ideal skincare foundation featuring 3 core full-sized items (cleanser, viral toner, sun cream). Includes custom aesthetic guide.',
                      tag: 'Most Popular'
                    },
                    {
                      name: 'Advanced K-Beauty Box',
                      price: 899,
                      desc: 'Deeper curation with imported serums, advanced Korean essences, sheet masks, and high-street trending cosmetics.',
                      tag: 'Best Value'
                    },
                    {
                      name: 'Luxury Royal Concierge Drawer',
                      price: 1599,
                      desc: 'Ultimate luxury customized box including premium imported fragrances, elite high-end makeup palettes, and personal skin-clinic advice.',
                      tag: 'Elite Exclusive'
                    }
                  ].map((pkg, i) => (
                    <div 
                      key={i} 
                      className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-rose-500/50 transition-all flex justify-between items-center gap-4 cursor-pointer"
                      onClick={() => setConciergeForm({ ...conciergeForm, boxPlan: `${pkg.name} (R${pkg.price}/mo)` })}
                    >
                      <div className="space-y-1 max-w-md">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-slate-100">{pkg.name}</h5>
                          <span className="bg-rose-950/80 border border-rose-700 text-rose-300 text-[8px] font-black px-2 py-0.5 rounded-full">
                            {pkg.tag}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{pkg.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-slate-500 uppercase font-black">Monthly</p>
                        <p className="text-base font-black text-rose-400">R {pkg.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry and Personal Shopper Form */}
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-lg text-slate-100">Request Custom Curation</h4>
                  <p className="text-slate-400 text-xs">
                    Need imported luxury goods not listed in our standard app catalog? Send us your requested brands (Dior, Rhode, Sol de Janeiro, etc.).
                  </p>
                </div>

                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    triggerToast(`✨ Concierge requested! A dedicated shopper will text you shortly.`); 
                    setConciergeForm({ name: '', phone: '', boxPlan: 'Novice Glow (R599/mo)', specialRequests: '' });
                  }} 
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Your Full Name:</label>
                    <input 
                      type="text" 
                      value={conciergeForm.name}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, name: e.target.value })}
                      placeholder="e.g. Naledi Kunene"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">South African Phone (WhatsApp):</label>
                      <input 
                        type="tel" 
                        value={conciergeForm.phone}
                        onChange={(e) => setConciergeForm({ ...conciergeForm, phone: e.target.value })}
                        placeholder="e.g. 082 123 4567"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">Selected Subscription Base:</label>
                      <select 
                        value={conciergeForm.boxPlan}
                        onChange={(e) => setConciergeForm({ ...conciergeForm, boxPlan: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 font-medium"
                      >
                        <option>Novice Glow Package (R599/mo)</option>
                        <option>Advanced K-Beauty Box (R899/mo)</option>
                        <option>Luxury Royal Concierge Drawer (R1599/mo)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Specify Special Requests or Rare Imports:</label>
                    <textarea 
                      rows="3"
                      value={conciergeForm.specialRequests}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, specialRequests: e.target.value })}
                      placeholder="List imported products, targeted allergies, or personal beauty preferences..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 font-medium"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide"
                  >
                    Submit Premium Concierge Request
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* ------------------------------------------
            TAB 5: AI MATCHER & BEAUTY CONSULTANT (GEMINI CHAT HUB)
           ------------------------------------------ */}
        {activeTab === 'ai-consultant' && (
          <div className="max-w-3xl mx-auto py-4 space-y-6 animate-fadeIn">
            
            {/* Header branding */}
            <div className="bg-gradient-to-r from-slate-900 to-purple-950 rounded-2xl p-6 border border-purple-800/50 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="bg-purple-950 border border-purple-800 text-purple-300 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                  Interactive AI Consultant
                </span>
                <h3 className="text-xl font-bold text-white">AURA Intelligent Skincare Matcher</h3>
                <p className="text-slate-400 text-xs">
                  Ask about perfect hydration routines, viral dupes, wig tips, or skin care hacks.
                </p>
              </div>
              <span className="text-4xl animate-bounce">🤖</span>
            </div>

            {/* Chat Frame */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[450px] flex flex-col justify-between overflow-hidden">
              
              {/* Live Messages scrollbox */}
              <div className="p-4 overflow-y-auto space-y-4 flex-grow text-xs leading-relaxed">
                {aiChat.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 border ${msg.role === 'user' ? 'bg-purple-950/75 border-purple-700 text-white rounded-tr-none' : 'bg-slate-950 border-slate-800 text-slate-200 rounded-tl-none'}`}>
                      <p className="text-[10px] font-extrabold tracking-widest uppercase mb-1 opacity-60">
                        {msg.role === 'user' ? 'You (Aura Client)' : 'AURA Beauty Consultant 👑'}
                      </p>
                      
                      {/* Simple Markdown-Like renderer for highlights */}
                      <p className="whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-950 border border-slate-800 max-w-[85%] rounded-2xl p-4 rounded-tl-none text-slate-400 animate-pulse">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1">AURA AI Consultant</p>
                      <p className="text-xs">Formulating South Africa's best recommendations... 🌸</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && askGeminiBeautyConsultant(aiInput)}
                  placeholder="Ask for sunscreen recommendations, Got2B alternatives, hyperpigmentation fixes..."
                  className="flex-grow bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <button 
                  onClick={() => askGeminiBeautyConsultant(aiInput)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shrink-0"
                >
                  Ask AI
                </button>
              </div>

            </div>

            {/* Quick Prompt Suggesters */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block">Popular Chat Prompts:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'What are the best TikTok viral skin care products for hyperpigmentation?',
                  'Recommend wig styling glue and late night hair remedies in JHB.',
                  'Find an affordable high-quality dupe for high-end Dior or NARS primers.',
                  'Build a morning glowing routine with Beauty of Joseon and COSRX.'
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => askGeminiBeautyConsultant(promptText)}
                    className="bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] text-slate-300 transition-all text-left"
                  >
                    💡 "{promptText}"
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------
            TAB 6: ORDER & SERVICE TRACKER PORTAL
           ------------------------------------------ */}
        {activeTab === 'tracker' && (
          <div className="max-w-3xl mx-auto py-4 space-y-8 animate-fadeIn">
            
            {/* Header Tracking Banner */}
            <div className="text-center space-y-1">
              <span className="bg-emerald-950 text-emerald-400 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-800 inline-block">
                AURA REAL-TIME TRACKING
              </span>
              <h3 className="text-2xl font-black text-slate-100">Live Status Tracker</h3>
              <p className="text-slate-400 text-xs">
                Monitor your rapid delivery riders or traveling stylists live in South Africa.
              </p>
            </div>

            {/* Active Shopping Orders Block */}
            {orders.length > 0 ? (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
                
                {/* Meta Head */}
                <div className="flex justify-between items-center flex-wrap gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-100">Order ID: {orders[0].id}</h4>
                    <p className="text-[10px] text-slate-400">Created: {orders[0].time} • {orders[0].deliveryType === 'campus' ? 'Midnight Campus Run' : '60-Min Express Hub'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Total Paid</p>
                    <p className="text-base font-black text-rose-400">R {orders[0].total}</p>
                  </div>
                </div>

                {/* Track Progression Flow */}
                <div className="relative pt-6">
                  <div className="absolute top-10 left-3.5 right-3.5 h-1 bg-slate-800 -z-10"></div>
                  
                  {/* Progress filler line */}
                  <div 
                    className="absolute top-10 left-3.5 h-1 bg-gradient-to-r from-purple-500 to-pink-500 -z-10 transition-all duration-1000"
                    style={{ width: `${(currentOrderStep / 4) * 100}%` }}
                  ></div>

                  <div className="grid grid-cols-4 text-center text-xs gap-2">
                    
                    {/* Step 1 */}
                    <div className="space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto border-2 font-black ${currentOrderStep >= 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-pink-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                        1
                      </div>
                      <p className={`font-bold ${currentOrderStep >= 1 ? 'text-slate-100' : 'text-slate-500'}`}>Confirmed</p>
                      <p className="text-[9px] text-slate-400 hidden sm:block">Aura Rider picked up order</p>
                    </div>

                    {/* Step 2 */}
                    <div className="space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto border-2 font-black ${currentOrderStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-pink-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                        2
                      </div>
                      <p className={`font-bold ${currentOrderStep >= 2 ? 'text-slate-100' : 'text-slate-500'}`}>Packing</p>
                      <p className="text-[9px] text-slate-400 hidden sm:block">Wrapping fragile makeup/glue</p>
                    </div>

                    {/* Step 3 */}
                    <div className="space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto border-2 font-black ${currentOrderStep >= 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-pink-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                        3
                      </div>
                      <p className={`font-bold ${currentOrderStep >= 3 ? 'text-slate-100' : 'text-slate-500'}`}>Departed</p>
                      <p className="text-[9px] text-slate-400 hidden sm:block">Rider traveling on scooter</p>
                    </div>

                    {/* Step 4 */}
                    <div className="space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto border-2 font-black ${currentOrderStep >= 4 ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-pink-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                        4
                      </div>
                      <p className={`font-bold ${currentOrderStep >= 4 ? 'text-slate-100' : 'text-slate-500'}`}>Arrived</p>
                      <p className="text-[9px] text-slate-400 hidden sm:block">Handed to client</p>
                    </div>

                  </div>
                </div>

                {/* Shipping Details Visual */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <h5 className="font-bold text-slate-200">📦 Delivery Particulars</h5>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Destined address: <strong className="text-slate-200">{orders[0].address}</strong>
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Speed policy: <strong className="text-slate-200">{orders[0].deliveryType === 'campus' ? 'Late night express residence gate drop-off' : 'Standard 60-Min Express Scooter Run'}</strong>
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs max-w-md mx-auto space-y-3">
                <span className="text-4xl block">📦</span>
                <h4 className="font-bold text-slate-200">No Active Product Deliveries</h4>
                <p className="max-w-xs mx-auto">
                  Place an order from the express shop catalog to initialize real-time live mapping and tracking updates.
                </p>
                <button 
                  onClick={() => setActiveTab('shop')}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg"
                >
                  Shop Now
                </button>
              </div>
            )}

            {/* Stylist & Booking Appointments tracker */}
            {bookings.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
                  <span>📅</span> Vetted Beauty Tech Appointments
                </h4>

                {bookings.map((bok, i) => (
                  <div key={i} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl bg-slate-950 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">{bok.proImage}</span>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-slate-100">{bok.service}</h5>
                        <p className="text-xs text-rose-400 font-semibold">Stylist: {bok.proName}</p>
                        <p className="text-[10px] text-slate-400">Date: {bok.date} • Time: {bok.time}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 w-full sm:w-auto">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider block sm:inline-block mb-2">
                        {bok.status}
                      </span>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Fee booked</p>
                      <p className="text-sm font-black text-slate-100">R {bok.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* ==========================================
          SIDE-OVER DRAWER: SHOPPING BAG / CHECKOUT
         ========================================== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl p-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛍️</span>
                <h4 className="font-extrabold text-base text-white">Your Aura Bag</h4>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto py-4 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-3xl shrink-0">{item.image}</span>
                    <div className="flex-grow text-xs space-y-1">
                      <h5 className="font-bold text-slate-200">{item.name}</h5>
                      <p className="text-rose-400 font-semibold">R {item.price}</p>
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-2 pt-1.5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-slate-800 hover:bg-slate-700 text-white rounded w-5 h-5 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold text-slate-100">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-slate-800 hover:bg-slate-700 text-white rounded w-5 h-5 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-rose-400 text-xs font-bold px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-400 space-y-3">
                  <span className="text-4xl block">✨</span>
                  <p className="text-xs font-semibold">Your luxury bag is empty.</p>
                  <p className="text-[11px] text-slate-500">Go to our shop to start adding trending cosmetics, emergency glue, or skincare.</p>
                  <button 
                    onClick={() => { setActiveTab('shop'); setIsCheckoutOpen(false); }}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    View Express Shop
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations and Express Delivery Type Selection */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                
                {/* Select Express Delivery Mode */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block">Choose Delivery Speed Policy:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button 
                      onClick={() => setDeliveryType('express')}
                      className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${deliveryType === 'express' ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800 bg-slate-950'}`}
                    >
                      <span className="font-bold">🚀 60-Min Express</span>
                      <span className="text-[10px] text-slate-400 mt-1">Sandton / Cape Town / Pretoria (R35)</span>
                    </button>
                    <button 
                      onClick={() => setDeliveryType('campus')}
                      className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${deliveryType === 'campus' ? 'border-purple-500 bg-purple-950/20' : 'border-slate-800 bg-slate-950'}`}
                    >
                      <span className="font-bold">🎓 Campus Run</span>
                      <span className="text-[10px] text-slate-400 mt-1">Wits, UP, UJ, UNISA (R15)</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Bag Total:</span>
                    <span>R {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Delivery Charge:</span>
                    <span>R {deliveryType === 'campus' ? 15 : 35}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-1 border-t border-slate-800">
                    <span>Grand Total:</span>
                    <span className="text-rose-400">R {cartTotal + (deliveryType === 'campus' ? 15 : 35)}</span>
                  </div>
                </div>

                {/* Form placement */}
                <form onSubmit={handleCheckout} className="space-y-3">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide"
                  >
                    Confirm Delivery & Simulate Payment
                  </button>
                </form>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ==========================================
          FOOTER BRAND STRIP
         ========================================== */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-slate-200">AURA — Built for SA Beauty Ecosystem</h4>
            <p className="text-slate-500">Johannesburg • Pretoria • Cape Town • Sandton • Waterfall</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-slate-400 font-medium">
            <button onClick={() => setActiveTab('home')} className="hover:text-white">Home</button>
            <button onClick={() => { setSelectedCategory('All'); setActiveTab('shop'); }} className="hover:text-white">Shop Express</button>
            <button onClick={() => setActiveTab('aura-go')} className="hover:text-white">AURA Go (Pros)</button>
            <button onClick={() => setActiveTab('luxury')} className="hover:text-white">Luxury Concierge</button>
            <button onClick={() => setActiveTab('ai-consultant')} className="hover:text-white">AI Skincare Expert</button>
          </div>

          <p className="text-slate-500 text-[11px] text-center md:text-right">
            © 2026 AURA Inc. All Rights Reserved. Vetted Delivery network.
          </p>
        </div>
      </footer>

    </div>
  );
}

```
