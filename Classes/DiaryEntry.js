import Food from './Food'
export default class DiaryEntry {
    date;
    breakfast;
    lunch;
    dinner;
    snacks;

    constructor(date = ""){
        this.date = date;
        this.breakfast = [];
        this.lunch = [];
        this.dinner = [];
        this.snacks = [];
    }

    getBreakfast(){
        return this.breakfast;
    }

    getLunch(){
        return this.lunch;
    }

    getDinner(){
        return this.dinner;
    }
    getSnacks(){
        return this.snacks;
    }
    addBreakfast(food){
        this.breakfast.push(food);
    }


    addLunch(food){
        this.lunch.push(food);
    }



    addDinner(food){
        this.dinner.push(food);
    }

    addSnack(food){
        this.snacks.push(food);
    }

    getDate(){
        return this.date;
    }

    getCalorieTotal(){
        let total = 0;
        for(const element of this.breakfast){
            total += element.getCalories();
        }

        for(const element of this.lunch){
            total += element.getCalories();
        }

        for(const element of this.dinner){
            total += element.getCalories();
        }

        for(const element of this.snacks){
            total += element.getCalories();
        }
        return total;
    }

    getNutrientTotal(){
        let totalCarb = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalSugar = 0;
        let totalSodium = 0;
        let totalFibre = 0;
        
        for(const element of this.breakfast){
            totalCarb += element.getCarbs();
            totalProtein += element.getProtein();
            totalFat += element.getFat();
            totalSugar += element.getSugar();
            totalSodium += element.getSodium();
            totalFibre += element.getFibre();
        }
        for(const element of this.lunch){
            totalCarb += element.getCarbs();
            totalProtein += element.getProtein();
            totalFat += element.getFat();
            totalSugar += element.getSugar();
            totalSodium += element.getSodium();
            totalFibre += element.getFibre();
        }
        for(const element of this.dinner){
            totalCarb += element.getCarbs();
            totalProtein += element.getProtein();
            totalFat += element.getFat();
            totalSugar += element.getSugar();
            totalSodium += element.getSodium();
            totalFibre += element.getFibre();
        }
        for(const element of this.snacks){
            totalCarb += element.getCarbs();
            totalProtein += element.getProtein();
            totalFat += element.getFat();
            totalSugar += element.getSugar();
            totalSodium += element.getSodium();
            totalFibre += element.getFibre();
        }

        return new Food("","",this.getCalorieTotal(),totalCarb,totalProtein,totalFat,totalSugar,totalSodium,totalFibre,1,100)
    }
}