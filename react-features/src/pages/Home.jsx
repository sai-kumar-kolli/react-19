import { Link } from 'react-router-dom';
import { FiFilter, FiLayers, FiZap } from 'react-icons/fi';
import '../App.css';

function Home() {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-4 drop-shadow-lg">Enterprise React Demos</h1>
          <p className="text-xl text-gray-700 mb-6">Build, learn, and explore modern React features with interactive, enterprise-grade demos.</p>
          <Link to="/product-filter" className="inline-block bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-lg hover:bg-blue-800 transition">Get Started</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/src/assets/feature-illustration.svg" alt="Hero Illustration" className="h-48 w-48" />
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img src="/src/assets/feature-illustration.svg" alt="State Demo Illustration" className="h-16 w-16 mb-3" />
          <h2 className="text-xl font-bold text-blue-700 mb-1">State Demo</h2>
          <p className="text-gray-600 mb-3">See how React state works in practice with enterprise patterns.</p>
          <Link to="/state-demo" className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">Try State Demo</Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img src="/src/assets/feature-illustration.svg" alt="Effect Demo Illustration" className="h-16 w-16 mb-3" />
          <h2 className="text-xl font-bold text-purple-700 mb-1">Effect Demo</h2>
          <p className="text-gray-600 mb-3">Learn about useEffect and side effects in enterprise apps.</p>
          <Link to="/effect-demo" className="bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-800 transition">Try Effect Demo</Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img src="/src/assets/feature-illustration.svg" alt="Product Filter Illustration" className="h-16 w-16 mb-3" />
          <h2 className="text-xl font-bold text-pink-700 mb-1">Product Filter</h2>
          <p className="text-gray-600 mb-3">Filter products by category, price, and rating with advanced UI.</p>
          <Link to="/product-filter" className="bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-800 transition">Try Product Filter</Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img src="/src/assets/feature-illustration.svg" alt="Product Filter Illustration" className="h-16 w-16 mb-3" />
          <h2 className="text-xl font-bold text-pink-700 mb-1">Parllel API</h2>
          <p className="text-gray-600 mb-3">Star wars api with promise.all further with react query</p>
          <Link to="/parllel-api" className="bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-800 transition">Try Product Filter</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
