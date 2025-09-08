import Scroll from "./Scroll";
import Search from "./Search";


const DebounceThrottle = () => {


    return (
        <div className="max-w-4xl mx-auto p-6 w-full h-[100dvh] overflow-y-auto overflow-x-hidden">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Throttling & Debouncing Performance Demo</h1>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-8">
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                    Experience the performance difference between optimized and unoptimized code. 
                    <span className="font-semibold text-blue-700"> Watch the counters</span> to see how many unnecessary operations are prevented!
                </p>
            </div>

            <div className="space-y-6 mt-6">
                <Search />
                <Scroll />
            </div>

        </div>
    );
}

export default DebounceThrottle;


