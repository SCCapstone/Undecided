import DiaryEntry from "./DiaryEntry";

export default class Diary {
    diary;
    constructor(){
        this.diary = [];
        c = 0;
        console.log("new diary")
    }

    getEntry(date){
        let index = undefined
        for(i = 0; i < this.diary.length; i++){
            if(this.diary[i].getDate() === date){
                index = i;
            }

        }

        if(index === undefined){
            index = this.diary.push(new DiaryEntry(date)) - 1;
        }

        return this.diary[index];

    }
}