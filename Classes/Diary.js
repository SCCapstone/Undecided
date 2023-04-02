import DiaryEntry from "./DiaryEntry";

export default class Diary {
    diary;
    uuid;
    selectedDate;
    constructor(uuid){
        this.selectedDate = new Date()
        this.diary = [];
        this.uuid = uuid;
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

    setDiary(newDiary){
        this.diary = newDiary;
    }
}