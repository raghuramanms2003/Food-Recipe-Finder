import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Check } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategoryProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ 
  title, 
  options, 
  selected, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <div 
                className={`w-5 h-5 flex items-center justify-center border rounded mr-3 ${
                  selected.includes(option.id) 
                    ? 'bg-[#E76F51] border-[#E76F51]' 
                    : 'border-gray-300'
                }`}
              >
                {selected.includes(option.id) && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </div>
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

interface FilterOptionsProps {
  onFilterChange: (filters: {
    cuisineType: string[];
    mealType: string[];
    dietType: string[];
  }) => void;
  initialFilters?: {
    cuisineType: string[];
    mealType: string[];
    dietType: string[];
  };
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ 
  onFilterChange,
  initialFilters = { cuisineType: [], mealType: [], dietType: [] }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cuisineType, setCuisineType] = useState(initialFilters.cuisineType);
  const [mealType, setMealType] = useState(initialFilters.mealType);
  const [dietType, setDietType] = useState(initialFilters.dietType);

  const cuisines: FilterOption[] = [
    { id: 'italian', label: 'Italian' },
    { id: 'mexican', label: 'Mexican' },
    { id: 'indian', label: 'Indian' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'thai', label: 'Thai' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'american', label: 'American' },
    { id: 'french', label: 'French' },
  ];

  const mealTypes: FilterOption[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' },
    { id: 'dessert', label: 'Dessert' },
  ];

  const dietTypes: FilterOption[] = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'low-carb', label: 'Low Carb' },
  ];

  const applyFilters = () => {
    onFilterChange({
      cuisineType,
      mealType,
      dietType,
    });
    setIsOpen(false);
  };

  const clearFilters = () => {
    setCuisineType([]);
    setMealType([]);
    setDietType([]);
    onFilterChange({
      cuisineType: [],
      mealType: [],
      dietType: [],
    });
  };

  const totalFiltersApplied = cuisineType.length + mealType.length + dietType.length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-4 py-2 border ${
          totalFiltersApplied > 0 
            ? 'border-[#E76F51] text-[#E76F51]' 
            : 'border-gray-300 text-gray-700'
        } rounded-lg`}
      >
        <Filter className="h-5 w-5 mr-2" />
        <span>Filters</span>
        {totalFiltersApplied > 0 && (
          <span className="ml-2 bg-[#E76F51] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalFiltersApplied}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-[#E76F51] hover:underline"
              >
                Clear all
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              <FilterCategory 
                title="Cuisine Type" 
                options={cuisines} 
                selected={cuisineType}
                onChange={setCuisineType}
              />
              
              <FilterCategory 
                title="Meal Type" 
                options={mealTypes} 
                selected={mealType}
                onChange={setMealType}
              />
              
              <FilterCategory 
                title="Dietary Preferences" 
                options={dietTypes} 
                selected={dietType}
                onChange={setDietType}
              />
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-2 bg-[#E76F51] text-white rounded-lg hover:bg-[#E35D3B]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;