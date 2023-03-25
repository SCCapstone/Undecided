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
}