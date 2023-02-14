

export default class Food {
    name;
    brandName;
    usdaID;
    calories
    carbs;
    protein;
    fat;
    sugar;
    sodium;
    fibre;
    servings;
    servingSize;
    servingSizeUnit;

    constructor(name, brandName, calories, carbs, protein, fat, sugar, sodium, fibre,servings, servingSize, servingSizeUnit ){
        this.name = name;
        this.brandName = brandName;
        this.calories =  Math.ceil((servingSize/100) * calories)
        this.carbs = Math.ceil((servingSize/100) * carbs);
        this.protein =Math.ceil((servingSize/100) * protein);
        this.fat = Math.ceil((servingSize/100) * fat);
        this.sugar = Math.ceil((servingSize/100) * sugar);
        this.sodium = Math.ceil((servingSize/100) * sodium)
        this.fibre = Math.ceil((servingSize/100) * fibre)
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

    getFat(){
        return this.fat * this.servings;
    }

    getCarbs(){
        return this.carbs*this.servings;
    }

    getProtein(){
        return this.protein*this.servings;
    }

    getSugar(){
        return this.sugar*this.servings;
    }
    
    getSodium(){
        return this.sodium*this.servings;
    }

    getFibre(){
        return this.fibre*this.servings;
    }2

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
        this.servings = servings;
    }
}