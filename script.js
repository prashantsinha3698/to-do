let todoArray = [];
const todoInput = document.getElementById('todoInput');
const todoList = document.querySelector('.todo-list');
const dateInput = document.getElementById('date-input');

// Load existing todos from localStorage on page load
window.onload = function(){
    if (localStorage.getItem('todoArrayString')) {
        todoArray = JSON.parse(localStorage.getItem('todoArrayString')) || [];
        renderToDo();
    }
}
const inputElement = document.body; // Replace 'yourInputId' with the actual ID of your input element
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addToDO(); // Call the addToDO function
  }
});

// Add task function ---- for new task
function addToDO() {
    const todoDateElement = document.getElementById('todo-date');
    const task = todoInput.value;
    const date = todoDateElement ? todoDateElement.value : null;

    if (task) {
        const todoItem = { task, date };
        todoArray.push(todoItem);
        renderToDo();
        todoInput.value = '';
        if (todoDateElement) {
            dateInput.innerHTML = '';  // Clear the date input after adding
        }
    }
}

// Display the todo items
function renderToDo() {
    let allToDoString = '';
    todoArray.forEach(function(todoObject, i){
        //todoObject holds each todo List that is in the form of Object. Similar to todoArray[index]
        //i is going to be used as index of each todo Object i.e. list stored in an Array named todoArray.
        const { task, date } = todoObject;
        //formatting the date
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const dateObj = new Date(date);
        const forattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
        //innerHTML here ---
        allToDoString += `
        <div class="todo-list-div" >
            
            <li class="todo-task">
                <span class="task-text">${task}</span>
                ${date ? '<span class="due-date"><strong style="color:white">Due:</strong> ' + forattedDate + '</span>' : ''}
            </li>
            <button title="Edit" class="edit-btn" onclick="editTask(${i})">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button title="Remove" class="delete-btn" onclick="deleteToDo(${i})">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        <div id="todoList-div-${i}"></div>
        `;
    });
    localStorage.setItem('todoArrayString', JSON.stringify(todoArray));
    todoList.innerHTML = allToDoString;
}

// Remove a todo item
function deleteToDo(i) {
    if(confirm(`Do you really want to delete: "${todoArray[i].task}"?`)){
        let deletedTask = todoArray[i].task;
        let spliceElement = todoArray.splice(i, 1);
        console.log(`removed element: ${spliceElement}`);
        console.log(todoArray);
        localStorage.setItem('todoArrayString', JSON.stringify(todoArray));
        renderToDo();
    }
}

// Toggle date input visibility
function addDate() {
    const existingDateInput = document.getElementById('todo-date');
    if (existingDateInput) {
        dateInput.innerHTML = ''; // Clear the date input if it exists
    } else {
        dateInput.innerHTML = '<input type="date" name="addDate" id="todo-date">';
    }
}
//called as soon edit button clicked for any specified to-do task
function editTask(i){
    console.log('inside editTask');
    const todoListDiv = document.getElementById(`todoList-div-${i}`);
    console.log('Inner html: '+todoListDiv.innerHTML);
    if (todoListDiv.innerHTML) {
        todoListDiv.innerHTML = '';
        todoListDiv.classList.remove("editBox");
    } else {
        todoListDiv.innerHTML = `
        <div class="todo-form">
            <input type="text" id='todoEdit-Input' class="todo-input" placeholder="Write the task" autocomplete="off">
            <button title="Update" class="add-btn" onclick="editToDO(${i})">Update</button>
        </div>
        <button class ="add-date-edit" id='add-date' onclick="addDateEdit(${i})">${todoArray[i].date?'Update Date':'Add Date'}</button>
        <button class ="remove-date-edit" id='add-date' onclick="removeDateEdit(${i})">Remove Date</button>
        <div id="date-input-edit-${i}"></div>`;
        todoListDiv.classList.add("editBox");
    }
}
//called as soon as user click edit button to update the to-do task
function editToDO(i){
    const toDoEditInput = document.getElementById('todoEdit-Input');
    const existingDateInput = document.getElementById(`todo-date-edited-${i}`); 
    console.log(`todoArray ${i}: ${todoArray[i].task +':'+todoArray[i].date}`);

    const task = toDoEditInput.value;
    const date = existingDateInput ? existingDateInput.value : null;

    todoArray[i].task=toDoEditInput.value||todoArray[i].task; //Updating the existing task in todoArray.
    todoArray[i].date=date?date:todoArray[i].date?todoArray[i].date:null;
    //updating the localStorage as well with new edited todoArray.
    localStorage.setItem('todoArrayString', JSON.stringify(todoArray));
    renderToDo();//render new todo list.
}
// Toggle date input visibility
function addDateEdit(i) {
    const editDateInputDiv = document.getElementById(`date-input-edit-${i}`);
    const existingDateInput = document.getElementById(`todo-date-edited`);
    if (editDateInputDiv.innerHTML) {
        editDateInputDiv.innerHTML = ''; // Clear the date input if it exists
    } else {
        editDateInputDiv.innerHTML = `<input type="date" name="addDate" class="dueDate-edit" id="todo-date-edited-${i}" >`;
    }
}
//remove the date
function removeDateEdit(i){
    todoArray[i].date=null;
    localStorage.setItem('todoArrayString', JSON.stringify(todoArray));
    renderToDo();
}