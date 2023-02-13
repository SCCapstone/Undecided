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


    addLunch(food){
        this.lunch.push(food);
    }



    addDinner(food){
        this.dinner.push(food);
    }

   

    getDate(){
        return this.date;
    }
}