import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 max-w-md w-full mx-4">
        <div className="animate-bounce mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600"></h1>
            404
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have vanished into thin air.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Return Home
          </Link>
          <div className="text-sm text-gray-500 mt-4">
            <p>Lost? Try checking the URL or navigating from the home page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
