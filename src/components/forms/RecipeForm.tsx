import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image } from 'lucide-react';
import { Recipe, Ingredient, Step } from '../../types/Recipe';

interface RecipeFormProps {
  initialData?: Partial<Recipe>;
  onSubmit: (data: Omit<Recipe, 'id' | 'createdAt'>) => void;
  isSubmitting?: boolean;
}

const cuisineOptions = [
  'Italian', 'Mexican', 'Indian', 'Chinese', 'Thai', 
  'Mediterranean', 'American', 'French', 'Japanese', 'Other'
];

const mealTypeOptions = [
  'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'
];

const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
  'Keto', 'Paleo', 'Low-Carb', 'High-Protein'
];

const RecipeForm: React.FC<RecipeFormProps> = ({ 
  initialData = {}, 
  onSubmit,
  isSubmitting = false
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [imageUrl, setImageUrl] = useState(initialData.image || '');
  const [servings, setServings] = useState(initialData.servings || 4);
  const [cookTime, setCookTime] = useState(initialData.cookTime || 30);
  const [prepTime, setPrepTime] = useState(initialData.prepTime || 15);
  const [cuisineType, setCuisineType] = useState(initialData.cuisineType || 'Italian');
  const [mealType, setMealType] = useState(initialData.mealType || 'Dinner');
  const [dietaryInfo, setDietaryInfo] = useState<string[]>(initialData.dietaryInfo || []);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData.ingredients || [{ name: '', amount: '', unit: '' }]
  );
  const [steps, setSteps] = useState<Step[]>(
    initialData.steps || [{ description: '', imageUrl: '' }]
  );
  const [nutrition, setNutrition] = useState({
    calories: initialData.nutritionInfo?.calories || '',
    protein: initialData.nutritionInfo?.protein || '',
    carbs: initialData.nutritionInfo?.carbs || '',
    fat: initialData.nutritionInfo?.fat || '',
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (ingredients.length === 0) newErrors.ingredients = 'At least one ingredient is required';
    if (ingredients.some(i => !i.name.trim())) newErrors.ingredientName = 'All ingredients must have a name';
    if (steps.length === 0) newErrors.steps = 'At least one step is required';
    if (steps.some(s => !s.description.trim())) newErrors.stepDescription = 'All steps must have a description';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      title,
      description,
      image: imageUrl,
      servings,
      cookTime,
      prepTime,
      cuisineType,
      mealType,
      dietaryInfo,
      ingredients,
      steps,
      nutritionInfo: {
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
      },
    });
  };

  const handleDietaryChange = (option: string) => {
    setDietaryInfo(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, { description: '', imageUrl: '' }]);
  };

  const updateStep = (index: number, field: keyof Step, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };
    setSteps(updatedSteps);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Recipe Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter recipe title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Image URL*</label>
            <div className="flex">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`w-full px-3 py-2 border rounded-l-md ${
                  errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter image URL"
              />
              <span className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md">
                <Image className="h-5 w-5 text-gray-500" />
              </span>
            </div>
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Briefly describe your recipe"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Servings</label>
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Prep Time (mins)</label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Cook Time (mins)</label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Cuisine Type</label>
            <select
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {mealTypeOptions.map((meal) => (
                <option key={meal} value={meal}>
                  {meal}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Dietary Information</label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryInfo.includes(option)}
                    onChange={() => handleDietaryChange(option)}
                    className="mr-1 h-4 w-4 rounded border-gray-300 text-[#E76F51] focus:ring-[#E76F51]"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center space-x-2 mb-3">
            <div className="flex-1">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.ingredientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingredient name"
              />
            </div>
            <div className="w-20">
              <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Amt"
              />
            </div>
            <div className="w-24">
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Unit"
              />
            </div>
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="p-2 text-red-500 hover:text-red-700"
              aria-label="Remove ingredient"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        
        {errors.ingredients && <p className="text-red-500 text-sm mb-2">{errors.ingredients}</p>}
        
        <button
          type="button"
          onClick={addIngredient}
          className="flex items-center mt-2 text-[#2A9D8F] hover:text-[#22877B]"
        >
          <Plus className="h-5 w-5 mr-1" />
          <span>Add Ingredient</span>
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cooking Steps</h2>
        
        {steps.map((step, index) => (
          <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Step {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="p-1 text-red-500 hover:text-red-700"
                aria-label={`Remove step ${index + 1}`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={step.description}
              onChange={(e) => updateStep(index, 'description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md mb-2 ${
                errors.stepDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={2}
              placeholder={`Describe step ${index + 1}`}
            ></textarea>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Step Image URL (optional)
              </label>
              <input
                type="text"
                value={step.imageUrl}
                onChange={(e) => updateStep(index, 'imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter image URL for this step (optional)"
              />
            </div>
          </div>
        ))}
        
        {errors.steps && <p className="text-red-500 text-sm mb-2">{errors.steps}</p>}
        
        <button
          type="button"
          onClick={addStep}
          className="flex items-center mt-2 text-[#2A9D8F] hover:text-[#22877B]"
        >
          <Plus className="h-5 w-5 mr-1" />
          <span>Add Step</span>
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Nutrition Information (optional)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Calories</label>
            <input
              type="text"
              value={nutrition.calories}
              onChange={(e) => setNutrition({...nutrition, calories: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="kcal"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Protein</label>
            <input
              type="text"
              value={nutrition.protein}
              onChange={(e) => setNutrition({...nutrition, protein: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="g"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Carbohydrates</label>
            <input
              type="text"
              value={nutrition.carbs}
              onChange={(e) => setNutrition({...nutrition, carbs: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="g"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Fat</label>
            <input
              type="text"
              value={nutrition.fat}
              onChange={(e) => setNutrition({...nutrition, fat: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="g"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-[#E76F51] text-white rounded-md hover:bg-[#E35D3B] focus:outline-none focus:ring-2 focus:ring-[#E76F51] focus:ring-opacity-50 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="mr-2">Saving</span>
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
            </span>
          ) : (
            'Save Recipe'
          )}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;