export default class DiaryEntry {
    #date;
    #breakfast;
    #lunch;
    #dinner;

    constructor(date){
        this.#date = date;
        this.#breakfast = [];
        this.#lunch = [];
        this.#dinner = [];
        console.log("new diary");
    }
    addBreakfast(food){
        this.#breakfast.push(food);
    }

    removeBeakfast(food){
        this.#breakfast = this.#breakfast.filter(function(item){
            if(item !== food){
                return item;
            }
        })
    }
    addLunch(food){
        this.#lunch.push(food);
    }

    removeBeakfast(food){
        this.#breakfast = this.#breakfast.filter(function(item){
            if(item !== food){
                return item;
            }
        })
    }

    addDinner(food){
        this.#dinner.push(food);
    }

    removeDinner(food){
        this.#breakfast = this.#breakfast.filter(function(item){
            if(item !== food){
                return item;
            }
        })
    }

    getDate(){
        return this.#date;
    }
}