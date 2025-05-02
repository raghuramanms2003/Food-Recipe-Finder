import React from 'react';
import { ChefHat, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-[#E76F51]" />
              <span className="ml-2 text-2xl font-bold">RecipeFinder</span>
            </Link>
            <p className="mt-3 text-gray-300">
              Find delicious recipes with ingredients you already have.
            </p>
            {/* <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div> */}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/create-recipe" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Create Recipe
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Cuisines</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Italian
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Mexican
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Asian
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Indian
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Mediterranean
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#E76F51] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} RecipeFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;