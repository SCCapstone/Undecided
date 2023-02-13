export default class DiaryEntry {
    date;
    breakfast;
    lunch;
    dinner;

    constructor(date){
        this.date = date;
        this.breakfast = [];
        this.lunch = [];
        this.dinner = [];
        console.log("new entry" +" "  + date)
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

    addBreakfast(food){
        this.breakfast.push(food);
    }

    removeBeakfast(food){
        this.breakfast = this.breakfast.filter(function(item){
            if(item !== food){
                return item;
            }
        })
    }
    addLunch(food){
        this.lunch.push(food);
    }

    removeLunch(food){
        this.lunch = this.lunch.filter(function(item){
            if(item !== food){
                return item;
            }
        })
    }

    addDinner(food){
        this.dinner.push(food);
    }

    removeDinner(food){
        this.dinner = this.dinner.filter(function(item){
            if(item !== food){
                return item;
            }
        })
    }

    getDate(){
        return this.date;
    }
}