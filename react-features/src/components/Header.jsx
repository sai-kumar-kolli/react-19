import { FiBell, FiPlus, FiSearch, FiUser, FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import viteLogo from '/vite.svg';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-50">
      <div className="max-w-full flex items-center justify-between px-4 md:px-8 py-0 h-16">
        {/* Logo & Brand */}
        <div className="flex items-center gap-4">
          <button className="md:hidden mr-2" aria-label="Open sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={28} className="text-white" />
          </button>
          <Link to="/">
            <img src={viteLogo} alt="Logo" className="h-8 w-8" />
          </Link>
          <span className="text-xl font-bold text-white tracking-tight">React Features Demo</span>
        </div>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          {/* No navigation items here, as the sidebar handles feature navigation */}
        </nav>
        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-800 rounded-md px-2 py-1 border border-gray-700">
            <FiSearch className="text-gray-400 mr-2" size={18} />
            <input type="text" placeholder="Search or jump to..." className="bg-transparent outline-none text-gray-200 placeholder-gray-400 w-32" />
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md p-2 transition"><FiBell size={20} /></button>
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1 font-semibold flex items-center gap-1"><FiPlus size={16} /> New</button>
          <div className="flex items-center gap-2">
            <img src="https://avatars.githubusercontent.com/u/1?v=4" alt="User" className="h-8 w-8 rounded-full border-2 border-gray-700" />
            <FiUser className="text-gray-400" size={18} />
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Overlay - Removed */}
    </header>
  );
}

export default Header;
