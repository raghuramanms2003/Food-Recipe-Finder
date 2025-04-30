import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ChefHat className="h-24 w-24 text-[#E76F51] mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-lg">
        The page you're looking for doesn't exist or has been moved. Let's find you a tasty recipe instead!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#E76F51] text-white font-medium rounded-lg hover:bg-[#E35D3B] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;