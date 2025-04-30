import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/forms/RecipeForm';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Recipe } from '../types/Recipe';

const CreateRecipe: React.FC = () => {
  const { addRecipe } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    try {
      setIsSubmitting(true);
      
      // Add the user ID to the recipe data
      const recipeWithUser = {
        ...recipeData,
        userId: user?.id
      };
      
      const newRecipe = await addRecipe(recipeWithUser);
      toast.success('Recipe created successfully!');
      navigate(`/recipe/${newRecipe.id}`);
    } catch (error) {
      toast.error('Failed to create recipe');
      console.error('Create recipe error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Recipe</h1>
        <p className="text-gray-600">Share your culinary creations with the community</p>
      </div>
      
      <RecipeForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateRecipe;