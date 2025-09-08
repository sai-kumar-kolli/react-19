import { Link } from 'react-router-dom';
import { FiFilter, FiLayers, FiZap } from 'react-icons/fi';
import { FaStar, FaBolt, FaExchangeAlt } from 'react-icons/fa';
import { MdApi, MdSpeed, MdOutlineTune } from 'react-icons/md';
import '../App.css';

function Home() {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 mb-4 drop-shadow-lg">
            Enterprise React Demos
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Build, learn, and explore modern React features with interactive, enterprise-grade demos.
          </p>
          <Link
            to="/product-filter"
            className="inline-block bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-lg hover:from-indigo-700 hover:to-pink-600 transition"
          >
            Get Started
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/src/assets/feature-illustration.svg" alt="Hero Illustration" className="h-52 w-52 drop-shadow-xl" />
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 transition">
          <FiLayers className="h-16 w-16 mb-3 text-indigo-600" />
          <h2 className="text-xl font-bold text-indigo-700 mb-1">State Demo</h2>
          <p className="text-gray-600 mb-3">See how React state works in practice with enterprise patterns.</p>
          <Link to="/state-demo" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Try State Demo
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 transition">
          <FiZap className="h-16 w-16 mb-3 text-purple-600" />
          <h2 className="text-xl font-bold text-purple-700 mb-1">Effect Demo</h2>
          <p className="text-gray-600 mb-3">Learn about useEffect and side effects in enterprise apps.</p>
          <Link to="/effect-demo" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
            Try Effect Demo
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 transition">
          <MdOutlineTune className="h-16 w-16 mb-3 text-pink-500" />
          <h2 className="text-xl font-bold text-pink-600 mb-1">Product Filter</h2>
          <p className="text-gray-600 mb-3">Filter products by category, price, and rating with advanced UI.</p>
          <Link to="/product-filter" className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
            Try Product Filter
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 transition">
          <MdApi className="h-16 w-16 mb-3 text-yellow-500" />
          <h2 className="text-xl font-bold text-yellow-600 mb-1">Parallel API</h2>
          <p className="text-gray-600 mb-3">Star Wars API with Promise.all and React Query.</p>
          <Link to="/parllel-api" className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Try Parallel API
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 transition">
          <MdSpeed className="h-16 w-16 mb-3 text-teal-500" />
          <h2 className="text-xl font-bold text-teal-600 mb-1">Debounce & Throttle</h2>
          <p className="text-gray-600 mb-3">Learn how to implement debounce and throttle in React applications.</p>
          <Link to="/debounce-throttle" className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
            Try Debounce & Throttle
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
