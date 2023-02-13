import Food from './Classes/Food'
export function getNutrientValue(foods , nutrientName) {
    let nutrientValue = 0
    let nutrient = foods.foodNutrients.find(item => item.nutrientName == nutrientName)
    if(nutrient !== undefined){
        nutrientValue = nutrient.value
    }
    return nutrientValue    
  }

  export function getNutrientUnit(foods , nutrientName) {
    let nutrientUnit = 'G'
    let nutrient = foods.foodNutrients.find(item => item.nutrientName == nutrientName)
    if(nutrient !== undefined){
    
        nutrientUnit = nutrient.unitName
    }
    return nutrientUnit 
  }

  export function jsonToFoodObject(jFood,servings){
    console.log(servings + "servings");
    const cal = getNutrientValue(jFood, 'Energy');
    const carbs = getNutrientValue(jFood, 'Carbohydrate, by difference');
    const protein = getNutrientValue(jFood, 'Protein');
    const fat = getNutrientValue(jFood, 'Total lipid (fat)');
    const sugar = getNutrientValue(jFood, 'Sugars, total including NLEA');
    const sodium = getNutrientValue(jFood, 'Sodium, Na');
    const fibre = getNutrientValue(jFood, 'Fiber, total dietary');
    const food = new Food(jFood.description,jFood.brandName,cal,carbs,protein,fat,sugar,sodium,fibre,servings,Math.ceil(jFood.servingSize),jFood.servingSizeUnit);
    
    return food;

  }