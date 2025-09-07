import Scroll from "./Scroll";
import Search from "./Search";


const DebounceThrottlle = () => {


    return (
        <div className="max-w-4xl mx-auto p-6 w-full h-[100dvh] overflow-y-auto overflow-x-hidden">
            <h1 className="text-xl font-bold mb-4 md: text-sm">Throttling & Debouncing Performance Demo</h1>

            <p>Experience the performance difference between optimized and unoptimized code. Watch the counters to see how many unnecessary operations are prevented!</p>

            <div className="space-y-6 mt-6">
                <Search />
                <Scroll/>
            </div>

        </div>
    );
}

export default DebounceThrottlle;


