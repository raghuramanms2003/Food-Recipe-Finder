import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Clock, Edit, Trash2, AlertCircle, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import NutritionLabel from '../components/recipes/NutritionLabel';
import toast from 'react-hot-toast';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, isFavorite, addToFavorites, removeFromFavorite, deleteRecipe, loading } = useRecipes();
  const { user } = useAuth();
  const recipe = getRecipeById(id || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState(true);
  const [expandedIngredients, setExpandedIngredients] = useState(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E76F51]"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-16 w-16 text-[#E76F51] mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Not Found</h2>
        <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-6 py-2 bg-[#E76F51] text-white rounded-md hover:bg-[#E35D3B]">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    if (isFavorite(recipe.id)) {
      removeFromFavorite(recipe.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(recipe.id);
      toast.success('Added to favorites');
    }
  };

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true);
      await deleteRecipe(recipe.id);
      toast.success('Recipe deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete recipe');
      console.error('Error deleting recipe:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const isOwner = user && recipe.userId === user.id;
  const favorite = isFavorite(recipe.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="relative rounded-xl overflow-hidden mb-6">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-80 object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-[#2A9D8F] text-white text-sm font-medium rounded-full">
                {recipe.cuisineType}
              </span>
              <span className="px-3 py-1 bg-[#E76F51] text-white text-sm font-medium rounded-full">
                {recipe.mealType}
              </span>
              {recipe.dietaryInfo.slice(0, 2).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-700 text-white text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white">{recipe.title}</h1>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-1 text-[#E76F51]" />
              <span>{recipe.prepTime + recipe.cookTime} mins</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-1 text-[#2A9D8F]" />
              <span>Serves {recipe.servings}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleToggleFavorite}
              className={`flex items-center px-4 py-2 rounded-md ${
                favorite 
                  ? 'bg-[#E76F51] text-white' 
                  : 'bg-white border border-[#E76F51] text-[#E76F51]'
              }`}
            >
              <Heart className={`h-5 w-5 mr-2 ${favorite ? 'fill-white' : 'fill-none'}`} />
              <span>{favorite ? 'Favorited' : 'Add to Favorites'}</span>
            </button>
            
            {isOwner && (
              <>
                <Link
                  to={`/edit-recipe/${recipe.id}`}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  <span>Edit</span>
                </Link>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center px-4 py-2 bg-white border border-red-500 text-red-500 rounded-md"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 mb-8">{recipe.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div 
                className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedIngredients(!expandedIngredients)}
              >
                <h2 className="text-xl font-bold">Ingredients</h2>
                {expandedIngredients ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedIngredients && (
                <div className="p-4">
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-5 w-5 bg-[#E76F51] rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                          ✓
                        </span>
                        <span>
                          <span className="font-medium">{ingredient.name}</span>
                          {ingredient.amount && ingredient.unit && (
                            <span className="text-gray-600">
                              {' '}
                              - {ingredient.amount} {ingredient.unit}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
              <div 
                className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedSteps(!expandedSteps)}
              >
                <h2 className="text-xl font-bold">Cooking Instructions</h2>
                {expandedSteps ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSteps && (
                <div className="p-4">
                  <ol className="space-y-6">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <div className="h-8 w-8 bg-[#2A9D8F] rounded-full flex items-center justify-center text-white font-semibold">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <p className="mb-3">{step.description}</p>
                          {step.imageUrl && (
                            <img 
                              src={step.imageUrl} 
                              alt={`Step ${index + 1}`}
                              className="rounded-md max-h-48 object-cover"
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <NutritionLabel nutritionInfo={recipe.nutritionInfo} />
            
            {recipe.dietaryInfo.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 mt-6">
                <h3 className="font-semibold mb-2">Dietary Information</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.dietaryInfo.map((item, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Recipe</h3>
            <p className="mb-6">
              Are you sure you want to delete this recipe? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <span className="mr-2">Deleting</span>
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                  </span>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;