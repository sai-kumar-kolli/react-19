import { useRef, useState, useCallback } from "react";
import PerformanceCounter from "../components/PerformanceCounter";
import useThrottle from "../hooks/useThrottle";



const Scroll = () => {
    const [unoptimizedScrollCount, setUnoptimizedScrollCount] = useState(0);
    const [optimizedScrollCount, setOptimizedScrollCount] = useState(0);
    const [unoptimizedScrollPosition, setUnoptimizedScrollPosition] = useState(0);
    const [optimizedScrollPosition, setOptimizedScrollPosition] = useState(0);
    const [unoptimizedDomQueries, setUnoptimizedDomQueries] = useState(0);
    const [optimizedDomQueries, setOptimizedDomQueries] = useState(0);
    const [isScrollingUnoptimized, setIsScrollingUnoptimized] = useState(false);
    const [isScrollingOptimized, setIsScrollingOptimized] = useState(false);
    
    const scrollTimeoutRef = useRef(null);

    const unoptimizedScrollRef = useRef();
    const optimizedScrollRef = useRef();

    // Unoptimized scroll handler
    const handleUnoptimizedScroll = useCallback((e) => {
        setUnoptimizedScrollCount(prev => prev + 1);
        setIsScrollingUnoptimized(true);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set timeout to hide scrolling indicator
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrollingUnoptimized(false);
        }, 150);

        // Expensive DOM operations on every scroll
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const clientHeight = e.target.clientHeight;

        // Simulate expensive calculations
        setUnoptimizedDomQueries(prev => prev + 1);
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setUnoptimizedScrollPosition(Math.round(progress));

        // Simulate checking multiple elements (expensive)
        const elements = e.target.querySelectorAll('.scroll-item');
        elements.forEach(() => {
            // Simulate getBoundingClientRect() calls
            setUnoptimizedDomQueries(prev => prev + 1);
        });
    }, []);

    // Optimized scroll handler with throttling
    const optimizedScrollHandler = useCallback((e) => {
        setOptimizedScrollCount(prev => prev + 1);
        setIsScrollingOptimized(true);
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set timeout to hide scrolling indicator
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrollingOptimized(false);
        }, 200);

        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const clientHeight = e.target.clientHeight;

        setOptimizedDomQueries(prev => prev + 1);
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setOptimizedScrollPosition(Math.round(progress));

        // Same expensive operations, but throttled
        const elements = e.target.querySelectorAll('.scroll-item');
        elements.forEach(() => {
            setOptimizedDomQueries(prev => prev + 1);
        });
    }, []);
    
    const handleOptimizedScroll = useThrottle(optimizedScrollHandler, 100);

    const resetCounters = () => {
        setUnoptimizedScrollCount(0);
        setOptimizedScrollCount(0);
        setUnoptimizedScrollPosition(0);
        setOptimizedScrollPosition(0);
        setUnoptimizedDomQueries(0);
        setOptimizedDomQueries(0);
        setIsScrollingUnoptimized(false);
        setIsScrollingOptimized(false);
        
        // Reset scroll positions
        if (unoptimizedScrollRef.current) {
            unoptimizedScrollRef.current.scrollTop = 0;
        }
        if (optimizedScrollRef.current) {
            optimizedScrollRef.current.scrollTop = 0;
        }
    };

    // Generate scroll content with better visual design
    const scrollItems = Array.from({ length: 50 }, (_, i) => {
        const colors = [
            'from-blue-50 to-blue-100 border-blue-200',
            'from-green-50 to-green-100 border-green-200',
            'from-purple-50 to-purple-100 border-purple-200',
            'from-orange-50 to-orange-100 border-orange-200',
            'from-pink-50 to-pink-100 border-pink-200',
        ];
        const colorClass = colors[i % colors.length];
        
        return (
            <div key={i} className={`scroll-item p-6 border-l-4 bg-gradient-to-r ${colorClass} mb-2 rounded-r-lg hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]`}>
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                        <span className="text-2xl">{['📝', '🎯', '🚀', '💡', '🔥'][i % 5]}</span>
                        Item {i + 1}
                    </h4>
                    <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">#{i + 1}</span>
                </div>
                <p className="text-gray-600 mt-2 leading-relaxed">
                    This is scroll item {i + 1}. Scroll through this list to see the performance difference between optimized and unoptimized event handling!
                </p>
                <div className="mt-3 h-1 bg-gray-200 rounded-full">
                    <div 
                        className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300" 
                        style={{width: `${Math.min(100, (i + 1) * 2)}%`}}
                    ></div>
                </div>
            </div>
        );
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    Scroll Demo: Event Handling
                </h3>
                <button
                    onClick={resetCounters}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                    aria-label="Reset all counters and scroll positions"
                >
                    Reset All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <PerformanceCounter
                    label="Unoptimized Events"
                    count={unoptimizedScrollCount}
                    color="red"
                />
                <PerformanceCounter
                    label="Optimized Events"
                    count={optimizedScrollCount}
                    color="green"
                />
                <PerformanceCounter
                    label="Unoptimized DOM Queries"
                    count={unoptimizedDomQueries}
                    color="orange"
                />
                <PerformanceCounter
                    label="Optimized DOM Queries"
                    count={optimizedDomQueries}
                    color="blue"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border-2 border-red-100 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                isScrollingUnoptimized ? 'bg-red-500 animate-pulse scale-110' : 'bg-red-300'
                            }`}></div>
                            <h4 className="font-bold text-red-700 text-lg">Without Throttling</h4>
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">UNOPTIMIZED</span>
                        </div>
                        {isScrollingUnoptimized && (
                            <div className="flex items-center gap-2 text-red-600 text-sm animate-bounce">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span>Scrolling</span>
                            </div>
                        )}
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-red-700">Progress:</span>
                            <span className="font-mono text-red-800">{unoptimizedScrollPosition}%</span>
                        </div>
                        <div className="mt-2 h-2 bg-red-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-200" 
                                style={{width: `${unoptimizedScrollPosition}%`}}
                            ></div>
                        </div>
                    </div>
                    <div
                        ref={unoptimizedScrollRef}
                        onScroll={handleUnoptimizedScroll}
                        className="h-80 overflow-y-auto border-2 border-red-200 rounded-xl bg-gradient-to-br from-red-25 to-red-50 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        <div className="p-2">
                            {scrollItems}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border-2 border-green-100 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                isScrollingOptimized ? 'bg-green-500 animate-pulse scale-110' : 'bg-green-300'
                            }`}></div>
                            <h4 className="font-bold text-green-700 text-lg">With Throttling (100ms)</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">OPTIMIZED</span>
                        </div>
                        {isScrollingOptimized && (
                            <div className="flex items-center gap-2 text-green-600 text-sm animate-bounce">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Scrolling</span>
                            </div>
                        )}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-green-700">Progress:</span>
                            <span className="font-mono text-green-800">{optimizedScrollPosition}%</span>
                        </div>
                        <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-200" 
                                style={{width: `${optimizedScrollPosition}%`}}
                            ></div>
                        </div>
                    </div>
                    <div
                        ref={optimizedScrollRef}
                        onScroll={handleOptimizedScroll}
                        className="h-80 overflow-y-auto border-2 border-green-200 rounded-xl bg-gradient-to-br from-green-25 to-green-50 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        <div className="p-2">
                            {scrollItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Scroll;