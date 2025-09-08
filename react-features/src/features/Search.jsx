import { useCallback, useState, useRef, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import PerformanceCounter from "../components/PerformanceCounter";

const Search = () => {
    const [unoptimizedQuery, setUnoptimizedQuery] = useState('');
    const [optimizedQuery, setOptimizedQuery] = useState('');
    const [unoptimizedResults, setUnoptimizedResults] = useState([]);
    const [optimizedResults, setOptimizedResults] = useState([]);
    const [unoptimizedApiCalls, setUnoptimizedApiCalls] = useState(0);
    const [optimizedApiCalls, setOptimizedApiCalls] = useState(0);
    const [unoptimizedRenders, setUnoptimizedRenders] = useState(0);
    const [optimizedRenders, setOptimizedRenders] = useState(0);
    const [unoptimizedLoading, setUnoptimizedLoading] = useState(false);
    const [optimizedLoading, setOptimizedLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const abortControllerRef = useRef(null);


    // Mock API call with abort signal support
    const mockApiCall = async (query, signal) => {
        if (!query || query.trim().length === 0) {
            return [];
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`, {
                signal
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.map(item => ({
                id: item.id,
                title: item.title
            }));
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted');
                return null;
            }
            console.error("Error in mockApiCall:", error);
            throw error;
        }
    };

    const handleOptimizedSearch = useCallback(async (query) => {
        setOptimizedRenders(prev => prev + 1);
        setError(null);
        
        if (query.trim().length === 0) {
            setOptimizedResults([]);
            setOptimizedLoading(false);
            return;
        }
        
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        abortControllerRef.current = new AbortController();
        setOptimizedLoading(true);
        setOptimizedApiCalls(prev => prev + 1);
        
        try {
            const results = await mockApiCall(query, abortControllerRef.current.signal);
            if (results !== null) {
                setOptimizedResults(results);
            }
        } catch {
            setError('Failed to fetch results. Please try again.');
            setOptimizedResults([]);
        } finally {
            setOptimizedLoading(false);
        }
    }, []);
    const debouncedSearch = useDebounce(handleOptimizedSearch, 300);


    const handleUnoptimizedSearch = async (query) => {
        setUnoptimizedRenders(prev => prev + 1);
        setError(null);
        
        if (query.trim().length === 0) {
            setUnoptimizedResults([]);
            setUnoptimizedLoading(false);
            return;
        }
        
        setUnoptimizedLoading(true);
        setUnoptimizedApiCalls(prev => prev + 1);
        
        try {
            const results = await mockApiCall(query);
            if (results !== null) {
                setUnoptimizedResults(results);
            }
        } catch {
            setError('Failed to fetch results. Please try again.');
            setUnoptimizedResults([]);
        } finally {
            setUnoptimizedLoading(false);
        }
    };


    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const resetCounters = () => {
        setUnoptimizedApiCalls(0);
        setOptimizedApiCalls(0);
        setUnoptimizedRenders(0);
        setOptimizedRenders(0);
        setUnoptimizedQuery('');
        setOptimizedQuery('');
        setUnoptimizedResults([]);
        setOptimizedResults([]);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-3xl">🔍</span>
                    Search Demo: API Calls
                </h3>
                <button
                    onClick={resetCounters}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                    aria-label="Reset all counters"
                >
                    Reset Counters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <PerformanceCounter
                    label="Unoptimized API Calls"
                    count={unoptimizedApiCalls}
                    color="red"
                />
                <PerformanceCounter
                    label="Optimized API Calls"
                    count={optimizedApiCalls}
                    color="green"
                />
                <PerformanceCounter
                    label="Unoptimized Renders"
                    count={unoptimizedRenders}
                    color="orange"
                />
                <PerformanceCounter
                    label="Optimized Renders"
                    count={optimizedRenders}
                    color="blue"
                />
            </div>
            
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3" role="alert">
                    <span className="text-red-500 text-xl">⚠️</span>
                    <span className="text-red-700 font-medium">{error}</span>
                </div>
            )}
            
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border-2 border-red-100 p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h4 className="font-bold text-red-700 text-lg">Without Debouncing</h4>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">UNOPTIMIZED</span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={unoptimizedQuery}
                            onChange={(e) => {
                                const value = e.target.value;
                                setUnoptimizedQuery(value);
                                handleUnoptimizedSearch(value);
                            }}
                            placeholder="Type to search (calls API on every keystroke)"
                            className="w-full p-4 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 pr-12"
                            aria-label="Unoptimized search input"
                        />
                        {unoptimizedLoading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}
                    </div>
                    <div className="min-h-[150px] p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-red-700">
                                Results ({unoptimizedResults.length})
                            </div>
                            {unoptimizedLoading && (
                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                    <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
                                    Loading...
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {unoptimizedResults.length === 0 && !unoptimizedLoading ? (
                                <div className="text-gray-500 text-sm italic text-center py-4">
                                    {unoptimizedQuery ? 'No results found' : 'Start typing to search...'}
                                </div>
                            ) : (
                                unoptimizedResults.map((result) => (
                                    <div key={result.id} className="text-sm text-gray-700 p-2 bg-white rounded border border-red-100 hover:shadow-sm transition-shadow">
                                        {result.title}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border-2 border-green-100 p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h4 className="font-bold text-green-700 text-lg">With Debouncing (300ms)</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">OPTIMIZED</span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={optimizedQuery}
                            onChange={(e) => {
                                const value = e.target.value;
                                setOptimizedQuery(value);
                                debouncedSearch(value);
                            }}
                            placeholder="Type to search (calls API after 300ms of inactivity)"
                            className="w-full p-4 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 pr-12"
                            aria-label="Optimized search input with debouncing"
                        />
                        {optimizedLoading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}
                    </div>
                    <div className="min-h-[150px] p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-green-700">
                                Results ({optimizedResults.length})
                            </div>
                            {optimizedLoading && (
                                <div className="flex items-center gap-2 text-green-600 text-sm">
                                    <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
                                    Loading...
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {optimizedResults.length === 0 && !optimizedLoading ? (
                                <div className="text-gray-500 text-sm italic text-center py-4">
                                    {optimizedQuery ? 'No results found' : 'Start typing to search...'}
                                </div>
                            ) : (
                                optimizedResults.map((result) => (
                                    <div key={result.id} className="text-sm text-gray-700 p-2 bg-white rounded border border-green-100 hover:shadow-sm transition-shadow">
                                        {result.title}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Search;