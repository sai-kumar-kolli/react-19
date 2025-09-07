import { useRef, useState } from "react";
import PerformanceCounter from "../components/PerformanceCounter";
import useThrottle from "../hooks/useThrottle";



const Scroll = () => {
    const[unoptimizedScrollCount, setUnoptimizedScrollCount] = useState(0);
    const [optimizedScrollCount, setOptimizedScrollCount] = useState(0);
    const [unoptimizedScrollPosition, setUnoptimizedScrollPosition] = useState(0);
    const [optimizedScrollPosition, setOptimizedScrollPosition] = useState(0);
    const [unoptimizedDomQueries, setUnoptimizedDomQueries] = useState(0);
    const [optimizedDomQueries, setOptimizedDomQueries] = useState(0);

    const unoptimizedScrollRef = useRef();
    const optimizedScrollRef = useRef();

    // Unoptimized scroll handler
    const handleUnoptimizedScroll = (e) => {
        setUnoptimizedScrollCount(prev => prev + 1);

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
    };

    // Optimized scroll handler with throttling
    const handleOptimizedScroll = useThrottle((e) => {
        setOptimizedScrollCount(prev => prev + 1);

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
    }, 100);

    // Generate scroll content
    const scrollItems = Array.from({ length: 50 }, (_, i) => (
        <div key={i} className="scroll-item p-4 border-b border-gray-200">
            <h4 className="font-semibold">Item {i + 1}</h4>
            <p className="text-gray-600">
                This is scroll item {i + 1}. Scroll to see the performance difference!
            </p>
        </div>
    ));

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Scroll Demo: Event Handling</h3>

            {/* Performance Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="font-semibold text-red-700">Without Throttling</h4>
                    <div className="text-sm text-red-600">
                        Scroll Position: {unoptimizedScrollPosition}%
                    </div>
                    <div
                        ref={unoptimizedScrollRef}
                        onScroll={handleUnoptimizedScroll}
                        className="h-80 overflow-y-auto border border-red-300 rounded-lg bg-red-50"
                    >
                        {scrollItems}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-green-700">With Throttling (100ms)</h4>
                    <div className="text-sm text-green-600">
                        Scroll Position: {optimizedScrollPosition}%
                    </div>
                    <div
                        ref={optimizedScrollRef}
                        onScroll={handleOptimizedScroll}
                        className="h-80 overflow-y-auto border border-green-300 rounded-lg bg-green-50"
                    >
                        {scrollItems}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Scroll;