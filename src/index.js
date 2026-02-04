import "./general.css";
import "./sidebar.css";
import "./main-content.css";

import Project from "./project.js";
import Todo from "./todo.js";
import {createProjectModal,createNoProjects,createTodoModal,createEditTodoModal,createTodoDiv} from "./createDom.js";

let myProjects = [];
let activeProject = null;




if(hasNoProjects()) {
    displayNoProjectsBtn();
}

const createProjectBtn = document.querySelector(".create-project-btn");
createProjectBtn.addEventListener("click",displayProjectModal);

const addTodoBtn = document.querySelector(".add-todo");
addTodoBtn.addEventListener("click",displayToDoModal);



function hasNoProjects() {
    if (myProjects.length == 0) {
        return true;
    }
    return false;
}

function displayNoProjectsBtn() {
    const noProjectDiv = createNoProjects();
    const projectsList = document.querySelector(".projects-list");
    projectsList.appendChild(noProjectDiv);

}

function displayProjectModal() {
    const projectModal = createProjectModal();

    document.body.appendChild(projectModal);
    const closeBtn = projectModal.querySelector("#close-modal");
    closeBtn.addEventListener("click",() => {
        projectModal.remove();
    })

    const projectTitle = projectModal.querySelector("#project-title");
    const createProjectForm = projectModal.querySelector("#create-project-form");
    const projectDescription = projectModal.querySelector("#project-description");
    console.log()
    createProjectForm.addEventListener("submit",() => {
        projectModal.remove();
        createProject(projectTitle.value,projectDescription.value);
    });

    projectModal.showModal();
}

function createProject(projectTitle,projectDescription = "") {
    const project = new Project(projectTitle,projectDescription);
    myProjects.push(project);
    displayProjects();

}

function displayProjects() {
    const projectsList = document.querySelector(".projects-list");
    projectsList.innerHTML = "";
    myProjects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.textContent = project.title;
        projectDiv.dataset.id = project.id;
        projectDiv.classList.add("project-title");
        
        projectDiv.addEventListener("click",(event) => {
            const id = event.target.dataset.id;
            
            displayToDo(id);
        });

        projectsList.appendChild(projectDiv);
    });

    activeProject = myProjects[myProjects.length - 1];
    displayToDo(myProjects[myProjects.length - 1].id);
    
}






function displayToDo(id) {
    

    
    myProjects.forEach(project => {
        if(project.id == id) {
            activeProject = project;
        }
    })

    
    
    const todosDiv = document.querySelector(".todos");
    todosDiv.innerHTML = "";

    
    for(let i = 0; i < activeProject.todos.length; i++) {
        const todoDiv = createTodoDiv(activeProject.todos[i]);
        
        todosDiv.appendChild(todoDiv);
        
        const deleteBtn = todoDiv.querySelector(".delete");
        const editBtn = todoDiv.querySelector(".edit");
        const todoCheckedBtn = document.querySelector(".todo-btn");

        deleteBtn.addEventListener("click",(event) => {
            const todo = event.target.closest(".todo");
            todo.remove();

            const todoId = todo.dataset.id;

            activeProject.removeTodo(todoId);

        })

        //---------------------------------------------------------------------------------------------------
        editBtn.addEventListener("click",(event) => {
            const todo = event.target.closest(".todo");
            const todoId = todo.dataset.id;

            displayEditTodoModal(todoId);
            
        });

        todoCheckedBtn.addEventListener("click",(event) => {
            const todo = event.target.closest(".todo");
            const todoId = todo.dataset.id;
            changeColorTodoBtn(todoCheckedBtn,todoId);
            activeProject.checkTodo(todoId);
            displayToDo(activeProject.id);

            
        });

        

    }
    


}



function displayToDoModal() {
    if(activeProject != null) {
        const todoModal = createTodoModal();
        document.body.appendChild(todoModal);

        const closeBtn = todoModal.querySelector("#close-todo-modal");
        const form = todoModal.querySelector("form");
        const deleteBtn = todoModal.querySelector(".delete");
        const editBtn = todoModal.querySelector(".edit");

        closeBtn.addEventListener("click", () => {
            todoModal.close();
            todoModal.remove();
        });

        form.addEventListener("submit",() => {
                createTodo(form);
                displayToDo(activeProject.id);
                todoModal.remove();
            
            
        });

        

        

        todoModal.showModal();
    } else {
        // irgendeine anzeige das noch kein projekt erstellt wurde.
    }
}

function displayEditTodoModal(id) {
    const todo = activeProject.getTodo(id);
    const editTodoModal = createEditTodoModal(todo);
    document.body.appendChild(editTodoModal);
    editTodoModal.showModal();

    const closeBtn = editTodoModal.querySelector("#close-todo-modal");
    const form = editTodoModal.querySelector("form");

    form.addEventListener("submit",() => {
        updateTodo(id,form);
        displayToDo(activeProject.id);
    });

    closeBtn.addEventListener("click", () => {
        editTodoModal.close();
        editTodoModal.remove();
    });

}

function createTodo(form) {
    const todoTitle = form.querySelector("#todo-title").value;
    const todoDate = form.querySelector("#todo-date").value;
    const todoPriority = form.querySelector("#todo-priority").value;
    const todoNote = form.querySelector("#todo-note").value;

    const todo = new Todo(todoTitle,todoDate,todoPriority,todoNote);

    activeProject.createTodo(todo.title,todo.dueDate,todo.priority,todo.note);
}

function updateTodo(todoId,form) {
    const todoTitle = form.querySelector("#todo-title").value;
    const todoDate = form.querySelector("#todo-date").value;
    const todoPriority = form.querySelector("#todo-priority").value;
    const todoNote = form.querySelector("#todo-note").value;

    activeProject.editTodo(todoId,todoTitle,todoDate,todoPriority,todoNote);
}

function changeColorTodoBtn(todoCheckedBtn,todoId) {
    const currentColor = todoCheckedBtn.style.borderColor;
    const todo = activeProject.getTodo(todoId);
    const priority = todo.priority;

    if(todo.checked == false) {
        todoCheckedBtn.style.borderColor = "#238636";
        todoCheckedBtn.style.backgroundColor = "#238636";
    } else {
        if(todo.priority == "low") {
            todoCheckedBtn.style.borderColor = "#24e949";
            todoCheckedBtn.style.backgroundColor = null;
        } else if (todo.priority == "medium") {
             todoCheckedBtn.style.borderColor = "#d29922";
            todoCheckedBtn.style.backgroundColor = null;
        } else {
             todoCheckedBtn.style.borderColor = "#cf222e";
            todoCheckedBtn.style.backgroundColor = null;
        }
    }

    
}