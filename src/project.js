import Todo from "./todo.js";

export default class Project {

    constructor(title,description) {
        this.todos = [];
        this.id = crypto.randomUUID(); 
        this.title = title;
        this.description = description;
    
    }

    #addTodo(Todo) {
        this.todos.push(Todo);
    }

    createTodo(title,date,priority,note) {
        let todo = new Todo(title,date,priority,note);
        this.#addTodo(todo);
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    editTodo(id,title,date,priority,note) {
        let todo = this.getTodo(id);
        todo.title = title;
        todo.dueDate = date;
        todo.priority = priority;
        todo.note = note;
    }

    getTodo(id) {
        return this.todos.find(todo => todo.id === id);
    }

    checkTodo(id) {
        let todo = this.getTodo(id);
        if(todo.checked == false) {
            todo.checked = true;
        } else {
            todo.checked = false;
        }
    }

} 