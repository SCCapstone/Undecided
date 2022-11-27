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