export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Step {
  description: string;
  imageUrl?: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  steps: Step[];
  prepTime: number;
  cookTime: number;
  servings: number;
  cuisineType: string;
  mealType: string;
  dietaryInfo: string[];
  nutritionInfo: NutritionInfo;
  userId?: string;
  createdAt: string;
}