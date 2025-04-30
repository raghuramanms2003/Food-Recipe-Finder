import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/forms/RecipeForm';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';
import { Recipe } from '../types/Recipe';

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecipeById, updateRecipe, loading } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recipe = getRecipeById(id || '');

  useEffect(() => {
    if (!loading && recipe && user && recipe.userId !== user.id) {
      toast.error("You don't have permission to edit this recipe");
      navigate(`/recipe/${id}`);
    }
  }, [recipe, user, loading, navigate, id]);

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      await updateRecipe(id, recipeData);
      toast.success('Recipe updated successfully!');
      navigate(`/recipe/${id}`);
    } catch (error) {
      toast.error('Failed to update recipe');
      console.error('Update recipe error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <p className="text-gray-600 mb-6">The recipe you're trying to edit doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-[#E76F51] text-white rounded-md hover:bg-[#E35D3B]"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Recipe</h1>
        <p className="text-gray-600">Update your recipe details</p>
      </div>
      
      <RecipeForm 
        initialData={recipe}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditRecipe;