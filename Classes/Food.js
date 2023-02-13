

export default class Food {
    name;
    brandName;
    usdaID;
    calories
    carbs;
    protein;
    fat;
    servings;
    servingSize;
    servingSizeUnit;

    constructor(name, brandName, calories, carbs, protein, fat, servings, servingSize, servingSizeUnit ){
        this.name = name;
        this.brandName = brandName;
        this.calories = calories;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.servings = servings;
        this.servingSize = servingSize;
        this.servingSizeUnit = servingSizeUnit;
        console.log(this);
    }
    
    getName(){
        return this.name;
    }
    
    getBrandName(){
        return this.brandName;
    }

    getCalories(){
        return this.calories*this.servings;
    }

    getCarbs(){
        return this.carbs*servings;
    }

    getProtein(){
        return this.protein*servings;
    }

    getFat(){
        return this.fat*servings;
    }
    
    getServings(){
        return this.servings;
    }

    getServingSize(){
        return this.servingSize;
    }
    
    getServingSizeUnit(){
        return this.servingSizeUnit;
    }

    setServings(servings){
        this.servings = servings
    }
}