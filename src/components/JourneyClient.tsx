'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Trophy, 
  User, 
  Calendar,
  Flag,
  Target,
  Infinity as InfinityIcon,
  MonitorPlay,
  Gamepad2,
  BookOpen,
  Baby,
  X
} from "lucide-react";

interface Milestone {
  _id: string;
  title: string;
  category: 'work' | 'education' | 'projects' | 'achievements' | 'personal';
  icon?: string;
  year: string;
  orderDate: string;
  subtitle?: string;
  shortSummary?: string;
  detailedDescription?: string;
  highlights?: string[];
  isCurrent?: boolean;
}

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Work", value: "work" },
  { label: "Education", value: "education" },
  { label: "Projects", value: "projects" },
  { label: "Achievements", value: "achievements" },
  { label: "Personal", value: "personal" },
];

export default function JourneyClient({ milestones }: { milestones: Milestone[] }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeModalItem, setActiveModalItem] = useState<Milestone | null>(null);
  
  // Dynamic Date State
  const [currentDate, setCurrentDate] = useState("");

  // Scroll & Visibility State
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [topCardName, setTopCardName] = useState("");
  const [bottomCardName, setBottomCardName] = useState("");
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0); 
  
  // Custom Scrollbar Interactive State
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [trackHeight, setTrackHeight] = useState(900);

  const filteredMilestones = milestones.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  useEffect(() => {
    setCurrentDate(new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(new Date()));
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      setTrackHeight(trackRef.current.clientHeight);
    }
  }, [filteredMilestones]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    setIsAtTop(scrollTop < 20);
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5);

    if (scrollHeight > clientHeight) {
      setScrollProgress(scrollTop / (scrollHeight - clientHeight));
    } else {
      setScrollProgress(0);
    }

    const cards = containerRef.current.querySelectorAll('.milestone-card');
    const presentNode = containerRef.current.querySelector('.present-node');
    
    let firstVis = -1;
    let lastVis = -1;
    const triggerY = 45; 
    let foundActive = false;
    let newActiveIndex = -2;

    if (presentNode) {
      const pTop = (presentNode as HTMLElement).offsetTop;
      const pRel = pTop - scrollTop;
      if (pRel >= triggerY && pRel < clientHeight) {
        newActiveIndex = -1;
        foundActive = true;
      }
    }

    cards.forEach((card, index) => {
      const htmlCard = card as HTMLElement;
      const dotTop = htmlCard.offsetTop + 40; 
      const bottom = htmlCard.offsetTop + htmlCard.offsetHeight;
      const relTop = dotTop - scrollTop;

      if (bottom > scrollTop && htmlCard.offsetTop < scrollTop + clientHeight) {
        if (firstVis === -1) firstVis = index;
        lastVis = index;
      }

      if (!foundActive && relTop >= triggerY && relTop < clientHeight) {
        newActiveIndex = index;
        foundActive = true;
      }
    });

    if (firstVis > 0) {
      setTopCardName(filteredMilestones[firstVis - 1]?.title || "");
    } else {
      setTopCardName("");
    }

    if (lastVis !== -1 && lastVis < filteredMilestones.length - 1) {
      setBottomCardName(filteredMilestones[lastVis + 1]?.title || "");
    } else {
      setBottomCardName("");
    }

    setActiveCardIndex(newActiveIndex);
  };

  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMilestones]);

  // Robust Drag Handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 1. Save the specific element and ID so we can release it properly later
    const thumbElement = e.currentTarget;
    const pointerId = e.pointerId;

    thumbElement.setPointerCapture(pointerId);
    setIsDragging(true);
    
    const startY = e.clientY;
    const startScrollTop = containerRef.current?.scrollTop || 0;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!containerRef.current || !trackRef.current) return;
      
      const deltaY = moveEvent.clientY - startY;
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      
      const currentTrackHeight = trackRef.current.clientHeight;
      const maxThumbTravel = currentTrackHeight - 100; // 100px is thumb height
      
      const scrollDelta = (deltaY / maxThumbTravel) * maxScrollTop;
      containerRef.current.scrollTop = startScrollTop + scrollDelta;
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      
      // 2. Safely release capture from the specific thumb element
      try {
        thumbElement.releasePointerCapture(pointerId);
      } catch (err) {
        // Fail silently if the browser already lost the pointer
      }

      // 3. Clean up the event listeners
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };

    // 4. Attach listeners to the window so they persist even if the mouse leaves the browser
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp); // Covers alt-tabbing or lost focus
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "graduation": return <GraduationCap className="size-5" />;
      case "briefcase": return <Briefcase className="size-5" />;
      case "monitor": return <MonitorPlay className="size-5" />;
      case "gamepad": return <Gamepad2 className="size-5" />;
      case "book": return <BookOpen className="size-5" />;
      case "baby": return <Baby className="size-5" />;
      default: return <Briefcase className="size-5" />;
    }
  };

  const isPresentActive = activeCardIndex === -1;
  const thumbHeight = 100;
  const maxTranslateY = trackHeight - thumbHeight;

  return (
    <section id="journey" className="relative py-16 lg:py-24" aria-labelledby="journey-heading">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* HEADER & STATS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-12">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-500 uppercase">
              JOURNEY
            </p>
            <h2 id="journey-heading" className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white">
              My Journey<span className="text-purple-500">.</span>
            </h2>
            <p className="text-base text-slate-400 font-light leading-relaxed pt-2">
              A timeline of moments that shaped who I am today.<br/>
              From my first steps to where I&apos;m headed next.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6 sm:gap-10 rounded-2xl border border-slate-800/80 bg-[#0B1121]/50 p-6 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center gap-2">
              <Calendar className="size-6 text-purple-500" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">21</span>
                <span className="text-xs text-slate-500">Years</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Flag className="size-6 text-purple-500" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">{milestones.length}</span>
                <span className="text-xs text-slate-500">Milestones</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Target className="size-6 text-purple-500" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">5</span>
                <span className="text-xs text-slate-500">Categories</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Rocket className="size-6 text-purple-500" />
              <div className="text-center">
                <span className="block text-2xl font-bold text-white"><InfinityIcon className="size-5 mx-auto" /></span>
                <span className="text-xs text-slate-500">Keep Growing</span>
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-14 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = selectedFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedFilter(cat.value);
                  setTimeout(() => handleScroll(), 100);
                }}
                className={`rounded-full px-6 py-2 text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                    : "border border-slate-800 bg-[#0B1121]/50 text-slate-400 hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative mx-auto w-full max-w-5xl h-225 overflow-hidden rounded-2xl">
          
          <style dangerouslySetInnerHTML={{__html: `
            .hide-native-scroll::-webkit-scrollbar {
              display: none !important;
            }
            .hide-native-scroll {
              -ms-overflow-style: none !important;
              scrollbar-width: none !important;
            }
          `}} />

          {/* INTERACTIVE CUSTOM SCROLLBAR */}
          <div 
            ref={trackRef}
            className="absolute top-0 right-1 bottom-0 w-6 z-50 flex justify-center cursor-pointer select-none touch-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              if (e.target === trackRef.current && containerRef.current) {
                const rect = trackRef.current.getBoundingClientRect();
                const clickY = e.clientY - rect.top;
                const currentTrackHeight = trackRef.current.clientHeight;
                const maxTravel = currentTrackHeight - thumbHeight;
                const targetTravel = Math.max(0, Math.min(maxTravel, clickY - (thumbHeight / 2)));
                
                const scrollHeight = containerRef.current.scrollHeight;
                const clientHeight = containerRef.current.clientHeight;
                const maxScrollTop = scrollHeight - clientHeight;
                
                const targetScrollTop = (targetTravel / maxTravel) * maxScrollTop;
                containerRef.current.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
              }
            }}
          >
            {/* The Thumb */}
            <motion.div 
              className={`rounded-full bg-purple-500/80 transition-[width,background-color,box-shadow] duration-200 ${isHovered || isDragging ? 'w-2 shadow-[0_0_15px_rgba(168,85,247,0.9)] bg-purple-400' : 'w-0.5 shadow-[0_0_8px_rgba(168,85,247,0.6)]'}`}
              style={{
                height: `${thumbHeight}px`,
                transform: `translateY(${scrollProgress * maxTranslateY}px)`
              }}
              onPointerDown={handlePointerDown}
            />
          </div>

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-y-auto relative hide-native-scroll"
          >
            {/* STICKY OVERLAYS WRAPPER */}
            <div className="sticky top-0 left-0 w-full h-225 pointer-events-none z-20 -mb-225">
                              
              {/* STICKY TOP OVERLAY */}
              <div className={`absolute top-0 left-0 w-full h-48 bg-linear-to-b from-[#05060A] via-[#05060A]/95 to-transparent transition-opacity duration-300 ${isAtTop ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 flex flex-col items-center">
                  <div className="flex flex-col items-center gap-1.5 mb-3">
                    <div className="size-0.75 rounded-full bg-slate-600 opacity-30" />
                    <div className="size-1 rounded-full bg-slate-600 opacity-50" />
                    <div className="size-1.5 rounded-full bg-slate-600 opacity-80" />
                  </div>
                  <div className="mb-3 text-[11px] font-medium text-slate-300 tracking-wider whitespace-nowrap">
                    {topCardName}
                  </div>
                  <div className="size-3 rounded-full bg-[#05060A] border-2 border-slate-500 z-10 box-content mb-1" />
                  <div className="w-0.5 h-16 bg-linear-to-t from-slate-700 to-transparent" />
                </div>
              </div>

              {/* STICKY BOTTOM OVERLAY */}
              <div className={`absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-[#05060A] via-[#05060A]/95 to-transparent transition-opacity duration-300 ${isAtBottom ? 'opacity-0' : 'opacity-100'}`}>
                <div className="absolute left-6 md:left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-0.5 h-16 bg-linear-to-b from-slate-700 to-transparent" />
                  <div className="size-3 rounded-full bg-[#05060A] border-2 border-slate-500 z-10 box-content mt-1" />
                  <div className="mt-3 text-[11px] font-medium text-slate-300 tracking-wider whitespace-nowrap">
                    {bottomCardName}
                  </div>
                  <div className="flex flex-col items-center gap-1.5 mt-3">
                    <div className="size-1.5 rounded-full bg-slate-600 opacity-80" />
                    <div className="size-1 rounded-full bg-slate-600 opacity-50" />
                    <div className="size-0.75 rounded-full bg-slate-600 opacity-30" />
                  </div>
                </div>
              </div>
            </div>

            {/* ACTUAL TIMELINE CONTENT */}
            <div className="relative w-full px-4 md:px-0 pt-24 pb-32">
              
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 via-slate-800 to-slate-800 md:-translate-x-1/2 z-0" />
              
              {/* PRESENT NODE */}
              <div className="present-node relative flex items-center h-0 mb-24 md:mb-28">
                
                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 transition-all duration-500 ${isPresentActive ? 'scale-[1.15]' : 'scale-100'}`}>
                  <div className={`absolute rounded-full transition-all duration-500 ${isPresentActive ? 'size-6 bg-purple-500/20 shadow-[0_0_24px_rgba(192,132,252,0.8)] border border-purple-400/80' : 'size-3.5 bg-[#05060A] border-2 border-slate-500'}`} />
                  <div className={`absolute size-3.5 rounded-full bg-[#05060A] transition-opacity duration-500 ${isPresentActive ? 'opacity-100' : 'opacity-0'}`} />
                  <div className={`absolute rounded-full transition-all duration-500 ${isPresentActive ? 'size-2 bg-white shadow-[0_0_12px_rgba(255,255,255,1)] opacity-100' : 'size-1.5 bg-transparent opacity-0'}`} />
                </div>
                
                <div className={`hidden md:block absolute left-1/2 w-48 border-t border-dashed -translate-x-1/2 -translate-y-1/2 z-0 transition-colors duration-500 ${isPresentActive ? 'border-purple-400/80' : 'border-slate-600/30'}`} />

                <div className={`hidden md:block absolute right-1/2 mr-10 text-[11px] font-bold uppercase tracking-[0.2em] -translate-y-1/2 transition-colors duration-500 ${isPresentActive ? 'text-purple-400' : 'text-slate-500'}`}>
                  YOU ARE HERE
                </div>
                
                <div className="absolute left-6 md:left-1/2 ml-10 flex flex-col justify-center -translate-y-1/2 bg-[#05060A] px-2">
                  <div className={`md:hidden text-[10px] font-bold uppercase tracking-widest mb-1 whitespace-nowrap transition-colors duration-500 ${isPresentActive ? 'text-purple-500' : 'text-slate-500'}`}>
                    YOU ARE HERE
                  </div>
                  <div className={`text-base sm:text-lg font-semibold leading-none transition-colors duration-500 ${isPresentActive ? 'text-slate-200' : 'text-slate-400'}`}>
                    Present
                  </div>
                  {currentDate && (
                    <div className="text-xs text-slate-500 mt-1.5 whitespace-nowrap">
                      {currentDate}
                    </div>
                  )}
                </div>
              </div>

              {/* TIMELINE CARDS */}
              <div className="space-y-12 pr-4 md:pr-0">
                <AnimatePresence mode="popLayout">
                  {filteredMilestones.map((item, index) => {
                    const isRightCard = index % 2 === 0;
                    const isActive = index === activeCardIndex;

                    return (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="milestone-card relative flex items-center w-full"
                      >
                        <div className={`absolute left-6 md:left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 transition-all duration-500 ${isActive ? 'scale-[1.15]' : 'scale-100'}`}>
                          <div className={`absolute rounded-full transition-all duration-500 ${isActive ? 'size-6 bg-purple-500/20 shadow-[0_0_20px_rgba(192,132,252,0.8)] border border-purple-400/80' : 'size-3.5 bg-[#05060A] border-2 border-slate-500'}`} />
                          <div className={`absolute size-3.5 rounded-full bg-[#05060A] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                          <div className={`absolute rounded-full transition-all duration-500 ${isActive ? 'size-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-100' : 'size-1.5 bg-transparent opacity-0'}`} />
                        </div>

                        <div className={`hidden md:block absolute top-10 w-9.5 border-t border-dashed -translate-y-1/2 z-0 transition-colors duration-500 ${isActive ? 'border-purple-400/80' : 'border-slate-600/50'} ${isRightCard ? 'left-1/2 ml-1' : 'right-1/2 mr-1'}`} />

                        <div className={`md:hidden absolute top-10 left-6 w-8 border-t border-dashed -translate-y-1/2 z-0 transition-colors duration-500 ${isActive ? 'border-purple-400/80' : 'border-slate-600/50'}`} />

                        <div className={`hidden md:block absolute top-10 -translate-y-1/2 w-1/2 z-10 ${isRightCard ? 'right-1/2 pr-12 text-right' : 'left-1/2 pl-12 text-left'}`}>
                          <span className={`text-lg font-bold tracking-wider transition-colors duration-500 ${isActive ? 'text-purple-400' : 'text-purple-500/60'}`}>
                            {item.year.split(" - ")[0]}
                          </span>
                        </div>

                        <div className={`w-full pl-16 md:w-1/2 ${isRightCard ? 'md:ml-auto md:pl-10' : 'md:mr-auto md:pr-10 md:pl-0'}`}>
                          <div 
                            onClick={() => setActiveModalItem(item)}
                            className={`group relative cursor-pointer rounded-2xl border bg-[#0B1121] p-6 shadow-xl transition-all duration-300 hover:bg-[#0d1428] ${isActive ? 'border-purple-500/40 shadow-[0_0_30px_rgba(147,51,234,0.1)]' : 'border-slate-800/80 hover:border-purple-500/30'}`}
                          >
                            <div className={`absolute top-10 -translate-y-1/2 size-3.5 rotate-45 bg-[#0B1121] group-hover:bg-[#0d1428] transition-colors duration-300 hidden md:block z-10 ${isRightCard ? '-left-1.75 border-b border-l' : '-right-1.75 border-t border-r'} ${isActive ? 'border-purple-500/40' : 'border-slate-800/80 group-hover:border-purple-500/30'}`} />
                            
                            <div className={`absolute top-10 -translate-y-1/2 -left-1.75 size-3.5 rotate-45 border-b border-l bg-[#0B1121] group-hover:bg-[#0d1428] transition-colors duration-300 md:hidden z-10 ${isActive ? 'border-purple-500/40' : 'border-slate-800/80 group-hover:border-purple-500/30'}`} />

                            <div className="flex gap-4 items-start">
                              <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${isActive ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                {getIcon(item.icon)}
                              </div>

                              <div className="flex-1 space-y-1">
                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                                  {item.title}
                                </h3>
                                {item.subtitle && (
                                  <p className="text-sm font-medium text-purple-400">
                                    {item.subtitle}
                                  </p>
                                )}
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                                  <Calendar className="size-3.5" />
                                  <span>{item.year}</span>
                                </div>
                              </div>
                            </div>

                            {item.shortSummary && (
                              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                                {item.shortSummary}
                              </p>
                            )}

                            {item.highlights && item.highlights.length > 0 && (
                              <div className="mt-5 flex flex-wrap gap-2">
                                {item.highlights.slice(0, 5).map((h, i) => (
                                  <span key={i} className="rounded-md border border-slate-800/80 bg-[#121A2F]/50 px-2.5 py-1 text-xs text-slate-300 font-medium">
                                    {h}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* BIRTH NODE */}
              <div className="relative flex items-center h-0 mt-20 md:mt-28">
                
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                  <div className="absolute size-3.5 rounded-full bg-[#05060A] border-2 border-slate-500" />
                </div>
                
                <div className="hidden md:block absolute right-1/2 mr-10 text-slate-500 text-lg font-bold tracking-wider -translate-y-1/2">
                  2005
                </div>
                
                <div className="md:hidden absolute left-6 ml-10 text-slate-500 text-lg font-bold tracking-wider -translate-y-1/2">
                  2005
                </div>

                <div className="absolute left-6 md:left-1/2 top-4 -translate-x-1/2 flex flex-col items-center">
                  <div className="text-sm text-slate-400 font-medium whitespace-nowrap mt-1">
                    Birth
                  </div>
                  
                  <div className="flex flex-col items-center gap-1.5 mt-3">
                    <div className="size-1.5 rounded-full bg-slate-600 opacity-80" />
                    <div className="size-1 rounded-full bg-slate-600 opacity-50" />
                    <div className="size-0.75 rounded-full bg-slate-600 opacity-30" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700/60 bg-[#0F172A] p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-800/60 p-2 text-slate-400 hover:text-white"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-4">
                <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-mono font-semibold text-purple-400 border border-purple-500/20">
                  {activeModalItem.year}
                </span>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  {activeModalItem.title}
                </h3>

                {activeModalItem.subtitle && (
                  <p className="text-sm font-medium text-indigo-400">
                    {activeModalItem.subtitle}
                  </p>
                )}

                {activeModalItem.detailedDescription && (
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">
                    {activeModalItem.detailedDescription}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}