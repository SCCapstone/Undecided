export default class Diary {
    constructor(){
        this.breakfast = []
        this.lunch = []
        this.dinner = []
        console.log("new diary")
    }
    addBreakfast(food){
        this.breakfast.push(food)
    }
    addLunch(food){
        this.lunch.push(food)
    }
    addDinner(food){
        this.dinner.push(food)
    }
}