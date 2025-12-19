
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { CATEGORIES, FEATURES } from './constants';
import { CategoryKey, Feature, ChatMessage } from './types';
import { getGeminiStreamResponse, generateExperts, ExpertProfile, generateGameChallenge, GameChallenge } from './services/gemini';

const IconWrapper = ({ iconName, className }: { iconName: string, className?: string }) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

type ViewState = 'HOME' | 'CATEGORY' | 'FEATURE' | 'DIRECTORY' | 'COUNTRY_SELECT' | 'EXPERT_RESULTS' | 'GAMES' | 'SAFETY';

const COUNTRIES = [
  { name: 'UK', flag: '🇬🇧' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Japan', flag: '🇯🇵' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const [experts, setExperts] = useState<ExpertProfile[]>([]);
  const [expertType, setExpertType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [callTarget, setCallTarget] = useState<ExpertProfile | null>(null);

  const [gameChallenge, setGameChallenge] = useState<GameChallenge | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameFeedback, setGameFeedback] = useState('');

  const fullResponseRef = useRef('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredFeatures = useMemo(() => {
    if (!selectedCategory) return [];
    return FEATURES.filter(f => f.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typedText, isLoading]);

  useEffect(() => {
    let timeout: number;
    if (!isLoading && fullResponseRef.current && typedText.length < fullResponseRef.current.length) {
      timeout = window.setTimeout(() => {
        const charPerTick = typedText.length > 300 ? 20 : 12;
        const nextBatch = fullResponseRef.current.slice(0, typedText.length + charPerTick);
        setTypedText(nextBatch);
      }, 8); 
    } else if (!isLoading && fullResponseRef.current && typedText.length >= fullResponseRef.current.length && fullResponseRef.current !== '') {
      const final = fullResponseRef.current;
      setMessages(prev => [...prev, { role: 'model', text: final }]);
      fullResponseRef.current = '';
      setTypedText('');
    }
    return () => clearTimeout(timeout);
  }, [typedText, isLoading]);

  const handleSendMessage = async (text: string = userInput) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsLoading(true);
    setTypedText('');
    fullResponseRef.current = '';

    const systemPrompt = activeFeature 
      ? `Expert protocol for ${activeFeature.name}. Be extremely smart. Use emojis. Access web if needed.`
      : "Smart Aid Core. Max capabilities. Provide high-IQ answers.";

    try {
      const stream = getGeminiStreamResponse(text, [...messages, userMsg], systemPrompt);
      let accumulated = '';
      for await (const chunk of stream) {
        accumulated += chunk;
      }
      fullResponseRef.current = accumulated;
    } catch (e) {
      fullResponseRef.current = "❌ Connection failed. Please check your signal.";
    } finally {
      setIsLoading(false);
    }
  };

  const startExpertFlow = (type: string) => {
    setExpertType(type);
    setCurrentView('COUNTRY_SELECT');
  };

  const loadExpertResults = async (country: any) => {
    setSelectedCountry(country);
    setIsLoading(true);
    setCurrentView('EXPERT_RESULTS');
    const data = await generateExperts(expertType, country.name);
    setExperts(data);
    setIsLoading(false);
  };

  const startNewGame = async () => {
    setIsLoading(true);
    setGameFeedback('');
    const challenge = await generateGameChallenge("Logic Mastery");
    setGameChallenge(challenge);
    setIsLoading(false);
  };

  const handleGameAnswer = (ans: string) => {
    if (!gameChallenge) return;
    if (ans === gameChallenge.correctAnswer) {
      setGameScore(s => s + 50);
      setGameFeedback("💎 EXCELLENT! +50 IQ");
      setTimeout(startNewGame, 1000);
    } else {
      setGameFeedback(`❌ Incorrect. Correct answer: ${gameChallenge.correctAnswer}`);
      setTimeout(startNewGame, 2000);
    }
  };

  const triggerCall = (expert: ExpertProfile) => {
    setCallTarget(expert);
    setTimeout(() => {
      window.location.href = `tel:${expert.phoneNumber.replace(/\s/g, '')}`;
    }, 1500);
  };

  const openFeature = (feature: Feature) => {
    if (feature.category === 'FUN' && feature.name.includes('Games')) {
      setCurrentView('GAMES');
      startNewGame();
      setIsSidebarOpen(false);
      return;
    }
    setActiveFeature(feature);
    setCurrentView('FEATURE');
    setMessages([{ role: 'model', text: `⚡ **${feature.name} System Active.** How can I assist?` }]);
    setIsSidebarOpen(false);
  };

  const goHome = () => {
    setCurrentView('HOME');
    setSelectedCategory(null);
    setActiveFeature(null);
    setIsSidebarOpen(false);
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      let content = line;
      content = content.replace(/\*\*(.*?)\*\*/g, '<b class="text-indigo-950">$1</b>');
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={i} className="ml-5 list-disc mb-1 text-sm md:text-base opacity-90" dangerouslySetInnerHTML={{ __html: content.substring(2) }} />;
      }
      return <p key={i} className="mb-2 text-sm md:text-base leading-relaxed opacity-95" dangerouslySetInnerHTML={{ __html: content }} />;
    });
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 font-sans text-slate-900 overflow-hidden">
      
      {/* Dialer Overlay */}
      {callTarget && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/90 flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-300 backdrop-blur-sm">
           <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center animate-pulse mb-6 shadow-2xl">
              <LucideIcons.PhoneCall className="w-12 h-12" />
           </div>
           <h3 className="text-3xl font-black mb-2">{callTarget.name}</h3>
           <p className="text-slate-400 font-bold tracking-widest text-sm mb-12 uppercase">{callTarget.phoneNumber}</p>
           <button onClick={() => setCallTarget(null)} className="bg-red-600 px-12 py-4 rounded-full font-black text-sm uppercase shadow-xl hover:bg-red-700 transition-all">End Call</button>
        </div>
      )}

      {/* Modern Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <LucideIcons.Zap className="w-5 h-5 fill-current" />
          </div>
          <h1 className="text-lg font-black tracking-tighter uppercase">Smart Aid <span className="text-indigo-600">v8</span></h1>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-10">
          <button onClick={goHome} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'HOME' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LucideIcons.LayoutGrid className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">Core</span>
          </button>
          <button onClick={() => setCurrentView('DIRECTORY')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'DIRECTORY' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LucideIcons.Users className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">Experts</span>
          </button>
          <button onClick={() => { setCurrentView('GAMES'); startNewGame(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'GAMES' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LucideIcons.Gamepad2 className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">IQ Games</span>
          </button>
          <div className="h-px bg-slate-100 my-6 mx-2"></div>
          {Object.values(CATEGORIES).map(cat => (
            <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setCurrentView('CATEGORY'); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${selectedCategory === cat.id ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
              <IconWrapper iconName={cat.icon} className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest truncate">{cat.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Experience Container */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-100">
        
        {/* Universal Header */}
        <header className="px-4 py-3 md:px-8 md:py-5 bg-white border-b border-slate-200 flex justify-between items-center z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-slate-50 rounded-lg border border-slate-100 shadow-sm">
              <LucideIcons.Menu className="w-6 h-6 text-slate-900" />
            </button>
            <h2 className="text-base md:text-xl font-black text-slate-900 tracking-tighter uppercase truncate max-w-[120px] md:max-w-none">
              {currentView === 'HOME' ? 'Dashboard' : currentView.replace('_', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
             {currentView === 'GAMES' && <div className="bg-yellow-400 text-indigo-950 px-3 py-1 rounded-lg font-black text-[10px] md:text-xs">IQ RANK: {gameScore}</div>}
             <button onClick={() => setCurrentView('SAFETY')} className="bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-100 active:scale-95 transition-all">SOS</button>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          
          {/* DASHBOARD */}
          {currentView === 'HOME' && (
            <div className="max-w-5xl mx-auto space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="bg-indigo-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight uppercase italic">Elite Life<br />System.</h1>
                  <p className="text-sm md:text-2xl text-indigo-100 max-w-xl font-medium opacity-90 leading-relaxed">Everything you need, in one smart place. High-IQ assistant at your command. 💎</p>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setCurrentView('DIRECTORY')} className="bg-white text-indigo-900 px-8 py-3 rounded-2xl font-black text-xs md:text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all">Find Experts</button>
                    <button onClick={() => { setCurrentView('GAMES'); startNewGame(); }} className="bg-yellow-400 text-indigo-950 px-8 py-3 rounded-2xl font-black text-xs md:text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all">IQ Games</button>
                  </div>
                </div>
                <LucideIcons.Cpu className="absolute -right-16 -bottom-16 w-[20rem] h-[20rem] text-white opacity-5" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
                {Object.values(CATEGORIES).map(cat => (
                  <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setCurrentView('CATEGORY'); }} className={`${cat.bgColor} ${cat.color} p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col justify-between h-36 md:h-44 border-2 border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden`}>
                    <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm w-fit group-hover:scale-110 transition-transform"><IconWrapper iconName={cat.icon} className="w-5 h-5 md:w-6 md:h-6" /></div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* IQ GAMES */}
          {currentView === 'GAMES' && (
             <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
               <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200 text-center space-y-8 relative overflow-hidden">
                 {isLoading ? (
                   <div className="py-16 flex flex-col items-center gap-4">
                     <LucideIcons.BrainCircuit className="w-16 h-16 text-indigo-600 animate-pulse" />
                     <p className="text-indigo-600 font-black text-xs uppercase tracking-widest">Generating Puzzle...</p>
                   </div>
                 ) : gameChallenge ? (
                   <>
                     <div className="space-y-2">
                       <p className="text-indigo-500 font-black uppercase tracking-[0.2em] text-[10px]">Brain Challenge</p>
                       <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight tracking-tighter">{gameChallenge.question}</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {gameChallenge.options.map((opt, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleGameAnswer(opt)}
                            className="p-5 bg-slate-50 rounded-2xl text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-slate-100 hover:border-indigo-600 active:scale-95"
                          >
                            {opt}
                          </button>
                        ))}
                     </div>
                     {gameFeedback && (
                        <div className={`p-5 rounded-2xl font-black text-xs md:text-sm animate-in fade-in ${gameFeedback.includes('💎') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {gameFeedback}
                        </div>
                     )}
                   </>
                 ) : null}
               </div>
               <div className="flex justify-center">
                  <button onClick={startNewGame} className="bg-slate-900 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase active:scale-95 transition-all shadow-xl">Skip Puzzle</button>
               </div>
             </div>
          )}

          {/* SAFETY PORTAL */}
          {currentView === 'SAFETY' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
              <div className="bg-red-600 text-white p-8 md:p-12 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                <LucideIcons.ShieldAlert className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Emergency Protocol</h2>
                <p className="text-red-100 font-bold max-w-md mx-auto mb-8">Direct line to global emergency responders. Access is immediate.</p>
                <div className="grid grid-cols-2 gap-3">
                   <button className="bg-white text-red-600 py-6 rounded-2xl font-black text-sm shadow-xl active:scale-95 uppercase">Police</button>
                   <button className="bg-white text-red-600 py-6 rounded-2xl font-black text-sm shadow-xl active:scale-95 uppercase">Medical</button>
                   <button className="bg-white text-red-600 py-6 rounded-2xl font-black text-sm shadow-xl active:scale-95 uppercase col-span-2">Send My Location</button>
                </div>
              </div>
            </div>
          )}

          {/* EXPERT SEARCH */}
          {currentView === 'DIRECTORY' && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">Expert Network.</h2>
                <p className="text-slate-400 font-black uppercase text-[10px] md:text-xs tracking-widest mt-1">Direct access to elite professionals</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "Senior Lawyer", icon: "Scale", color: "bg-blue-600" },
                  { title: "Elite Doctor", icon: "Stethoscope", color: "bg-red-600" },
                  { title: "Math & Science Tutor", icon: "School", color: "bg-purple-600" },
                  { title: "Wealth Manager", icon: "Calculator", color: "bg-emerald-600" },
                  { title: "Master Vet", icon: "PawPrint", color: "bg-teal-600" },
                  { title: "Principal Engineer", icon: "Hammer", color: "bg-orange-600" }
                ].map((p, i) => (
                  <button key={i} onClick={() => startExpertFlow(p.title)} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-left flex flex-col gap-4">
                    <div className={`${p.color} p-4 rounded-2xl text-white shadow-lg w-fit group-hover:scale-110 transition-transform`}>
                      <IconWrapper iconName={p.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tighter leading-none">{p.title}</h4>
                      <p className="text-slate-400 font-bold text-[10px] mt-2 uppercase tracking-widest">Verified Online Now</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COUNTRY SELECT */}
          {currentView === 'COUNTRY_SELECT' && (
             <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95">
                <div className="text-center">
                   <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Select Region.</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {COUNTRIES.map((c) => (
                      <button 
                        key={c.name} 
                        onClick={() => loadExpertResults(c)}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:border-indigo-600 transition-all flex flex-col items-center gap-3 group"
                      >
                         <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{c.flag}</span>
                         <span className="font-black text-slate-900 text-xs uppercase tracking-widest">{c.name}</span>
                      </button>
                   ))}
                </div>
             </div>
          )}

          {/* EXPERT RESULTS */}
          {currentView === 'EXPERT_RESULTS' && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-right-12 duration-500">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[2rem] shadow-md border border-slate-200">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedCountry.flag}</span>
                    <div>
                      <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{expertType}s</h2>
                      <p className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mt-1">Pool Active in {selectedCountry.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setCurrentView('DIRECTORY')} className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase shadow-lg">Change Type</button>
               </div>
               
               {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1,2,3,4].map(n => (
                      <div key={n} className="bg-white p-10 rounded-[2.5rem] animate-pulse h-64 border border-slate-100 shadow-sm"></div>
                    ))}
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {experts.map((e, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:border-indigo-400 transition-all group relative overflow-hidden">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-indigo-900 rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl shadow-lg ring-4 ring-indigo-50">
                               {e.name[0]}
                            </div>
                            <div className="flex-1">
                               <h3 className="text-xl font-black text-slate-900 tracking-tighter">{e.name}</h3>
                               <p className="text-indigo-600 font-black text-xs uppercase mt-1 tracking-widest">{e.title}</p>
                            </div>
                         </div>
                         <div className="space-y-6">
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed italic font-medium">"{e.bio}"</p>
                            <div className="grid grid-cols-2 gap-3">
                               <div className="bg-indigo-50 p-4 rounded-2xl">
                                  <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Specialty</p>
                                  <p className="font-black text-indigo-950 text-xs md:text-sm">{e.specialty}</p>
                               </div>
                               <div className="bg-slate-50 p-4 rounded-2xl">
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Record</p>
                                  <p className="font-black text-slate-900 text-xs md:text-sm">{e.experience}</p>
                               </div>
                            </div>
                            <div className="pt-6 flex flex-col gap-3 border-t border-slate-100">
                               <div className="flex justify-between items-center mb-1">
                                  <div className="font-black text-2xl text-slate-900">{e.price}<span className="text-[10px] text-slate-400 font-black ml-1 uppercase">/Hr</span></div>
                                  <div className="text-green-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div> Online
                                  </div>
                               </div>
                               <div className="grid grid-cols-2 gap-3">
                                 <button onClick={() => triggerCall(e)} className="bg-indigo-900 text-white p-4 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg">
                                   <LucideIcons.PhoneCall className="w-4 h-4" /> CALL
                                 </button>
                                 <button onClick={() => openFeature(FEATURES.find(f => f.id === 71)!)} className="bg-indigo-600 text-white p-4 rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg">
                                   <LucideIcons.MessageSquare className="w-4 h-4" /> CHAT
                                 </button>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
               )}
            </div>
          )}

          {/* AI CHAT INTERFACE */}
          {currentView === 'FEATURE' && activeFeature && (
            <div className="flex flex-col h-full max-w-4xl mx-auto pb-10">
              <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-6 custom-scrollbar pr-3 pb-24">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[92%] px-6 py-4 md:px-8 md:py-6 rounded-[2rem] shadow-xl ${
                      msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border-2 border-white ring-1 ring-slate-200 shadow-indigo-100'
                    }`}>
                      {formatText(msg.text)}
                    </div>
                  </div>
                ))}
                
                {typedText && (
                  <div className="flex justify-start">
                    <div className="max-w-[92%] px-6 py-4 md:px-8 md:py-6 bg-white text-slate-800 rounded-[2rem] rounded-tl-none border-2 border-white shadow-xl relative ring-1 ring-slate-200">
                      {formatText(typedText)}
                      <span className="inline-block w-2.5 h-5 ml-1 bg-indigo-600 animate-pulse align-middle rounded-full"></span>
                    </div>
                  </div>
                )}
                
                {isLoading && !typedText && (
                  <div className="flex justify-start">
                    <div className="bg-white border-2 border-white p-6 rounded-[1.5rem] flex gap-3 items-center shadow-lg ring-1 ring-slate-200">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} className="h-10" />
              </div>

              {/* Chat Input */}
              <div className="pt-4 pb-4 relative z-50">
                <div className="flex gap-3 bg-white p-3 rounded-full border-2 border-white shadow-2xl items-center ring-1 ring-slate-200">
                  <input 
                    type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent px-5 py-2 text-base md:text-xl font-bold focus:outline-none placeholder:text-slate-200"
                  />
                  <button onClick={() => handleSendMessage()} disabled={isLoading || !userInput.trim()} className="bg-indigo-900 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl">
                    <LucideIcons.Send className="w-5 h-5 md:w-8 md:h-8" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-CATEGORY SYSTEM */}
          {currentView === 'CATEGORY' && selectedCategory && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-right-12 duration-500">
               <div className="flex items-center gap-6 mb-12 bg-white p-8 rounded-[2.5rem] shadow-md border-2 border-white ring-1 ring-slate-200">
                  <div className={`${CATEGORIES[selectedCategory].bgColor} ${CATEGORIES[selectedCategory].color} p-8 rounded-[2rem] shadow-lg border-2 border-white`}>
                     <IconWrapper iconName={CATEGORIES[selectedCategory].icon} className="w-12 h-12" />
                  </div>
                  <h2 className={`text-3xl md:text-7xl font-black tracking-tighter uppercase ${CATEGORIES[selectedCategory].color}`}>{CATEGORIES[selectedCategory].label}</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
                 {filteredFeatures.map(feature => (
                   <button key={feature.id} onClick={() => openFeature(feature)} className="flex items-center gap-6 p-6 bg-white border-2 border-white rounded-[2rem] hover:border-indigo-400 hover:shadow-2xl transition-all text-left group shadow-sm ring-1 ring-slate-100">
                      <div className={`${CATEGORIES[feature.category].bgColor} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                         <IconWrapper iconName={feature.icon} className="w-8 h-8" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <h3 className="text-base font-black text-slate-900 uppercase truncate leading-none">{feature.name}</h3>
                         <p className="text-slate-400 font-bold text-xs mt-1.5 truncate">{feature.description}</p>
                      </div>
                      <LucideIcons.ArrowRight className="w-6 h-6 text-slate-100 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
                   </button>
                 ))}
               </div>
            </div>
          )}

        </main>

        {/* Universal Mobile Nav */}
        <nav className="bg-white border-t border-slate-200 p-5 flex justify-around items-center z-[250] lg:hidden shadow-[0_-20px_60px_rgba(0,0,0,0.05)]">
           <button onClick={goHome} className={`p-2 transition-all ${currentView === 'HOME' ? 'text-indigo-600 scale-125' : 'text-slate-200'}`}>
              <LucideIcons.LayoutGrid className="w-7 h-7" strokeWidth={3} />
           </button>
           <button onClick={() => setCurrentView('DIRECTORY')} className={`p-2 transition-all ${currentView === 'DIRECTORY' ? 'text-indigo-600 scale-125' : 'text-slate-200'}`}>
              <LucideIcons.Users className="w-7 h-7" strokeWidth={3} />
           </button>
           <button onClick={() => { setCurrentView('GAMES'); startNewGame(); }} className="relative -top-10 bg-slate-950 text-white p-6 rounded-3xl shadow-2xl border-4 border-white active:scale-90 transition-all">
              <LucideIcons.Zap className="w-8 h-8 fill-yellow-400" />
           </button>
           <button onClick={() => setCurrentView('SAFETY')} className={`p-2 transition-all ${currentView === 'SAFETY' ? 'text-red-600 scale-125' : 'text-slate-200'}`}>
              <LucideIcons.ShieldAlert className="w-7 h-7" strokeWidth={3} />
           </button>
           <button onClick={() => setIsSidebarOpen(true)} className={`p-2 transition-all ${isSidebarOpen ? 'text-indigo-600 scale-125' : 'text-slate-200'}`}>
              <LucideIcons.Menu className="w-7 h-7" strokeWidth={3} />
           </button>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      <div className={`fixed inset-0 z-[1000] lg:hidden transition-all duration-400 ${isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsSidebarOpen(false)}></div>
        <aside className={`absolute top-0 left-0 h-full w-[80%] max-w-xs bg-white shadow-2xl transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 bg-indigo-900 text-white flex justify-between items-center">
            <h2 className="text-xl font-black tracking-tighter uppercase">Elite Core</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-white/10 rounded-xl"><LucideIcons.X className="w-6 h-6" /></button>
          </div>
          <div className="p-6 space-y-3 overflow-y-auto h-[calc(100%-120px)] custom-scrollbar">
             <button onClick={goHome} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-900 font-black text-sm hover:bg-slate-50 border border-slate-50 transition-all uppercase tracking-widest">
               <LucideIcons.Home className="w-5 h-5 text-indigo-600" /> Home
             </button>
             <button onClick={() => { setCurrentView('DIRECTORY'); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-900 font-black text-sm hover:bg-slate-50 border border-slate-50 transition-all uppercase tracking-widest">
               <LucideIcons.Users className="w-5 h-5 text-indigo-600" /> Professionals
             </button>
             <div className="h-px bg-slate-100 my-4"></div>
             {Object.values(CATEGORIES).map(cat => (
              <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setCurrentView('CATEGORY'); setIsSidebarOpen(false); }} className={`flex items-center gap-4 w-full p-4 rounded-xl text-slate-600 font-bold text-[10px] hover:bg-slate-50 uppercase tracking-widest ${selectedCategory === cat.id ? 'bg-indigo-50 text-indigo-600' : ''}`}>
                <IconWrapper iconName={cat.icon} className="w-5 h-5" /> {cat.label}
              </button>
            ))}
          </div>
        </aside>
      </div>

    </div>
  );
};

export default App;
