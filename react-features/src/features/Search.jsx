import { useCallback, useState } from "react";
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


    // Mock API call
    const mockApiCall = async (query) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.map(item => item.title);

        } catch (error) {
            console.error("Error in mockApiCall:", error);
        }
    }

    const handleOptimizedSearch = useCallback(async (query) => {
        setOptimizedRenders(prev => prev + 1);
        if (query.length > 0) {
            setOptimizedApiCalls(prev => prev + 1);
            const results = await mockApiCall(query);
            setOptimizedResults(results);
        } else {
            setOptimizedResults([]);
        }
    }, []);
    const debouncedSearch = useDebounce(handleOptimizedSearch, 300);


    const handleUnoptimizedSearch = async (query) => {
        setUnoptimizedRenders(prev => prev + 1);
        if (query.length > 0) {
            setUnoptimizedApiCalls(prev => prev + 1);
            const results = await mockApiCall(query);
            setUnoptimizedResults(results);
        } else {
            setUnoptimizedResults([]);
        }
    };


    return (
        <div className="space-y-6 mt-6">
            <h3 className="text-xl font-bold text-gray-800">Search Demo: API Calls</h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
            <div className="grid md:grid-cols-1 gap-6">
                <div className="space-y-4">
                    <h4 className="font-semibold text-red-700">Without Debouncing</h4>
                    <input
                        type="text"
                        value={unoptimizedQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setUnoptimizedQuery(value);
                            handleUnoptimizedSearch(value);
                        }}
                        placeholder="Type to search (calls API on every keystroke)"
                        className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <div className="min-h-[100px] p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-sm text-red-600 mb-2">
                            Results ({unoptimizedResults.length}):
                        </div>
                        {unoptimizedResults.map((result, index) => (
                            <div key={index} className="text-sm text-gray-700 py-1">
                                {result}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold text-green-700">With Debouncing(300ms)</h4>
                    <input
                        type="text"
                        value={optimizedQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setOptimizedQuery(value);
                            debouncedSearch(value);
                        }}
                        placeholder="Type to search (calls API after 500ms of inactivity)"
                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="min-h-[100px] p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-600 mb-2">
                            Results ({optimizedResults.length}):
                        </div>
                        {optimizedResults.map((result, index) => (
                            <div key={index} className="text-sm text-gray-700 py-1">
                                {result}
                            </div>
                        ))}
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Search;