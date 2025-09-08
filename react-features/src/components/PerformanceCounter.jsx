function PerformanceCounter({ label, count, color = "blue" }) {
    const colorClasses = {
        red: {
            bg: "bg-red-50",
            border: "border-red-200",
            textLight: "text-red-700",
            textDark: "text-red-900",
            accent: "bg-red-100"
        },
        green: {
            bg: "bg-green-50",
            border: "border-green-200",
            textLight: "text-green-700",
            textDark: "text-green-900",
            accent: "bg-green-100"
        },
        blue: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            textLight: "text-blue-700",
            textDark: "text-blue-900",
            accent: "bg-blue-100"
        },
        orange: {
            bg: "bg-orange-50",
            border: "border-orange-200",
            textLight: "text-orange-700",
            textDark: "text-orange-900",
            accent: "bg-orange-100"
        }
    };

    const currentColor = colorClasses[color] || colorClasses.blue;

    return (
        <div className={`relative overflow-hidden p-4 rounded-xl ${currentColor.bg} ${currentColor.border} border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 transform`}>
            <div className={`absolute top-0 right-0 w-16 h-16 ${currentColor.accent} rounded-full -mr-8 -mt-8 opacity-30`}></div>
            <div className="relative z-10">
                <div className={`text-xs font-semibold uppercase tracking-wide ${currentColor.textLight} mb-1`}>
                    {label}
                </div>
                <div className={`text-3xl font-bold ${currentColor.textDark} tabular-nums`}>
                    {count.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default PerformanceCounter;