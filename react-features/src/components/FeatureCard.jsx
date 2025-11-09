import { Link } from 'react-router-dom';

function FeatureCard({ icon: Icon, title, description, link, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 transition min-h-[300px] group">
      <div className="flex-1 flex flex-col items-center">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-200">
          <Icon className={`h-16 w-16 text-${color}`} />
        </div>
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          <h2 className={`text-xl font-bold text-${color}`}>{title}</h2>
          <p className="text-gray-600 text-sm leading-relaxed min-h-[60px] flex items-center justify-center">
            {description}
          </p>
        </div>
      </div>
      <div className="w-full pt-6 mt-auto">
        <Link 
          to={link} 
          className={`bg-${color} text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-${color}-700 transition inline-block min-w-40`}
        >
          Try {title}
        </Link>
      </div>
    </div>
  );
}

export default FeatureCard;