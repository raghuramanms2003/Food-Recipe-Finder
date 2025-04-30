import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeList from '../components/recipes/RecipeList';
import { Heart } from 'lucide-react';

const FavoriteRecipes: React.FC = () => {
  const { recipes, favorites, loading } = useRecipes();
  
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorite Recipes</h1>
        <p className="text-gray-600">Your personal collection of saved recipes</p>
      </div>
      
      {favoriteRecipes.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
          <p className="text-gray-500 text-center max-w-md mb-6">
            You haven't added any recipes to your favorites yet. Browse recipes and click the heart icon to add them here.
          </p>
          <a href="/" className="px-6 py-2 bg-[#E76F51] text-white rounded-md hover:bg-[#E35D3B]">
            Discover Recipes
          </a>
        </div>
      ) : (
        <RecipeList 
          recipes={favoriteRecipes} 
          loading={loading} 
          emptyMessage="No favorite recipes found."
        />
      )}
    </div>
  );
};

export default FavoriteRecipes;