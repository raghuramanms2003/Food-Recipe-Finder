import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
  loading?: boolean;
  emptyMessage?: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  loading = false,
  emptyMessage = 'No recipes found. Try changing your search criteria.'
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-3"></div>
              <div className="h-4 bg-gray-200 animate-pulse mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 animate-pulse mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <img 
          src="https://images.pexels.com/photos/5388686/pexels-photo-5388686.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="No recipes found" 
          className="w-52 h-52 object-cover rounded-full mb-6 opacity-60"
        />
        <p className="text-gray-600 text-lg text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;