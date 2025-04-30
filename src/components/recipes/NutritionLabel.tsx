import React from 'react';

interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface NutritionLabelProps {
  nutritionInfo: NutritionInfo;
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ nutritionInfo }) => {
  if (!nutritionInfo.calories && !nutritionInfo.protein && !nutritionInfo.carbs && !nutritionInfo.fat) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-xs">
      <h3 className="text-xl font-bold text-center border-b-2 border-black pb-1 mb-2">
        Nutrition Facts
      </h3>
      
      <div className="text-sm">
        <div className="py-1 border-b border-gray-300">
          <div className="flex justify-between font-bold">
            <span>Calories</span>
            <span>{nutritionInfo.calories || '0'} kcal</span>
          </div>
        </div>
        
        <div className="mt-3 border-t border-black">
          <div className="text-right text-xs py-1">% Daily Value*</div>
          
          <div className="py-1 border-t border-gray-300 flex justify-between">
            <span>
              <span className="font-bold">Total Fat</span> {nutritionInfo.fat || '0g'}
            </span>
            <span className="font-bold">
              {nutritionInfo.fat 
                ? `${Math.round(parseInt(nutritionInfo.fat) / 65 * 100)}%` 
                : '0%'}
            </span>
          </div>
          
          <div className="py-1 border-t border-gray-300 flex justify-between">
            <span>
              <span className="font-bold">Total Carbohydrates</span> {nutritionInfo.carbs || '0g'}
            </span>
            <span className="font-bold">
              {nutritionInfo.carbs
                ? `${Math.round(parseInt(nutritionInfo.carbs) / 300 * 100)}%`
                : '0%'}
            </span>
          </div>
          
          <div className="py-1 border-t border-gray-300 flex justify-between">
            <span>
              <span className="font-bold">Protein</span> {nutritionInfo.protein || '0g'}
            </span>
            <span className="font-bold">
              {nutritionInfo.protein
                ? `${Math.round(parseInt(nutritionInfo.protein) / 50 * 100)}%`
                : '0%'}
            </span>
          </div>
        </div>
        
        <div className="mt-3 text-xs">
          * Percent Daily Values are based on a 2,000 calorie diet.
        </div>
      </div>
    </div>
  );
};

export default NutritionLabel;