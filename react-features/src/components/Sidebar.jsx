import { Link, useLocation } from 'react-router-dom';
import { MdHome, MdFilterList, MdLayers, MdBolt, MdCloud, MdTimer } from 'react-icons/md';

const navItems = [
  { name: 'Home', path: '/', icon: MdHome },
  { name: 'Product Filter', path: '/product-filter', icon: MdFilterList },
  { name: 'State Demo', path: '/state-demo', icon: MdLayers },
  { name: 'Effect Demo', path: '/effect-demo', icon: MdBolt },
  { name: 'Parallel API', path: '/parllel-api', icon: MdCloud },
  { name: 'Debounce & Throttle', path: '/debounce-throttle', icon: MdTimer },
];

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden md:flex flex-col w-72 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-blue-50 border-r shadow-lg py-8 px-6 relative overflow-hidden" aria-label="Sidebar Navigation">
      <img src="/src/assets/side-decor.svg" alt="Sidebar Decorative Gradient" className="absolute left-0 top-0 h-full w-20 opacity-80 pointer-events-none select-none" style={{zIndex:0}} />
      <div className="mb-8 flex flex-col items-center relative z-10">
        <img src="/src/assets/feature-illustration.svg" alt="Feature Illustration" className="h-20 w-20 mb-2" />
        <h2 className="text-2xl font-bold text-blue-700">Feature Demos</h2>
      </div>
      <nav className="flex flex-col gap-2 relative z-10" aria-label="Main">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200 border-l-4 focus:outline-none focus:ring-2 focus:ring-blue-400 ${location.pathname === item.path ? 'bg-blue-100 text-blue-700 border-blue-600 shadow-lg' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'}`}
            tabIndex={0}
            aria-current={location.pathname === item.path ? 'page' : undefined}
            aria-label={item.name}
          >
            <item.icon size={22} className="mr-3" aria-hidden="true" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="my-8 border-t border-gray-200"></div>
      <div className="flex flex-col items-center gap-2 relative z-10">
        <img src="https://avatars.githubusercontent.com/u/1?v=4" alt="User Avatar" className="h-12 w-12 rounded-full border-2 border-blue-200 shadow" />
        <span className="text-base font-medium text-gray-600">Enterprise User</span>
        <span className="text-xs text-gray-400">user@company.com</span>
      </div>
    </aside>
  );
}

export default Sidebar;
