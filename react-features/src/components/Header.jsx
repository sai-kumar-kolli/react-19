import { FiBell, FiPlus, FiSearch, FiUser, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

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
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-white tracking-tight">GitHub Enterprise</span>
        </div>
        {/* Navigation */}
        <nav className="hidden md:flex gap-6">
          <a href="#pulls" className="text-gray-200 hover:text-white font-medium">Pull requests</a>
          <a href="#issues" className="text-gray-200 hover:text-white font-medium">Issues</a>
          <a href="#marketplace" className="text-gray-200 hover:text-white font-medium">Marketplace</a>
          <a href="#explore" className="text-gray-200 hover:text-white font-medium">Explore</a>
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
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-6">
            <nav className="flex flex-col gap-4 mt-8">
              <a href="/" className="text-lg font-semibold text-blue-700 hover:text-blue-900">Home</a>
              <a href="/product-filter" className="text-lg font-semibold text-blue-700 hover:text-blue-900">Product Filter</a>
              <a href="/state-demo" className="text-lg font-semibold text-blue-700 hover:text-blue-900">State Demo</a>
              <a href="/effect-demo" className="text-lg font-semibold text-blue-700 hover:text-blue-900">Effect Demo</a>
            </nav>
            <div className="mt-10 flex flex-col items-center gap-2">
              <img src="https://avatars.githubusercontent.com/u/1?v=4" alt="User" className="h-12 w-12 rounded-full border-2 border-blue-200 shadow" />
              <span className="text-base font-medium text-gray-600">Enterprise User</span>
              <span className="text-xs text-gray-400">user@company.com</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
