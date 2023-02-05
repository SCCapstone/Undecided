import DiaryEntry from "./DiaryEntry";

export default class FoodDiary {
    #diary;
    constructor(){
        this.#diary = [];
    }

    getEntry(date){
        let index = this.FoodDiary.find(item => item.getDate() == date);

        if(index === undefined){
            index = this.#diary.push(new DiaryEntry(date));

        }

        return this.#diary[index];

    }
}