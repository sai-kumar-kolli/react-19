function PerformanceCounter({ label, count, color = "blue" }) {
    return (
        <div className={`p-3 rounded-lg bg-${color}-50 border border-${color}-200`}>
            <div className={`text-sm font-medium text-${color}-800`}>{label}</div>
            <div className={`text-2xl font-bold text-${color}-900`}>{count}</div>
        </div>
    );
}

export default PerformanceCounter;