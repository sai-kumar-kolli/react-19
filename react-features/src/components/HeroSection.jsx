import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="max-w-4xl w-full mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-700 via-purple-600 to-pink-500 mb-4 drop-shadow-lg">
          Enterprise React Demos
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Build, learn, and explore modern React features with interactive, enterprise-grade demos.
        </p>
        <Link
          to="/product-filter"
          className="inline-block bg-linear-to-r from-indigo-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg text-lg hover:from-indigo-700 hover:to-pink-600 transition"
        >
          Get Started
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <img src="/src/assets/feature-illustration.svg" alt="Hero Illustration" className="h-52 w-52 drop-shadow-xl" />
      </div>
    </div>
  );
}

export default HeroSection;