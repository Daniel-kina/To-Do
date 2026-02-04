export function createProjectModal() {
    const dialog = document.createElement('dialog');
    dialog.id = 'project-modal';
    
    dialog.innerHTML = `
    <form id="create-project-form" method="dialog">
        <h3>Neues Projekt erstellen</h3>
        <input type="text" id="project-title" placeholder="Projekt Name..." required>
        <textarea id="project-description" placeholder="Beschreibung (optional)"></textarea>
        
        <div class="modal-buttons">
            <button type="button" id="close-modal">Abbrechen</button>
            <button type="submit" id="create-project">Erstellen</button>
        </div>
    </form>
    `;

    return dialog;
}

export function createNoProjects() {
    
    const outputDiv = document.createElement("div");
    

    outputDiv.textContent = "DU HAST NOCH KEINE PROJEKTE";
    outputDiv.style.paddingTop = "10px";
    outputDiv.style.color = "red";
    outputDiv.id = "noProjectText";
    

    
    

    return outputDiv;
}

export function createTodoModal() {
    const dialog = document.createElement('dialog');
    dialog.id = 'todo-modal';
    
    dialog.innerHTML = `
    <form id="create-todo-form" method="dialog">
        <h3>Neues To-Do</h3>
        
        <div class="input-group">
            <label for="todo-title">Titel *</label>
            <input type="text" id="todo-title" placeholder="Was musst du erledigen?" required>
        </div>

        <div class="input-group">
            <label for="todo-date">Fälligkeitsdatum *</label>
            <input type="date" id="todo-date" required>
        </div>

        <div class="input-group">
            <label for="todo-priority">Priorität</label>
            <select id="todo-priority">
                <option value="low">Niedrig 🟢</option>
                <option value="medium" selected>Mittel 🟡</option>
                <option value="high">Hoch 🔴</option>
            </select>
        </div>

        <div class="input-group">
            <label for="todo-note">Notizen</label>
            <textarea id="todo-note" placeholder="Details hinzufügen..."></textarea>
        </div>
        
        <div class="modal-buttons">
            <button type="button" id="close-todo-modal">Abbrechen</button>
            <button type="submit" id="create-todo-btn">Speichern</button>
        </div>
    </form>
    `;

    return dialog;
}



export function createTodoDiv(todo) {
    // 1. Haupt-Container erstellen
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.dataset.id = todo.id;

    // --- LINKE SEITE ---
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('todo-left');

    const leftWrapper = document.createElement('div');
    leftWrapper.classList.add('todo-left-wrapper');

    // 2. Der Runde Button (Checkbox)
    const checkBtn = document.createElement('div');
    checkBtn.classList.add('todo-btn');
    
    // Priorität farblich markieren (optional, falls du das willst)
    if (todo.priority === 'low') checkBtn.style.borderColor = '#24e949'; // Grün
    if (todo.priority === 'high') checkBtn.style.borderColor = '#cf222e'; // Rot
    if (todo.priority === 'medium') checkBtn.style.borderColor = '#d29922'; // Gelb
    
    // Status prüfen (Erledigt oder nicht?)
    if (todo.checked) {
        checkBtn.classList.toggle('checked');
        checkBtn.style.backgroundColor = checkBtn.style.borderColor = '#238636';
        checkBtn.style.backgroundColor = checkBtn.style.backgroundColor = '#238636';
    }

    // 3. Info Bereich (Titel & Datum)
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('todo-info');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('todo-info-title');
    titleDiv.textContent = todo.title;
    // Wenn erledigt, Text durchstreichen
    if (todo.checked) titleDiv.style.textDecoration = "line-through";

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('todo-info-time');
    timeDiv.textContent = todo.dueDate; // Formatierung ggf. anpassen (z.B. mit date-fns)

    // Zusammenbauen (Wrapper)
    infoDiv.appendChild(titleDiv);
    infoDiv.appendChild(timeDiv);

    leftWrapper.appendChild(checkBtn);
    leftWrapper.appendChild(infoDiv);

    // 4. Notiz (wird nur angezeigt, wenn Text vorhanden ist)
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('todo-note');
    if (todo.note) {
        noteDiv.textContent = todo.note;
    } else {
        noteDiv.style.display = 'none';
    }

    // Linke Seite zusammenbauen
    leftDiv.appendChild(leftWrapper);
    leftDiv.appendChild(noteDiv);


    // --- RECHTE SEITE (Icons) ---
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('todo-right');

    // SVG Icons erstellen (Hilfsfunktion unten nutzen, damit der Code sauber bleibt)
    const editIcon = createIcon('edit');
    const deleteIcon = createIcon('delete');

    // Event Listener für die Buttons können hier oder später hinzugefügt werden
    // z.B. deleteIcon.addEventListener('click', ...)

    rightDiv.appendChild(editIcon);
    rightDiv.appendChild(deleteIcon);


    // --- ALLES ZUSAMMENFÜGEN ---
    todoDiv.appendChild(leftDiv);
    todoDiv.appendChild(rightDiv);

    return todoDiv;
}

export function createEditTodoModal(todo) {
    const dialog = document.createElement('dialog');
    dialog.id = 'todo-modal';
    
    dialog.innerHTML = `
    <form id="create-todo-form" method="dialog">
        <h3>To-Do Bearbeiten</h3> 
        
        <div class="input-group">
            <label for="todo-title">Titel *</label>
            <input type="text" id="todo-title" value="${todo.title}" placeholder="Was musst du erledigen?" required>
        </div>

        <div class="input-group">
            <label for="todo-date">Fälligkeitsdatum *</label>
            <input type="date" id="todo-date" value="${todo.dueDate}"  required>
        </div>
        
        <div class="input-group">
            <label for="todo-priority">Priorität</label>
            <select id="todo-priority">
                <option ${todo.priority === 'low' ? 'selected' : ''} value="low">Niedrig 🟢</option>
                <option ${todo.priority === 'medium' || !todo.priority ? 'selected' : ''} value="medium" selected>Mittel 🟡</option>
                <option ${todo.priority === 'high' ? 'selected' : ''} value="high">Hoch 🔴</option>
            </select>
        </div>

        <div class="input-group">
            <label for="todo-note">Notizen</label>
            <textarea id="todo-note" placeholder="Details hinzufügen...">${todo.note}</textarea>
        </div>
        
        <div class="modal-buttons">
            <button type="button" id="close-todo-modal">Abbrechen</button>
            <button type="submit" id="create-todo-btn">Speichern</button>
        </div>
    </form>
    `;

    return dialog;
}


// Kleine Hilfsfunktion für die SVGs, damit der Hauptcode lesbar bleibt
function createIcon(type) {
    const iconContainer = document.createElement('div');
    iconContainer.style.cursor = 'pointer';
    
    let svgString = '';

    if (type === 'edit') {
        // Stift Icon
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
        iconContainer.classList.add("edit");
    } else if (type === 'delete') {
        // Papierkorb Icon
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
        iconContainer.classList.add("delete");
    }

    iconContainer.innerHTML = svgString;
    return iconContainer;
}