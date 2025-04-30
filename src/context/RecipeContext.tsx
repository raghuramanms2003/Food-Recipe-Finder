import React, { createContext, useState, useContext, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import { mockRecipes } from '../data/mockRecipes';

interface RecipeContextType {
  recipes: Recipe[];
  favorites: string[];
  loading: boolean;
  getRecipeById: (id: string) => Recipe | undefined;
  searchRecipes: (query: string, filters?: RecipeFilters) => Recipe[];
  addToFavorites: (recipeId: string) => void;
  removeFromFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<Recipe>;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<Recipe>;
  deleteRecipe: (id: string) => Promise<void>;
}

interface RecipeFilters {
  cuisineType?: string[];
  mealType?: string[];
  dietType?: string[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : mockRecipes;
  });
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const searchRecipes = (query: string, filters?: RecipeFilters) => {
    let results = recipes;
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.ingredients.some(ing => 
          ing.name.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
    
    if (filters) {
      if (filters.cuisineType && filters.cuisineType.length > 0) {
        results = results.filter(recipe => 
          filters.cuisineType?.includes(recipe.cuisineType)
        );
      }
      
      if (filters.mealType && filters.mealType.length > 0) {
        results = results.filter(recipe => 
          filters.mealType?.includes(recipe.mealType)
        );
      }
      
      if (filters.dietType && filters.dietType.length > 0) {
        results = results.filter(recipe => 
          recipe.dietaryInfo.some(info => 
            filters.dietType?.includes(info)
          )
        );
      }
    }
    
    return results;
  };

  const addToFavorites = (recipeId: string) => {
    setFavorites(prev => {
      if (prev.includes(recipeId)) return prev;
      return [...prev, recipeId];
    });
  };

  const removeFromFavorite = (recipeId: string) => {
    setFavorites(prev => prev.filter(id => id !== recipeId));
  };

  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId);
  };

  const addRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
    try {
      setLoading(true);
      const newRecipe: Recipe = {
        ...recipe,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      setRecipes(prev => [newRecipe, ...prev]);
      return newRecipe;
    } catch (error) {
      console.error('Add recipe error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id: string, recipeUpdate: Partial<Recipe>): Promise<Recipe> => {
    try {
      setLoading(true);
      const updatedRecipes = recipes.map(recipe => 
        recipe.id === id ? { ...recipe, ...recipeUpdate } : recipe
      );
      
      setRecipes(updatedRecipes);
      const updatedRecipe = updatedRecipes.find(r => r.id === id);
      
      if (!updatedRecipe) {
        throw new Error('Recipe not found');
      }
      
      return updatedRecipe;
    } catch (error) {
      console.error('Update recipe error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      
      if (favorites.includes(id)) {
        removeFromFavorite(id);
      }
    } catch (error) {
      console.error('Delete recipe error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecipeContext.Provider 
      value={{ 
        recipes,
        favorites,
        loading,
        getRecipeById,
        searchRecipes,
        addToFavorites,
        removeFromFavorite,
        isFavorite,
        addRecipe,
        updateRecipe,
        deleteRecipe
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};