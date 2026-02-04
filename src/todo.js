import Note from "./note.js";

export default class Todo {

    constructor(title,dueDate,priority,noteText = "") {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = noteText;
        this.checked = false;
        this.id = crypto.randomUUID();

        

        
        
    }


    removeNote() {

    }
    



}