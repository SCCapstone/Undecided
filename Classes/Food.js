

export default class Food {
    #name;
    #usdaID;
    #calories;
    #carbs;
    #protein;
    #fat;
    #servings;
    #servingSize;
    #servingSizeUnit;

    constructor(name, usdaID, calories, carbs, protein, fat, servings, servingSize, servingSizeUnit ){
        this.#name = name;
        this.#usdaID = usdaID;
        this.#calories = calories;
        this.#carbs = carbs;
        this.#protein = protein;
        this.#fat = fat;
        this.#servings = servings;
        this.#servingSize = servingSize;
        this.#servingSizeUnit = servingSizeUnit;
        console.log(this);
    }
    
    getName(){
        return this.#name;
    }

    getUSDAID(){
        return this.#usdaID;
    }

    getCalories(){
        return this.#calories;
    }

    getCarbs(){
        return this.#carbs;
    }

    getProtein(){
        return this.#protein;
    }

    getFat(){
        return this.#fat;
    }
    
    getServings(){
        return this.#servings;
    }

    getServingSize(){
        return this.#servingSize;
    }
    
    getServingSizeUnit(){
        return this.#servingSizeUnit;
    }

    setServings(servings){
        this.#servings = servings
    }
}